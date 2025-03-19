
// src/store/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { compress, decompress } from 'lz-string';
import { StoreState, ChunkData } from '../types';

const CHUNK_SIZE = 100;

export const useStore = create(
  persist<StoreState>(
    (set, get) => ({
      openBlocks: {},
      loadedChunks: {},
      data: {},
      results: {},
      
      loadChunk: async (chunkId: number) => {
        if (get().loadedChunks[chunkId]) return;
        
        const response = await fetch(`/api/data/chunk/${chunkId}`);
        const chunkData: ChunkData = await response.json();
        
        set(state => ({
          data: { 
            ...state.data,
            [chunkId]: compress(JSON.stringify(chunkData))
          },
          loadedChunks: {
            ...state.loadedChunks,
            [chunkId]: true
          }
        }));
      },

      getData: (id: number) => {
        const chunkId = Math.floor(id / CHUNK_SIZE);
        const data = get().data[chunkId];
        return data ? JSON.parse(decompress(data))[id % CHUNK_SIZE] : null;
      },

      setBlockOpen: (id: number, isOpen: boolean) => 
        set(state => ({
          openBlocks: { ...state.openBlocks, [id]: isOpen }
        })),

      setResult: (id: number, result: any) => 
        set(state => ({
          results: { ...state.results, [id]: result }
        }))
    }),
    {
      name: 'accordion-storage',
      getStorage: () => localStorage,
      serialize: (state) => compress(JSON.stringify(state)),
      deserialize: (str) => JSON.parse(decompress(str))
    }
  )
);
