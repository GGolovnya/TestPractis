// Пример сильных ссылок
let obj = { data: "some data" };
let array = [obj]; // Сильная ссылка в массиве
let map = new Map();
map.set("key", obj); // Сильная ссылка в Map

// Даже если мы обнулим первоначальную ссылку
obj = null;

// Объект всё ещё доступен через массив и map
console.log(array[0]); // { data: "some data" }
console.log(map.get("key")); // { data: "some data" }

// Объект не будет собран сборщиком мусора, 
// пока существует хотя бы одна сильная ссылка