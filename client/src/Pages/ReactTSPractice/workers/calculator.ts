// src/workers/calculator.ts
self.onmessage = (e) => {
    const { id, data } = e.data;
    // Выполнение тяжелых вычислений
    const result = performCalculations(data);
    self.postMessage(result);
  };