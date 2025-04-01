const { parentPort, workerData } = require('worker_threads');

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const startTime = Date.now();
const fibResult = fibonacci(workerData.n);
const endTime = Date.now();

const result = {
    input: workerData.n,
    result: fibResult,
    calculationTime: endTime - startTime,
    timestamp: new Date().toISOString()
};

parentPort.postMessage(result);