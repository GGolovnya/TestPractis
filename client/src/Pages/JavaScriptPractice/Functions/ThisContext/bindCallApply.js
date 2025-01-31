// Примеры привязки контекста

// Использование bind
function showInfo() {
    console.log(`${this.name} - ${this.role}`);
}
const user = { name: 'Анна', role: 'Админ' };
const boundFunction = showInfo.bind(user);

// Использование call
function introduce(greeting) {
    console.log(`${greeting}, я ${this.name}`);
}
introduce.call(user, 'Привет');

// Использование apply
function printStats(salary, bonus) {
    console.log(`${this.name}: ${salary + bonus}₽`);
}
printStats.apply(user, [50000, 10000]);