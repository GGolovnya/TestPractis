// Пример приватного состояния
function createUser(name) {
    let age = 0;
    
    return {
        getName() { return name; },
        setAge(newAge) { age = newAge; },
        getAge() { return age; }
    };
}

const user = createUser("Вася");
user.setAge(25);
console.log(user.getName());
console.log(user.getAge());