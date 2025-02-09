//Глобальная функция в которой есть замыкание
function makeAdder(x) {

    let dop = '| let dop = Секретные данные не доступные из вне' //Остается постоянно

    return function (y) {
    return x + y + dop;
    };
}

let ExempleText1 = makeAdder(`Результат в X `); //В момент объявления самой функции можем передать аргуемент в X
console.log(ExempleText1(`| Результат в Y `)); //А когда объявляем переменную, то уже передаем аргумент в Y

//Создаем новое лексическоеокружение
let ExempleText2 = makeAdder(`Вадим петрович X `); //Остается постоянной
console.log(ExempleText2(`|  Загнул ласты Y `));
console.log(ExempleText2(`|  Восстал Y `)); //Первый X заменили "Загнул ласты X" теперь нне доступно и будет удален сборзиком мусора

console.log(ExempleText1(`| Второй раз вызываю ExempleText1`));
console.log(ExempleText2(`| Второй раз вызываю ExempleText2`));

// -------------- Математические примеры --------------

function Add (x) {

    let description = `Результат решения: `

    return function (y) {
        return description + (x + y);
    }
}

const mathTable1 = Add (20)
console.log(mathTable1(2))
console.log(mathTable1(4))

const mathTable2 = Add (30)
console.log(mathTable1(7)) //отрабатвает с mathTable1
console.log(mathTable2(2))

const mathTable3 = Add (40)
console.log(mathTable3(2))
console.log(mathTable1(9)) //отрабатвает с mathTable1

const mathTable4 = Add (50)
console.log(mathTable4(2))

