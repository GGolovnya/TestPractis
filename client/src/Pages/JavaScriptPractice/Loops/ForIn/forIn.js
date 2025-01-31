// Цикл for...in для объектов
const person = {
    name: 'John',
    age: 30,
    city: 'New York'
};

for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}

// For...in с массивами (не рекомендуется)
const arr = ['a', 'b', 'c'];
for (const index in arr) {
    console.log(`${index}: ${arr[index]}`);
}