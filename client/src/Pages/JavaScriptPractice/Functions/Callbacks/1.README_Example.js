// ============ Простой пример ============

//Для наглядной демонстрации что такое Callback концепция, последовательно распишим следующий код

//1. Создадим пример данных для использования их в функциях

let height = 12 //Высота
let width = 2 //Ширина
let arrExample = [2,1,2,3,5,6] //Пример массива который будем перемножать

//2. Создадим простую функцию, которая пока не является Callback, которую потом передадим в другую функцию. Назовем эту функцию "summ" - будем складывать 2 числа
function summ(a, b) {
    return a + b
}

//3. Создадим функцию высшего порядка, которая принимает массив и callback-функцию. Эта функция будет умножать каждый элемент массива на результат выполнения callback-функции.
function trueCallback(arr, callback) {
    const sum = callback(height, width); // 12 + 2 = 14
    return arr.map(item => item * sum);  // каждый элемент * 14
}

// Законсолим результат используя наши заготовки. Теперь наша функция summ стала Callback функцией, потому что она вызывается и завершает свою работу в другой функции высшего порядка.

console.log(
    trueCallback(
        arrExample, //передаем массив
        summ //передаем функцию которая теперь стала callback
    )
)

// Результат вывода: [28, 14, 28, 42, 70, 84]


// ============ Несколько колбэков в одной функции ============

// 1. Создадим три функции для различных математических операций
function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function subtract(a, b) {
    return a - b;
}

// 2. Создадим функцию высшего порядка, которая будет использовать все три колбэка последовательно
function multipleCallbacks(arr, callback1, callback2, callback3) {
    const result1 = callback1(height, width); // 12 * 2 = 24
    
    // Применяем второй колбэк к результату первого
    const result2 = callback2(result1, width); // 24 / 2 = 12
    
    // Применяем третий колбэк к результату второго
    const result3 = callback3(result2, width); // 12 - 2 = 10
    
    // Умножаем каждый элемент массива на финальный результат
    return arr.map(item => item * result3);
}

// 3. Вызываем функцию со всеми колбэками

console.log(multipleCallbacks(arrExample,multiply,divide,subtract))

// Результат вывода: [20, 10, 20, 30, 50, 60]

// ============ Обработка разных типов данных ============

// Подготовим данные разных типов для обработки
const testData = {
    text: "hello world",
    number: 42,
    nullValue: null,
    undefinedValue: undefined,
    array: [1, 2, 3, 4, 5],
    object: { name: "John", age: 30 },
    boolean: true
};

// 1. Создадим функции для обработки разных типов данных
function processString(str) {
    return str.toUpperCase();
}

function processNumber(num) {
    return num * 2;
}

function processNull() {
    return 'Получен null';
}

function processUndefined() {
    return 'Получен undefined';
}

function processArray(arr) {
    return arr.length;
}

function processObject(obj) {
    return Object.keys(obj).length;
}

function processBoolean(bool) {
    return !bool;
}

// 2. Создадим функцию высшего порядка, которая определяет тип данных и применяет соответствующую обработку
function smartProcessor(data, stringCallback, numberCallback, nullCallback, undefinedCallback, arrayCallback, objectCallback, booleanCallback) {
    if (typeof data === 'string') {
        return stringCallback(data);
    } else if (typeof data === 'number') {
        return numberCallback(data);
    } else if (data === null) {
        return nullCallback();
    } else if (data === undefined) {
        return undefinedCallback();
    } else if (Array.isArray(data)) {
        return arrayCallback(data);
    } else if (typeof data === 'boolean') {
        return booleanCallback(data);
    } else if (typeof data === 'object') {
        return objectCallback(data);
    }
}

// 3. Примеры использования с подготовленными данными
console.log(
    smartProcessor(
        testData.text,         // данные для обработки - строка "hello world"
        processString,         // преобразует строку в верхний регистр
        processNumber,         // умножает число на 2
        processNull,          // возвращает сообщение о null
        processUndefined,     // возвращает сообщение об undefined
        processArray,         // возвращает длину массива
        processObject,        // возвращает количество ключей объекта
        processBoolean        // инвертирует булево значение
    )
); // Выведет: "HELLO WORLD"

console.log(smartProcessor(testData.number, processString, processNumber, processNull, processUndefined, processArray, processObject, processBoolean)); // Выведет: 84
console.log(smartProcessor(testData.nullValue, processString, processNumber, processNull, processUndefined, processArray, processObject, processBoolean)); // Выведет: "Получен null"
console.log(smartProcessor(testData.array, processString, processNumber, processNull, processUndefined, processArray, processObject, processBoolean)); // Выведет: 5
console.log(smartProcessor(testData.object, processString, processNumber, processNull, processUndefined, processArray, processObject, processBoolean)); // Выведет: 2
console.log(smartProcessor(testData.boolean, processString, processNumber, processNull, processUndefined, processArray, processObject, processBoolean)); // Выведет: false

// ============ Пример асинхронного кода с использованием колбэков ============

/*
Структура асинхронного кода:
1. Данные - исходная информация, с которой работаем (в нашем случае базы данных)
2. Функция 1 - первая асинхронная операция (получение данных пользователя)
3. Функция 2 - вторая асинхронная операция (получение постов пользователя)
4. Функция высшего порядка - функция, которая организует выполнение асинхронных операций:
   {
     Функция 1 (получаем пользователя) {
        Функция 2 (получаем посты)
     }
   }

Этот пример наглядно показывает проблему "callback hell" (ада колбэков) - 
когда одна асинхронная операция зависит от результата другой, код начинает 
сильно вкладываться вправо. Например, если бы мы хотели:
1. Получить данные пользователя
2. Затем получить его посты
3. Затем отфильтровать определенные посты
4. Затем преобразовать их в новую структуру
5. И так далее...

Код стал бы очень сложным для чтения и поддержки.
*/

// 1. Создаем объект, который эмитирует базу данных с пользователями
const usersDB = {
    1: { name: 'Анна', age: 25 },
    2: { name: 'Иван', age: 30 }
};

// 2. Создаем объект, который эмитирует базу данных с постами пользователей
const postsDB = {
    'Анна': ['Привет, это мой первый пост!', 'Сегодня отличная погода!'],
    'Иван': ['JavaScript - мой любимый язык', 'Изучаю колбэки']
};

// 3. Создаем функцию, которая имитирует получение данных пользователя
function getUserData(userId, callback) {
    console.log(`Получаем данные пользователя с ID: ${userId}`);
    
    setTimeout(() => {
        const userData = usersDB[userId];
        if (userData) {
            callback(null, userData);
        } else {
            callback(new Error('Пользователь не найден'));
        }
    }, 1000);
}

// 4. Создаем функцию, которая имитирует получение постов пользователя
function getUserPosts(userName, callback) {
    console.log(`Получаем посты пользователя: ${userName}`);
    
    setTimeout(() => {
        const userPosts = postsDB[userName];
        if (userPosts) {
            callback(null, userPosts);
        } else {
            callback(new Error('Посты не найдены'));
        }
    }, 1000);
}

// 5. Демонстрация использования колбэков (callback hell)

// Получаем данные пользователя по ID=1. Для вывода разных результатов в getUserData(1 - меняем число(0-3), (error, user) => {...}. 

getUserData(1, //<-менять
    (error, user) => {
    if (error) {
        console.error('Ошибка:', error.message);
        return;
    }
    
    console.log('Получены данные пользователя:', user);
    
    // После успешного получения данных пользователя
    // запрашиваем его посты, используя имя пользователя
    getUserPosts(user.name, (error, posts) => {
        if (error) {
            console.error('Ошибка:', error.message);
            return;
        }
        
        console.log('Получены посты пользователя:', posts);
    });
});