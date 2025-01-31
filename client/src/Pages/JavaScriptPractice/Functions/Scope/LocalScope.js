// Пример локальной области видимости
function localScopeExample() {
    let localVar = 'Я локальная переменная';
    console.log(localVar); // Доступна здесь
    
    function innerFunction() {
        console.log(localVar); // Также доступна здесь
    }
    
    return innerFunction;
}

// Пример блочной области видимости
function blockScopeExample() {
    if (true) {
        let blockVar = 'Я существую только в этом блоке';
        const alsoBlockScoped = 'Я тоже!';
        var notBlockScoped = 'Я доступна во всей функции';
    }
    // console.log(blockVar); // Ошибка - переменная не определена
    // console.log(alsoBlockScoped); // Ошибка
    console.log(notBlockScoped); // Работает
}