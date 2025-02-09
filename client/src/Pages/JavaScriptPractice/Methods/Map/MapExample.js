// Основные методы котоыре будем исопльзвоать для работы с Map:
// - set() - добавление элементов
// - get() - получение значения по ключу
// - has() - проверка наличия ключа
// - delete() - удаление элемента
// - clear() - очистка всего Map
// - size - получение размера Map


// Создаем новый Map
const skillMap = new Map();

// Добавляем элементы
skillMap.set('JavaScript', 'Advanced');
skillMap.set('HTML', 'Intermediate');
skillMap.set('CSS', 'Intermediate');

// Получаем значения
console.log(skillMap.get('JavaScript')); // 'Advanced'

// Проверяем наличие ключа
console.log(skillMap.has('Python')); // false

// Удаляем элемент
skillMap.delete('CSS');

// Получаем количество элементов
console.log(skillMap.size); // 2

// Перебираем все элементы
skillMap.forEach((value, key) => {
    console.log(`${key}: ${value}`);
});

// Очищаем Map
skillMap.clear();

// Создаем Map из массива пар
const newMap = new Map([
    ['name', 'John'],
    ['age', 30],
    ['city', 'New York'],
    ['sd', 'New York']
]);

console.log(newMap.get('age'));
