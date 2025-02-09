// ============ Практика обработки ошибок ============
/*
Чему научит:
- Обработка различных типов ошибок
- Создание информативных сообщений об ошибках
- Логирование ошибок
*/

function handleAPIRequest(endpoint, callback) {
    setTimeout(() => {
        const random = Math.random();
        if (random < 0.3) {
            callback(new Error('Сетевая ошибка'));
        } else if (random < 0.6) {
            callback(new Error('Ошибка сервера'));
        } else {
            callback(null, { success: true });
        }
    }, 1000);
}

// Пример использования
handleAPIRequest('/api/data', (error, response) => {
    if (error) {
        console.error('Произошла ошибка:', error.message);
        return;
    }
    console.log('Успешный ответ:', response);
});