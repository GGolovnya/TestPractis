function measureTime(fn) {
    return function(...args) {
        const start = performance.now();
        const result = fn.apply(this, args);
        const end = performance.now();
        console.log(`Время выполнения: ${end - start}мс`);
        return result;
    };
}