// src/types/index.ts
export interface ChunkData {
  id: number;
  data: Record<string, unknown>;
}

export interface StoreState {
  openBlocks: Record<number, boolean>;
  loadedChunks: Record<number, boolean>;
  data: Record<number, Record<number, unknown>>;
  results: Record<number, unknown>;
  cancelledTasks: Record<number, boolean>;
  loadChunk: (chunkId: number) => Promise<void>;
  getData: (id: number) => unknown;
  setBlockOpen: (id: number, isOpen: boolean) => void;
  setResult: (id: number, result: unknown) => void;
  cancelTask: (id: number) => void;
  resumeTask: (id: number) => void;
  resetStore: () => void;
  isBlockProcessing: (id: number) => boolean;
  isPaused: () => boolean;
  getBlockStartTime: (id: number) => number | undefined;
}