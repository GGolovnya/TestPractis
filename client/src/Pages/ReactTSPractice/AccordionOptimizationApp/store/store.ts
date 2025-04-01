// src/store/store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { compress, decompress } from 'lz-string';
import { StoreState } from '../types';
import { generateMockData } from '../mock/mock';
import { initializeWorker } from '../utils/workerSetup';

const CHUNK_SIZE = 100;
const MAX_WORKERS = 4;

interface CalculationResult {
  input: number;
  result: number | string;
  calculationTime: number;
  timestamp: string;
}

const compressedStorage = {
  getItem: (name: string): string | null | Promise<string | null> => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    const decompressed = decompress(str);
    return decompressed ? JSON.parse(decompressed) : null;
  },
  setItem: (name: string, value: string) => {
    const compressed = compress(JSON.stringify(value));
    localStorage.setItem(name, compressed);
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

class WorkerQueue {
  private queue: { id: number; data: unknown; startTime: number }[] = [];
  private activeWorkers = 0;
  private processingIds: Map<number, { startTime: number; worker?: Worker }> = new Map();

  constructor(public maxWorkers: number) {}

  addTask(id: number, data: unknown, isServerMode: boolean, useFixedN: boolean) {
    if (useStore.getState().results[id] || this.processingIds.has(id)) return;
    if (!this.queue.some((task) => task.id === id)) {
      const startTime = Date.now();
      this.queue.push({ id, data, startTime });
      console.log(`Задача добавлена в очередь: id=${id}, isServerMode=${isServerMode}, useFixedN=${useFixedN}`);
      this.processQueue(isServerMode, useFixedN);
    }
  }

  cancelTask(id: number) {
    this.queue = this.queue.filter((task) => task.id !== id);
    const activeTask = this.processingIds.get(id);
    if (activeTask?.worker) {
      activeTask.worker.terminate();
      this.processingIds.delete(id);
      this.activeWorkers--;
      console.log(`Задача отменена: id=${id}, activeWorkers=${this.activeWorkers}`);
      this.processQueue(useStore.getState().isServerMode, useStore.getState().useFixedN);
    }
  }

  pauseAll() {
    const store = useStore.getState();
    for (const [id] of this.processingIds) {
      store.cancelTask(id);
    }
    for (const task of this.queue) {
      store.cancelTask(task.id);
    }
    console.log('Все вычисления приостановлены');
  }

  resumeAll() {
    const store = useStore.getState();
    for (const id in store.cancelledTasks) {
      if (!store.results[id]) {
        store.resumeTask(Number(id));
      }
    }
    console.log('Все вычисления возобновлены');
  }

  isProcessing(id: number): boolean {
    return (
      this.processingIds.has(id) ||
      this.queue.some((task) => task.id === id)
    );
  }

  getStartTime(id: number): number | undefined {
    const task = this.queue.find((t) => t.id === id);
    if (task) return task.startTime;
    const activeTask = this.processingIds.get(id);
    return activeTask?.startTime;
  }

  public clearWorkers() {
    this.queue = [];
    this.processingIds.forEach((task) => task.worker?.terminate());
    this.processingIds.clear();
    this.activeWorkers = 0;
    console.log('Все воркеры и очередь очищены');
  }

  private async processQueue(isServerMode: boolean, useFixedN: boolean) {
    console.log(`processQueue: activeWorkers=${this.activeWorkers}, queue.length=${this.queue.length}, maxWorkers=${this.maxWorkers}`);
    if (this.activeWorkers >= this.maxWorkers || this.queue.length === 0) return;

    const task = this.queue.shift()!;
    this.activeWorkers++;
    this.processingIds.set(task.id, { startTime: task.startTime });
    console.log(`Обрабатываем задачу: id=${task.id}, isServerMode=${isServerMode}, useFixedN=${useFixedN}`);

    if (isServerMode) {
      fetch('http://localhost:3000/api/v1/fibonacci', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: task.id, data: task.data, useFixedN }), // Передаём флаг серверу
      })
        .then((response) => {
          if (!response.ok) throw new Error('Server error');
          return response.json();
        })
        .then((result) => {
          console.log('Результат от сервера:', result);
          useStore.getState().setResult(task.id, result);
        })
        .catch((error) => {
          console.error('Ошибка при запросе к серверу:', error);
          useStore.getState().setResult(task.id, {
            input: 0,
            result: `Ошибка: ${error.message}`,
            calculationTime: 0,
            timestamp: new Date().toISOString(),
          });
        })
        .finally(() => {
          this.activeWorkers--;
          this.processingIds.delete(task.id);
          console.log(`Серверная задача завершена: id=${task.id}, activeWorkers=${this.activeWorkers}`);
          this.processQueue(isServerMode, useFixedN);
        });
      this.processQueue(isServerMode, useFixedN); // Параллельность
    } else {
      const worker = initializeWorker(`calculator-${task.id}`, (error) => {
        useStore.getState().setResult(task.id, {
          input: 0,
          result: `Ошибка: ${error}`,
          calculationTime: 0,
          timestamp: new Date().toISOString(),
        });
        this.activeWorkers--;
        this.processingIds.delete(task.id);
        console.log(`Клиентская задача с ошибкой: id=${task.id}, activeWorkers=${this.activeWorkers}`);
        this.processQueue(isServerMode, useFixedN);
      });

      if (worker) {
        this.processingIds.set(task.id, { startTime: task.startTime, worker });
        const n = useFixedN ? 46 : Math.floor(Math.random() * 15) + 25;
        worker.postMessage({ id: task.id, data: task.data, n });
        worker.onmessage = (e) => {
          useStore.getState().setResult(task.id, e.data);
          worker.terminate();
          this.activeWorkers--;
          this.processingIds.delete(task.id);
          console.log(`Клиентская задача завершена: id=${task.id}, activeWorkers=${this.activeWorkers}`);
          this.processQueue(isServerMode, useFixedN);
        };
      } else {
        this.activeWorkers--;
        this.processingIds.delete(task.id);
        console.log(`Не удалось создать воркер: id=${task.id}, activeWorkers=${this.activeWorkers}`);
        this.processQueue(isServerMode, useFixedN);
      }
    }
  }
}

const workerQueue = new WorkerQueue(MAX_WORKERS);

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      openBlocks: {},
      loadedChunks: {},
      data: {},
      results: {},
      cancelledTasks: {},
      isServerMode: false,
      useFixedN: false, // Новое состояние
      resetResults: () => set({ results: {} }),
      setServerMode: (mode: boolean) => set({ isServerMode: mode }),
      setUseFixedN: (useFixed: boolean) => set({ useFixedN: useFixed }), // Новый метод

      loadChunk: async (chunkId: number) => {
        if (get().loadedChunks[chunkId]) return;
        const chunkData = generateMockData(chunkId);
        set((state) => ({
          data: { ...state.data, [chunkId]: chunkData },
          loadedChunks: { ...state.loadedChunks, [chunkId]: true },
        }));
      },

      getData: (id: number) => {
        const chunkId = Math.floor(id / CHUNK_SIZE);
        const chunkData = get().data[chunkId];
        return chunkData ? chunkData[id % CHUNK_SIZE] : null;
      },

      setBlockOpen: (id: number, isOpen: boolean) => {
        set((state) => ({
          openBlocks: { ...state.openBlocks, [id]: isOpen },
        }));
        if (isOpen && !get().results[id] && !get().cancelledTasks[id]) {
          workerQueue.addTask(id, get().getData(id), get().isServerMode, get().useFixedN);
          console.log(`setBlockOpen вызван: id=${id}, isServerMode=${get().isServerMode}, useFixedN=${get().useFixedN}`);
        }
      },

      setResult: (id: number, result: CalculationResult) =>
        set((state) => ({
          results: { ...state.results, [id]: result },
          cancelledTasks: { ...state.cancelledTasks, [id]: false },
        })),

      cancelTask: (id: number) => {
        workerQueue.cancelTask(id);
        set((state) => ({
          cancelledTasks: { ...state.cancelledTasks, [id]: true },
        }));
      },

      resumeTask: (id: number) => {
        if (!get().results[id]) {
          workerQueue.addTask(id, get().getData(id), get().isServerMode, get().useFixedN);
          set((state) => ({
            cancelledTasks: { ...state.cancelledTasks, [id]: false },
          }));
        }
      },

      resetStore: () => {
        workerQueue.pauseAll();
        workerQueue.clearWorkers();
        set({
          openBlocks: {},
          loadedChunks: {},
          data: {},
          results: {},
          cancelledTasks: {},
        });
        localStorage.removeItem('accordion-storage');
        console.log('Состояние полностью сброшено');
      },

      isBlockProcessing: (id: number) => workerQueue.isProcessing(id),
      isPaused: () => false,
      getBlockStartTime: (id: number) => workerQueue.getStartTime(id),
    }),
    {
      name: 'accordion-storage',
      storage: createJSONStorage(() => compressedStorage),
      partialize: (state) => ({
        openBlocks: state.openBlocks,
        loadedChunks: state.loadedChunks,
        data: state.data,
        results: state.results,
        cancelledTasks: state.cancelledTasks,
        isServerMode: state.isServerMode,
        useFixedN: state.useFixedN,
      }),
    }
  )
);

export const pauseAllCalculations = () => {
  workerQueue.pauseAll();
};

export const resumeAllCalculations = () => {
  workerQueue.resumeAll();
};

export const updateMaxWorkers = (newMaxWorkers: number) => {
  workerQueue.maxWorkers = Math.max(1, Math.min(8, newMaxWorkers));
  workerQueue.processQueue(useStore.getState().isServerMode, useStore.getState().useFixedN);
};