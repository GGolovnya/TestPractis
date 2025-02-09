//Шаг 3. Создадим систему защиты учетных данных пользователей с использованием замыканий.

// Сначала определим базу данных пользователей (представим что она максимально защищена и мы данные получаем через api и используется хеширование):
const usersDB = [
    { login: 'Вадим83', password: 'Пар0л1' },
    { login: 'Анна95', password: 'Секрет123' },
    { login: 'ВаняПусин', password: 'Jdie93' },
    { login: 'Камил10', password: '938(А;032Х' },
    { login: 'ФархатЛоу', password: 'lOF932-f)F' },
    { login: 'Варкин_Каша', password: 'Простой_Пароль' }
];

// Функция для безопасной работы с учетными данными
function createSecureCredentials(userData) {
    // Защищенные переменные внутри замыкания
    let login = userData.login;
    let password = userData.password;
    
    return {
        // Показываем только логин
        getLogin() {
            return login;
        },
        // Проверяем пароль без его раскрытия
        checkPassword(inputPassword) {
            return password === inputPassword;
        }
    };
}

// Пример использования:
const user1 = createSecureCredentials(usersDB[0]);
console.log(user1.getLogin()); // Вызываем метод получения пользователя который покажет "Вадим83"
console.log(user1.checkPassword('Пар0л1')); // Вводим правильный пароль и получаем true
console.log(user1.checkPassword('неверный')); // Вводим не правильный пароль и получаем false

// В этом примере данные защищены в замыкании. Единственный способ проверить пароль - использовать метод checkPassword, который не раскрывает сам пароль. Логин можно получить через getLogin, но пароль остается скрытым.

//Проверим новых пользователей

const user2 = createSecureCredentials(usersDB[1]);
const user3 = createSecureCredentials(usersDB[2]);
const user4 = createSecureCredentials(usersDB[3]);
const user5 = createSecureCredentials(usersDB[4]);
const user6 = createSecureCredentials(usersDB[5]);

console.log(user2.getLogin());
console.log(user3.getLogin());
console.log(user4.getLogin());
console.log(user5.getLogin());
console.log(user6.getLogin());