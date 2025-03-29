// src/store/store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { compress, decompress } from 'lz-string';
import { StoreState } from '../types';
import { generateMockData } from '../mock/mock';
import { initializeWorker } from '../utils/workerSetup';

const CHUNK_SIZE = 100;
const MAX_WORKERS = 4; // Максимум одновременно работающих воркеров

const compressedStorage = {
  getItem: (name: string): string | null | Promise<string | null> => {
    const str = localStorage.getItem(name);
    if (!str) {
      console.log(`Нет данных в localStorage для ключа ${name}`);
      return null;
    }
    console.log(`Десериализация сжатых данных для ${name}:`, str);
    const decompressed = decompress(str);
    if (!decompressed) {
      console.error('Ошибка декомпрессии: результат пустой');
      return null;
    }
    const parsed = JSON.parse(decompressed);
    console.log(`Распакованное состояние для ${name}:`, parsed);
    return parsed;
  },
  setItem: (name: string, value: string) => {
    console.log(`Сериализация состояния для ${name} перед сжатием:`, value);
    const jsonString = JSON.stringify(value);
    const compressed = compress(jsonString);
    console.log(`Сжатые данные для ${name}:`, compressed);
    localStorage.setItem(name, compressed);
  },
  removeItem: (name: string) => {
    console.log(`Удаление данных для ${name} из localStorage`);
    localStorage.removeItem(name);
  }
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      openBlocks: {},
      loadedChunks: {},
      data: {},
      results: {},

      loadChunk: async (chunkId: number) => {
        if (get().loadedChunks[chunkId]) return;
        const chunkData = generateMockData(chunkId);
        console.log(`Загружаем чанк ${chunkId} в стор`);
        set((state) => ({
          data: { ...state.data, [chunkId]: chunkData },
          loadedChunks: { ...state.loadedChunks, [chunkId]: true }
        }));
      },

      getData: (id: number) => {
        const chunkId = Math.floor(id / CHUNK_SIZE);
        const chunkData = get().data[chunkId];
        return chunkData ? chunkData[id % CHUNK_SIZE] : null;
      },

      setBlockOpen: (id: number, isOpen: boolean) => {
        set((state) => ({
          openBlocks: { ...state.openBlocks, [id]: isOpen }
        }));
        if (isOpen && !get().results[id]) {
          // Запускаем вычисление при открытии блока
          workerQueue.addTask(id, get().getData(id));
        }
      },

      setResult: (id: number, result: CalculationResult) =>
        set((state) => ({
          results: { ...state.results, [id]: result }
        }))
    }),
    {
      name: 'accordion-storage',
      storage: createJSONStorage(() => compressedStorage),
      partialize: (state) => ({
        openBlocks: state.openBlocks,
        loadedChunks: state.loadedChunks,
        data: state.data,
        results: state.results
      })
    }
  )
);

// Очередь задач для воркеров
class WorkerQueue {
  private queue: { id: number; data: unknown }[] = [];
  private activeWorkers = 0;
  private stopped = false;

  constructor(private maxWorkers: number) {}

  addTask(id: number, data: unknown) {
    if (this.stopped || useStore.getState().results[id]) return; // Не добавляем, если уже есть результат
    this.queue.push({ id, data });
    this.processQueue();
  }

  stop() {
    this.stopped = true;
    this.queue = [];
  }

  private processQueue() {
    if (this.stopped || this.activeWorkers >= this.maxWorkers || this.queue.length === 0) return;

    const task = this.queue.shift()!;
    this.activeWorkers++;

    const store = useStore.getState();
    const worker = initializeWorker(`calculator-${task.id}`, (error) => {
      console.error(`Ошибка в воркере для блока ${task.id}:`, error);
      store.setResult(task.id, {
        input: 0,
        result: `Ошибка: ${error}`,
        calculationTime: 0,
        timestamp: new Date().toISOString()
      });
      this.activeWorkers--;
      this.processQueue();
    });

    if (worker) {
      worker.postMessage({ id: task.id, data: task.data });
      worker.onmessage = (e) => {
        console.log(`Результат от воркера для блока ${task.id}:`, e.data);
        store.setResult(task.id, e.data);
        worker.terminate();
        this.activeWorkers--;
        setTimeout(() => this.processQueue(), 100); // Пауза 100 мс
      };
    } else {
      this.activeWorkers--;
      this.processQueue();
    }
  }
}

const workerQueue = new WorkerQueue(MAX_WORKERS);

export const stopBackgroundCalculations = () => {
  workerQueue.stop();
};

export const updateMaxWorkers = (newMaxWorkers: number) => {
  workerQueue.maxWorkers = Math.max(1, Math.min(8, newMaxWorkers));
  workerQueue.processQueue(); // Перезапускаем обработку очереди с новым лимитом
};