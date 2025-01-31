// Пример функции-конструктора
function User(name, age) {
    this.name = name;
    this.age = age;
    
    this.greet = function() {
        return `Привет, меня зовут ${this.name}!`;
    };
}

const user1 = new User('Иван', 25);