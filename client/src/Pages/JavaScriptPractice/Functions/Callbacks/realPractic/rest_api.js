// ============ Практика работы с REST API ============
/*
Чему научит:
- Выполнение HTTP-запросов с использованием колбэков
- Обработка ответов от API
- Обработка ошибок сети
*/

// Эмуляция API endpoint
const API_URL = 'https://api.example.com/users';

// Функция для выполнения GET-запроса
function fetchUser(userId, callback) {
    setTimeout(() => {
        const user = {
            id: userId,
            name: 'Иван',
            email: 'ivan@example.com'
        };
        callback(null, user);
    }, 1000);
}

// Функция для выполнения POST-запроса
function createUser(userData, callback) {
    setTimeout(() => {
        callback(null, { 
            id: Date.now(),
            ...userData,
            created: true 
        });
    }, 1000);
}

// Пример использования
fetchUser(1, (error, user) => {
    if (error) {
        console.error('Ошибка:', error);
        return;
    }
    console.log('Получен пользователь:', user);
});