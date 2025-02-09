// Расширенная система работы с пользователями, включая бонусы и подарки

// База данных пользователей с дополнительными полями
const usersDB = [
    { login: 'Вадим83', password: 'Пар0л1', bonusPoints: 0, gifts: [] },
    { login: 'Анна95', password: 'Секрет123', bonusPoints: 0, gifts: [] },
    { login: 'ВаняПусин', password: 'Jdie93', bonusPoints: 0, gifts: [] },
    { login: 'Камил10', password: '938(А;032Х', bonusPoints: 0, gifts: [] },
    { login: 'ФархатЛоу', password: 'lOF932-f)F', bonusPoints: 0, gifts: [] },
    { login: 'Варкин_Каша', password: 'Простой_Пароль', bonusPoints: 0, gifts: [] }
];

// ======== Сама программа ========

function createEnhancedUserSystem(userData) {
    // Защищенные данные пользователя
    let login = userData.login;
    let password = userData.password;
    // + Счетчик бонусных баллов пользователя
    let bonusPoints = userData.bonusPoints;
    // + Массив подарков пользователя (создаем копию массива)
    let gifts = [...userData.gifts];
    // + Время последней активности пользователя
    let lastActivity = new Date();
    
    return {
        // Базовые методы
        getLogin() {
            return login;
        },
        checkPassword(inputPassword) {
            return password === inputPassword;
        },
        
        // Методы для работы с бонусами
        addBonusPoints(points) {
            bonusPoints += points;
            lastActivity = new Date();
            return `Пользователю ${login} начислено ${points} бонусных баллов. Всего: ${bonusPoints}`;
        },
        getBonusPoints() {
            return bonusPoints;
        },
        
        // Методы для работы с подарками
        addGift(gift) {
            gifts.push({
                name: gift,
                dateReceived: new Date()
            });
            lastActivity = new Date();
            return `Пользователь ${login} получил подарок: ${gift}`;
        },
        getGifts() {
            return [...gifts];
        },
        
        // Получение информации об активности
        getLastActivity() {
            return lastActivity;
        },
        
        // Получение полного отчета
        getUserReport() {
            return {
                login,
                bonusPoints,
                giftsCount: gifts.length,
                lastActivity
            };
        }
    };
}

// Пример использования первому пользователю:
const enhancedUser1 = createEnhancedUserSystem(usersDB[0]);

// Начисляем бонусы первому пользователю
console.log(enhancedUser1.addBonusPoints(100));
console.log(enhancedUser1.addBonusPoints(50));

// Добавляем подарки первому пользователю
console.log(enhancedUser1.addGift('Премиум подписка'));
console.log(enhancedUser1.addGift('Скидочный купон'));
console.log(enhancedUser1.addGift('Вибро-масссажор'));
console.log(enhancedUser1.addGift('Автомобиль Лада'));

// Проверяем отчет первого пользователя
console.log('Отчет по пользователю:', enhancedUser1.getUserReport());

// Проверяем список подарков первого пользователя
console.log('Список подарков:', enhancedUser1.getGifts());

// Создаем и проверяем других пользователей
const enhancedUser2 = createEnhancedUserSystem(usersDB[1]);
console.log(enhancedUser2.addBonusPoints(75));
console.log(enhancedUser2.addGift('Приветственный бонус'));

const enhancedUser3 = createEnhancedUserSystem(usersDB[2]);
console.log(enhancedUser3.addBonusPoints(200));
console.log(enhancedUser3.addGift('VIP статус'));