// ============ Простой пример замыкания ============

// Замыкание - это способность функции запоминать свое лексическое окружение
// даже после того, как функция выполнена

function createCounter() {
    // Приватная переменная, доступная только внутри замыкания
    let count = 0;
    
    // Возвращаем функцию, которая имеет доступ к count
    return function() {
        return ++count; // Увеличиваем и возвращаем значение счетчика
    };
}

// Пример использования:
const counter1 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2

const counter2 = createCounter();
console.log(counter2()); // 1 (у каждого счетчика своя переменная count)

// Разбор областей видимости:
// 1. Глобальная область видимости:
//    - Доступна функция createCounter и переменные counter1, counter2

// 2. Область видимости функции createCounter:
//    - Доступна приватная переменная count

// 3. Область видимости возвращаемой функции:
//    - Доступна переменная count через замыкание
//    - Доступны все глобальные переменные

// Важно: каждый вызов createCounter создает новое независимое
// замыкание со своей собственной переменной count