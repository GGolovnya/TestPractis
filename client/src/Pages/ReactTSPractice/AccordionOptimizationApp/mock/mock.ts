export const generateMockData = (): Record<number, unknown> => {
  const data: Record<number, unknown> = {};
  for (let i = 0; i < 100; i++) {
    const index = i;
    data[index] = {
      value: Math.random() * 1000,
      timestamp: new Date().toISOString(),
      category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
    };
  }
  return data;
};