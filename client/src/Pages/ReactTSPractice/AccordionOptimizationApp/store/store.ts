// src/store/store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { compress, decompress } from 'lz-string';
import { StoreState } from '../types';
import { generateMockData } from '../mock/mock';

const CHUNK_SIZE = 100;

// Создаём кастомное хранилище с компрессией
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

      setBlockOpen: (id: number, isOpen: boolean) =>
        set((state) => ({
          openBlocks: { ...state.openBlocks, [id]: isOpen }
        })),

      setResult: (id: number, result: unknown) =>
        set((state) => ({
          results: { ...state.results, [id]: result }
        }))
    }),
    {
      name: 'accordion-storage', // Ключ в localStorage
      storage: createJSONStorage(() => compressedStorage), // Используем кастомное хранилище
      partialize: (state) => ({
        openBlocks: state.openBlocks,
        loadedChunks: state.loadedChunks,
        data: state.data,
        results: state.results
      })
    }
  )
);