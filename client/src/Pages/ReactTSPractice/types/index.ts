// src/types/index.ts
export interface ChunkData {
    id: number;
    data: Record<string, unknown>;
  }
  
  export interface StoreState {
    openBlocks: Record<string, boolean>;
    loadedChunks: Record<string, boolean>;
    data: Record<string, string>;
    results: Record<string, unknown>;
    loadChunk: (chunkId: number) => Promise<void>;
    getData: (id: number) => Record<string, unknown> | null;
    setBlockOpen: (id: number, isOpen: boolean) => void;
    setResult: (id: number, result: unknown) => void;
  }