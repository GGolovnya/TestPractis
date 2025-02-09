// ============ Практика обработки JSON ============
/*
Чему научит:
- Парсинг JSON данных
- Валидация JSON
- Обработка ошибок парсинга
*/

function parseJSON(jsonString, callback) {
    try {
        const data = JSON.parse(jsonString);
        callback(null, data);
    } catch (error) {
        callback(error);
    }
}

// Пример использования
const jsonData = '{"name": "Иван", "age": 30}';
parseJSON(jsonData, (error, data) => {
    if (error) {
        console.error('Ошибка парсинга:', error);
        return;
    }
    console.log('Данные:', data);
});