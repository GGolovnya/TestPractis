// ============ Практика кеширования ============
/*
Чему научит:
- Реализация простого кеша
- Проверка актуальности кешированных данных
- Очистка устаревших данных
*/

const cache = new Map();

function fetchWithCache(key, callback) {
    if (cache.has(key)) {
        const { data, timestamp } = cache.get(key);
        const isExpired = Date.now() - timestamp > 5000; // 5 секунд
        
        if (!isExpired) {
            callback(null, data);
            return;
        }
    }
    
    // Эмуляция запроса к API
    setTimeout(() => {
        const data = { id: key, value: Math.random() };
        cache.set(key, { data, timestamp: Date.now() });
        callback(null, data);
    }, 1000);
}

// Пример использования
fetchWithCache('user-1', (error, data) => {
    if (error) {
        console.error('Ошибка:', error);
        return;
    }
    console.log('Данные:', data);
});