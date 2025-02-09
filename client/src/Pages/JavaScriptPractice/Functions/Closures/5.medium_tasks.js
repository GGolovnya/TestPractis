// ============ Задачи среднего уровня на замыкания ============

// 1. Создание кэширующей функции
function createCache() {
    const cache = new Map();
    
    return function(n) {
        if (cache.has(n)) {
            console.log('Fetching from cache');
            return cache.get(n);
        }
        
        console.log('Calculating result');
        const result = n * n;
        cache.set(n, result);
        return result;
    };
}

const square = createCache();
console.log(square(5)); // Calculating result: 25
console.log(square(5)); // Fetching from cache: 25

// 2. Создание функции для подсчета вызовов
function createFunctionTimer() {
    const stats = new Map();
    
    return function(fn, name) {
        return function(...args) {
            const start = performance.now();
            const result = fn.apply(this, args);
            const end = performance.now();
            
            const functionStats = stats.get(name) || { calls: 0, totalTime: 0 };
            functionStats.calls++;
            functionStats.totalTime += (end - start);
            stats.set(name, functionStats);
            
            console.log(`Function ${name}:`, functionStats);
            return result;
        };
    };
}

const timer = createFunctionTimer();
const timedFunction = timer((x) => x * x, 'square');
timedFunction(5);
timedFunction(10);

// 3. Создание функции с ограничением вызовов
function createLimitedFunction(fn, limit) {
    let calls = 0;
    
    return function(...args) {
        if (calls >= limit) {
            console.log('Call limit exceeded');
            return;
        }
        
        calls++;
        return fn.apply(this, args);
    };
}

const limitedLog = createLimitedFunction((x) => console.log(x), 2);
limitedLog('First call'); // "First call"
limitedLog('Second call'); // "Second call"
limitedLog('Third call'); // "Call limit exceeded"