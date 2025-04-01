function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

self.onmessage = (event) => {
  const { id, data, n } = event.data;
  const startTime = Date.now();
  // PINK: Используем переданное n (может быть рандомным или фиксированным)
  const fibResult = fibonacci(n);
  const endTime = Date.now();

  self.postMessage({
    input: n,
    result: fibResult,
    calculationTime: endTime - startTime,
    timestamp: new Date().toISOString(),
  });
};