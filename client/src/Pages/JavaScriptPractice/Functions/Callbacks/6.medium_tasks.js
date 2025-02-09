// ============ Описание задачи: Асинхронные операции ============
/*
Чему научит:
- Работа с асинхронным кодом
- Управление последовательностью операций
- Обработка ошибок в асинхронном контексте
- Создание цепочек callback-функций

Применение в реальной разработке:
- Загрузка данных с сервера
- Обработка пользовательского ввода
- Работа с файловой системой
- Управление состоянием приложения
*/

// ============ Задача 1: Последовательное выполнение операций ============
const asyncOperations = [
    { id: 1, name: "Загрузка данных", delay: 1000 },
    { id: 2, name: "Обработка данных", delay: 500 },
    { id: 3, name: "Сохранение результата", delay: 800 }
];

// ============ Функция последовательного выполнения ============
function executeSequentially(operations, callback) {
    // Ваш код здесь
}

// TODO: Создайте callback-функцию, которая:
// 1. Выполняет операции последовательно
// 2. Передает результат каждой операции в следующую
// 3. Обрабатывает ошибки в каждой операции

// ============ Пример использования и ожидаемый результат ============
executeSequentially(asyncOperations, operation => {
    // Ваш код здесь
});

// Ожидаемый результат в консоли:
// "Начало выполнения: Загрузка данных"
// "Завершено: Загрузка данных"
// "Начало выполнения: Обработка данных"
// "Завершено: Обработка данных"
// "Начало выполнения: Сохранение результата"
// "Завершено: Сохранение результата"

// ============ Задача 2: Работа с файлами ============
const files = [
    { id: 1, name: "data.txt", content: "Hello World" },
    { id: 2, name: "config.json", content: "{}" },
    { id: 3, name: "log.txt", content: "Error log" }
];

// ============ Функция обработки файлов ============
function processFiles(files, successCallback, errorCallback) {
    // Ваш код здесь
}

// TODO: Создайте callback-функции, которые:
// 1. Обрабатывают успешное чтение файла
// 2. Обрабатывают ошибки при чтении
// 3. Логируют все операции

// ============ Пример использования ============
processFiles(
    files,
    (file) => {
        console.log(`Успешно прочитан файл: ${file.name}`);
        // Дополнительная обработка успеха
    },
    (error) => {
        console.error(`Ошибка чтения файла: ${error.message}`);
        // Дополнительная обработка ошибки
    }
);

// ============ Задача 3: Система событий ============
const eventSystem = {
    subscribers: new Map(),
    events: ['click', 'hover', 'scroll']
};

// ============ Функция управления событиями ============
function eventHandler(eventName, callback) {
    // Ваш код здесь
}

// TODO: Создайте callback-функцию, которая:
// 1. Подписывается на указанное событие
// 2. Позволяет отменить подписку
// 3. Обрабатывает событие при срабатывании

// ============ Пример использования ============
const unsubscribe = eventHandler('click', event => {
    console.log(`Обработка события: ${event}`);
    // Дополнительная логика обработки события
});

// При вызове unsubscribe():
// Отписка от события: click