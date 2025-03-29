export const generateMockData = (chunkId: number): Record<number, unknown> => {
  const data: Record<number, unknown> = {};
  for (let i = 0; i < 100; i++) {
    const index = i; // Используем индексы 0-99 вместо глобальных ID
    data[index] = {
      value: Math.random() * 1000,
      timestamp: new Date().toISOString(),
      category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
    };
  }
  console.log(`Сгенерированы тестовые данные для чанка ${chunkId}:`, data);
  return data;
};