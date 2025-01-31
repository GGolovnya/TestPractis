// Пример глобальной области видимости
let globalVariable = 'Я глобальная переменная';

function globalFunction() {
    console.log(globalVariable);
}

// Демонстрация доступа к глобальной переменной
function anotherFunction() {
    console.log(globalVariable); // Доступна здесь
}

// Пример проблем с глобальными переменными
function modifyGlobal() {
    globalVariable = 'Изменено'; // Может привести к неожиданным побочным эффектам
}

// Лучшая практика - избегать глобальных переменных
const betterApproach = {
    data: 'Инкапсулированные данные',
    getData() {
        return this.data;
    }
};