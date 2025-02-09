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

// + ======== Глобальные переменные ========
// + Улучшили форматирование даты для более читаемого вывода
const mutationDate = new Date().toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});

// + ======== Вспомогательные функции ========
// + Добавили отдельную функцию для поиска подарков по типу (VIP/автомобиль)
const findGiftByType = (gifts, type) => {
    return gifts.find(gift => 
        type === 'VIP' 
            ? gift.name === 'VIP статус'
            : gift.name.toLowerCase().includes('автомобиль')
    )?.name;
};

// + ======== Основные функции ========
// + Улучшили систему пользователей с сохранением всех методов
function createEnhancedUserSystem(userData) {
    const { login, password } = userData;
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

// + ======== Создание пользователей и добавление подарков ========
const users = usersDB.map(userData => createEnhancedUserSystem(userData));

users[0].addGift('АВТОМОБИЛЬ');
users[3].addGift('VIP статус');
users[4].addGift('VIP статус');
users[5].addGift('АвтомОбиль');

// + ======== Создание и наполнение списка гостей ========
function createPartyGuestList() {
    const guestList = [];
    
    const checkEligibility = user => {
        const gifts = user.getGifts();
        return gifts.some(gift => 
            gift.name === 'VIP статус' || 
            gift.name.toLowerCase().includes('автомобиль')
        );
    };
    
    return {
        addGuest(user) {
            if (checkEligibility(user)) {
                guestList.push({
                    login: user.getLogin(),
                    gifts: user.getGifts(),
                    addedAt: mutationDate
                });
                return `${user.getLogin()} добавлен в список гостей!`;
            }
            return `${user.getLogin()} не соответствует критериям для приглашения.`;
        },
        
        getGuestList() {
            return guestList.map((guest, index) => {
                const vipGift = findGiftByType(guest.gifts, 'VIP');
                const carGift = findGiftByType(guest.gifts, 'car');
                const giftToShow = vipGift || carGift;
                
                return `Гость ${index + 1}: ${guest.login} (подарок: ${giftToShow})`;
            });
        }
    };
}

const partyGuests = createPartyGuestList();

// Проверяем всех пользователей
users.forEach(user => {
    console.log(partyGuests.addGuest(user));
});

// Выводим финальный список
const guestList = partyGuests.getGuestList();
console.log(`\nСписок приглашенных гостей (${guestList.length}):`);
guestList.forEach(guest => console.log(guest));