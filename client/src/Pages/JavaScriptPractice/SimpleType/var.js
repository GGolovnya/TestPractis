// Инициализация var до объявления
console.log(`Пробуем инициализировать var changeType = 0 и получаем значение: ${changeType}`); // выведет undefined

// Объявление var changeType
var changeType = 0;

// Можно переназначить тип var
var changeType = 'Теперь строка';
console.log(`Меняем тип данных внутри var changeType и получаем: ${changeType}`); // выведет "Теперь строка"

function fnChangeType() {
    var changeType = 'Теперь у changeType которая в function fnChangeType строка № 2'; // теперь changeType относится только к fnChangeType
    console.log(changeType); // выведет "Теперь строка 2"
    
    if (true) {
        changeType = true; // теперь тип данных с текста меняем на Boolean тип
    }
    console.log(`Сменили тип changeType с строки на Boolean : ${changeType}`); // выведет true
    console.log(`Тип changeType щас является: ${typeof(changeType)}`); // Тип данных выведет boolean
}

fnChangeType();
console.log(changeType); // выведет "Теперь строка" (глобальная переменная)