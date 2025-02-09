// 1. Создаем различные переменные в разных областях видимости
let globalVar = "Глобальная";

function outerFunction() {
    let outerVar = "Внешняя";
    
    function innerFunction() {
        let innerVar = "Внутренняя";
        console.log(globalVar); // доступна
        console.log(outerVar);  // доступна
        console.log(innerVar);  // доступна
    }
    
    innerFunction();
    console.log(globalVar); // доступна
    console.log(outerVar);  // доступна
    // console.log(innerVar);  // НЕ доступна!
}

outerFunction();
console.log(globalVar); // доступна
// console.log(outerVar);  // НЕ доступна!
// console.log(innerVar);  // НЕ доступна!