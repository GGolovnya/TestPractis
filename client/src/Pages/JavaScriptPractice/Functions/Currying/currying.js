function curry(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

const functionCurry1 = curry('Текст 1 / ')
console.log(functionCurry1('Текст 2 / '))