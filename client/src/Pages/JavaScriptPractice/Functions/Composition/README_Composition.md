# Композиция функций в JavaScript

## Что такое композиция функций?
Композиция функций - это механизм объединения нескольких функций в одну, где результат одной функции передается как аргумент в другую функцию. Композиция выполняется справа налево.

## Базовая реализация
```javascript
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
```

## Примеры использования

### Простой пример
```javascript
const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const addOneAndMultiply = compose(multiplyByTwo, addOne);

console.log(addOneAndMultiply(5)); // (5 + 1) * 2 = 12
```

### Средний пример
```javascript
const uppercase = str => str.toUpperCase();
const exclaim = str => `${str}!`;
const bold = str => `**${str}**`;

const shout = compose(bold, exclaim, uppercase);
console.log(shout('hello')); // **HELLO!**
```

### Ложный пример (антипаттерн)
```javascript
// Не делайте так - нарушение принципа единой ответственности
const doEverything = compose(
    x => x.toLowerCase(),
    x => x.split('').reverse().join(''),
    x => `${x}!!!`,
    x => x * 2
);
```

## Полезные ссылки на статьи
- https://habr.com/ru/companies/otus/articles/520692/ - Compose повсюду: композиция функций в JavaScript

