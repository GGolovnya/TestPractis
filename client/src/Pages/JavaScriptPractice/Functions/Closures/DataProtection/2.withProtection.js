// Шаг2. Решение: Защита данных с помощью замыкания

function createSecureCredentials() {
    // Теперь эти переменные защищены внутри функции
    let login = 'Вадим83';
    let password = 'Пар0л1';
    
    return {
        // Методы для безопасного доступа к данным
        getLogin() {
            return login;
        },
        checkPassword(inputPassword) {
            return password === inputPassword;
        }
    };
}

const credentials = createSecureCredentials();

// Теперь нет прямого доступа к переменным
// console.log(login); // Ошибка: login не определен
// console.log(password); // Ошибка: password не определен

//Можно достучаться только через методы
console.log(credentials.getLogin());
console.log(credentials.checkPassword('Пар0л1'));

// Невозможно изменить данные извне
// login = 'Хакер'; // Ошибка: login не определен
// password = '12345'; // Ошибка: password не определен