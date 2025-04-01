const { Worker } = require('worker_threads');
const path = require('path');

function calculateFibonacci(n) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.join(__dirname, 'worker.js'), { workerData: { n } });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Worker exited with code ${code}`));
        });
    });
}

module.exports = { calculateFibonacci };