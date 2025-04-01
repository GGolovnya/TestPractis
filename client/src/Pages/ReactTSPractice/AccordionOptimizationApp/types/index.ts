// src/types/index.ts
export interface ChunkData {
  id: number;
  data: Record<string, unknown>;
}

export interface CalculationResult {
  input: number;
  result: number | string;
  calculationTime: number;
  timestamp: string;
}

export interface StoreState {
  openBlocks: Record<number, boolean>;
  loadedChunks: Record<number, boolean>;
  data: Record<number, Record<number, unknown>>;
  results: Record<number, CalculationResult>; // Уточняем тип результатов
  cancelledTasks: Record<number, boolean>;
  isServerMode: boolean; // Добавляем в интерфейс
  resetResults: () => void; // Добавляем resetResults в интерфейс
  setServerMode: (mode: boolean) => void; // Добавляем setServerMode
  loadChunk: (chunkId: number) => Promise<void>;
  getData: (id: number) => unknown;
  setBlockOpen: (id: number, isOpen: boolean) => void;
  setResult: (id: number, result: CalculationResult) => void; // Уточняем тип результата
  cancelTask: (id: number) => void;
  resumeTask: (id: number) => void;
  resetStore: () => void;
  isBlockProcessing: (id: number) => boolean;
  isPaused: () => boolean;
  getBlockStartTime: (id: number) => number | undefined;
}