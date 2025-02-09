// ============ Базовые примеры замыканий ============

// 1. Простое замыкание с одной переменной
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// 2. Замыкание с несколькими переменными
function createCalculator(initialValue) {
    let value = initialValue;
    let operations = 0;
    
    return {
        add(n) {
            value += n;
            operations++;
            return value;
        },
        subtract(n) {
            value -= n;
            operations++;
            return value;
        },
        getOperations() {
            return operations;
        }
    };
}

const calc = createCalculator(10);
console.log(calc.add(5)); // 15
console.log(calc.subtract(3)); // 12
console.log(calc.getOperations()); // 2

// 3. Замыкание для создания уникальных ID
function createIdGenerator(prefix = 'id') {
    let counter = 0;
    
    return function() {
        counter++;
        return `${prefix}_${counter}`;
    };
}

const generateUserId = createIdGenerator('user');
console.log(generateUserId()); // "user_1"
console.log(generateUserId()); // "user_2"