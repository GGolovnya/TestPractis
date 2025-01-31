// Базовый цикл do...while
let num = 0;
do {
    console.log(num);
    num++;
} while (num < 5);

// Пример с проверкой ввода
do {
    // В реальном коде здесь было бы получение ввода пользователя
    var input = 'valid'; // Для примера
} while (!isValid(input));