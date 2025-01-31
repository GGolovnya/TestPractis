// для примеров работы сборщика мусора

// Сильная ссылка
let user = { name: 'John' };
const userMap = new Map();
userMap.set(user, 'some data');
// Объект user не будет удален сборщиком мусора,
// пока существует ссылка на него в Map

// Слабая ссылка
let user2 = { name: 'Jane' };
const userWeakMap = new WeakMap();
userWeakMap.set(user2, 'some data');
// Если удалить все сильные ссылки на объект user2,
// он может быть удален сборщиком мусора, несмотря на наличие в WeakMap

user2 = null; // Теперь объект может быть удален сборщиком мусора