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
  results: Record<number, CalculationResult>;
  cancelledTasks: Record<number, boolean>;
  isServerMode: boolean;
  // PINK: Добавляем customN и useFixedN в интерфейс
  customN: number;
  useFixedN: boolean;
  resetResults: () => void;
  setServerMode: (mode: boolean) => void;
  setCustomN: (n: number) => void;
  setUseFixedN: (useFixed: boolean) => void;
  loadChunk: (chunkId: number) => Promise<void>;
  getData: (id: number) => unknown;
  setBlockOpen: (id: number, isOpen: boolean) => void;
  setResult: (id: number, result: CalculationResult) => void;
  cancelTask: (id: number) => void;
  resumeTask: (id: number) => void;
  resetStore: () => void;
  isBlockProcessing: (id: number) => boolean;
  isPaused: () => boolean;
  getBlockStartTime: (id: number) => number | undefined;
}