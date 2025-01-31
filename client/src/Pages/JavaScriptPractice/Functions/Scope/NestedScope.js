// Пример вложенных областей видимости
function outerFunction(outerParam) {
    const outerVar = 'Я в внешней функции';
    
    function middleFunction(middleParam) {
        const middleVar = 'Я в средней функции';
        
        function innerFunction(innerParam) {
            const innerVar = 'Я во внутренней функции';
            
            // Доступ ко всем переменным
            console.log(outerVar); // Доступна
            console.log(middleVar); // Доступна
            console.log(innerVar); // Доступна
            console.log(outerParam); // Доступна
            console.log(middleParam); // Доступна
            console.log(innerParam); // Доступна
        }
        
        return innerFunction;
    }
    
    return middleFunction;
}

// Практический пример использования вложенных областей
function createCounter(initial) {
    let count = initial;
    
    return {
        increment() {
            return ++count;
        },
        decrement() {
            return --count;
        },
        getValue() {
            return count;
        }
    };
}