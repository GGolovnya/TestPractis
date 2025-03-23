// src/workers/calculator.js

// Рекурсивное вычисление числа Фибоначчи
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function calculateStatistics(inputData) {
  console.log('Начало расчета числа Фибоначчи. Входные данные:', inputData);
  
  const startTime = Date.now();
  
  // Генерируем случайное число от 25 до 40 для действительно тяжелых вычислений
  const n = Math.floor(Math.random() * 15) + 33;
  const fibResult = fibonacci(n);
  
  const endTime = Date.now();
  
  return {
    input: n,
    result: fibResult,
    calculationTime: endTime - startTime,
    timestamp: new Date().toISOString()
  };
}

self.onmessage = (event) => {
  const { data } = event;
  const calculationResults = calculateStatistics(data.data);
  self.postMessage(calculationResults);
};