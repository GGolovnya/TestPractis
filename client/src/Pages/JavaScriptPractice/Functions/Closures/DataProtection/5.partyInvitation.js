// Программа для приглашения пользователей на вечеринку (VIP статус или автомобиль)

// ======== Имитация API ========

const usersDB = [
    { login: 'Вадим83', password: 'Пар0л1', bonusPoints: 0, gifts: [] },
    { login: 'Анна95', password: 'Секрет123', bonusPoints: 0, gifts: [] },
    { login: 'ВаняПусин', password: 'Jdie93', bonusPoints: 0, gifts: [] },
    { login: 'Камил10', password: '938(А;032Х', bonusPoints: 0, gifts: [] },
    { login: 'ФархатЛоу', password: 'lOF932-f)F', bonusPoints: 0, gifts: [] },
    { login: 'Варкин_Каша', password: 'Простой_Пароль', bonusPoints: 0, gifts: [] }
];

// ======== + Глобальные переменные ========

let mutationDate = new Date().toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
}); // Так как дата выводится в не читаемом формате, сразу сделаем заготовку для нормального вывода даты и будем использовать ниже где нужно

// ======== Программа ========

// Создание пользователей
function createEnhancedUserSystem(userData) {
    let login = userData.login;
    let password = userData.password;
    let bonusPoints = userData.bonusPoints;
    let gifts = [...userData.gifts];
    let lastActivity = mutationDate;
    
    return {
        getLogin() {
            return login;
        },
        checkPassword(inputPassword) {
            return password === inputPassword;
        },
        addBonusPoints(points) {
            bonusPoints += points;
            lastActivity = mutationDate;
            return `Пользователю ${login} начислено ${points} бонусных баллов. Всего: ${bonusPoints}`;
        },
        getBonusPoints() {
            return bonusPoints;
        },
        addGift(gift) {
            gifts.push({
                name: gift,
                dateReceived: mutationDate
            });
            lastActivity = mutationDate;
            return `Пользователь ${login} получил подарок: ${gift}`;
        },
        getGifts() {
            return [...gifts];
        },
        getLastActivity() {
            return lastActivity;
        },
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


//Большую часть методов пока использовать не будем, нужны только подарки
const enhancedUser1 = createEnhancedUserSystem(usersDB[0]);
enhancedUser1.addGift('Вибро-масссажор');
enhancedUser1.addGift('АВТОМОБИЛЬ');

const enhancedUser2 = createEnhancedUserSystem(usersDB[1]);
enhancedUser2.addGift('Приветственный бонус')

const enhancedUser3 = createEnhancedUserSystem(usersDB[2]);
enhancedUser3.addGift('Вареник');

const enhancedUser4 = createEnhancedUserSystem(usersDB[3]);
enhancedUser4.addGift('VIP статус');

const enhancedUser5 = createEnhancedUserSystem(usersDB[4]);
enhancedUser5.addGift('VIP статус');

const enhancedUser6 = createEnhancedUserSystem(usersDB[5]);
enhancedUser6.addGift('АвтомОбиль');

// + Создаем функцию для управления списком гостей на вечеринку тоже используя замыкание для защиты списка гостей в котоую будем передавать полученные значения из предыдущих методов предыдущей функции с замыканием

function createPartyGuestList() {
    const guestList = [];
    
    return {
        // Проверяем пользователя на наличие VIP статуса и автомобиля
        checkEligibility(user) {
            const gifts = user.getGifts();
            const hasVIP = gifts.some(gift => gift.name === 'VIP статус');
            const hasCar = gifts.some(gift => gift.name.toLowerCase().includes('автомобиль')); // Добавляем приведение в менее строгое сравнение для вариаций ввода "АвтоМобиль", "АВТОМОБИЛЬ" или "Автомобиль"
            return hasVIP || hasCar;
        },
        
        // Добавляем пользователя в список гостей
        addGuest(user) {
            if (this.checkEligibility(user)) {
                guestList.push({
                    login: user.getLogin(),
                    gifts: user.getGifts(),
                    addedAt: mutationDate
                });
                return `${user.getLogin()} добавлен в список гостей!`;
            }
            return `${user.getLogin()} не соответствует критериям для приглашения.`;
        },
        
        // Получаем список всех гостей
        getGuestList() {
            return [...guestList];
        }
    };
}

// Создаем список гостей
const partyGuests = createPartyGuestList();

// Проверяем всех пользователей и добавляем подходящих в список гостей
console.log(partyGuests.addGuest(enhancedUser1)); // Добавится (есть автомобиль)
console.log(partyGuests.addGuest(enhancedUser2)); // Не добавится
console.log(partyGuests.addGuest(enhancedUser3)); // Добавится (есть VIP статус)
console.log(partyGuests.addGuest(enhancedUser4));
console.log(partyGuests.addGuest(enhancedUser5));
console.log(partyGuests.addGuest(enhancedUser6));

// Выводим финальный список гостей
console.log(`Список приглашенных гостей ${partyGuests.getGuestList().length}:`);
console.log(partyGuests.getGuestList());