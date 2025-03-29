// src/types/index.ts
export interface ChunkData {
    id: number;
    data: Record<string, unknown>;
  }
  
// src/types.ts
export interface StoreState {
  openBlocks: Record<number, boolean>;
  loadedChunks: Record<number, boolean>;
  data: Record<number, Record<number, unknown>>; // Уточняем, что внутри чанка — объект  results: Record<number, unknown>; // Результаты вычислений
  results: Record<number, unknown>;  // Добавьте это поле
  loadChunk: (chunkId: number) => Promise<void>;
  getData: (id: number) => unknown;
  setBlockOpen: (id: number, isOpen: boolean) => void;
  setResult: (id: number, result: unknown) => void;
}