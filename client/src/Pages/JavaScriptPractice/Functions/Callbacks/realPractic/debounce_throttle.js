// ============ Практика debounce и throttle ============
/*
Чему научит:
- Оптимизация частых вызовов функций
- Контроль частоты выполнения
- Улучшение производительности
*/

// Реализация debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Реализация throttle
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Пример использования
const debouncedSearch = debounce((query) => {
    console.log('Поиск:', query);
}, 500);

const throttledScroll = throttle(() => {
    console.log('Прокрутка');
}, 1000);