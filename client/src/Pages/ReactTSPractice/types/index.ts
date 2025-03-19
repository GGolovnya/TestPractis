// src/types/index.ts
export interface ChunkData {
    id: number;
    data: any;
  }
  
  export interface StoreState {
    openBlocks: Record<string, boolean>;
    loadedChunks: Record<string, boolean>;
    data: Record<string, string>;
    results: Record<string, any>;
  }