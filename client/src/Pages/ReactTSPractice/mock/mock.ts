export const generateMockData = (chunkId: number): Record<number, unknown> => {
    const data: Record<number, unknown> = {};
    
    for (let i = 0; i < 100; i++) {
      const id = chunkId * 100 + i;
      data[id] = {
        value: Math.random() * 1000,
        timestamp: new Date().toISOString(),
        category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
      };
    }
    
    console.log(`Сгенерированы тестовые данные для чанка ${chunkId}:`, data); //работает
    return data;
  };
  