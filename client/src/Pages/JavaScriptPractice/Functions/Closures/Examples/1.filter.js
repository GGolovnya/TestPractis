// Пример фильтра с использованием замыкания
function createFilter(minValue) {
    return function(number) {
        return number >= minValue;
    };
}

const filterMoreThan10 = createFilter(10);
console.log([5, 15, 8, 12].filter(filterMoreThan10));