// ============ Вывод начального объекта ============
// Создаем функцию для рисования коробки с фруктами
// Не является callback функцией - обычная функция, возвращающая объект
function createFruitBox(height = "100px", width = "200px") {
    return {
        height,
        width,
        containsFruit: true
    };
}
// Вывод: {"height":"100px","width":"200px","containsFruit":true}
console.log('Начальный объект:', JSON.stringify(createFruitBox()));

// ============ Логирование начала обработки фруктов ============
// Функция высшего порядка (не callback), принимающая callback в качестве аргумента
function simpleCallback(fruits, callback) {
    console.log(`Начинаем обработку фруктов: ${fruits}`);
    // Вызываем переданную функцию с нашими фруктами
    callback(fruits);
}

// ============ Вывод информации о созданных коробках ============
// Примеры использования:
// 1. Создание коробки стандартного размера для яблок
simpleCallback("яблоки", (fruits) => {
    const box = createFruitBox();
    console.log(`Создана коробка для ${fruits}:`, box);
});
// Вывод: Начинаем обработку фруктов: яблоки
// Вывод: Создана коробка для яблок: { height: "100px", width: "200px", containsFruit: true }

// 2. Создание большой коробки для арбузов
simpleCallback("арбузы", (fruits) => {
    const box = createFruitBox("300px", "400px");
    console.log(`Создана большая коробка для ${fruits}:`, box);
});
// Вывод: Начинаем обработку фруктов: арбузы
// Вывод: Создана большая коробка для арбузов: { height: "300px", width: "400px", containsFruit: true }

// ============ Отслеживание процесса обработки заказа ============
// Функция высшего порядка, принимающая два callback'а для обработки результата
function processFruitOrder(order, successCallback, errorCallback) {
    console.log('Обработка заказа:', order);
    try {
        if (order.fruits.length === 0) {
            throw new Error("Корзина пуста");
        }
        const box = createFruitBox(order.size.height, order.size.width);
        console.log('Коробка создана:', box);
        successCallback({ ...order, box });
    } catch (error) {
        errorCallback(error);
    }
}

// ============ Логирование результатов и ошибок ============
// Пример использования с успешным заказом
const order = {
    fruits: ["яблоки", "груши"],
    size: { height: "150px", width: "250px" }
};

processFruitOrder(
    order,
    (result) => console.log("Заказ упакован:", result),
    (error) => console.error("Ошибка при упаковке:", error)
);
// Вывод: Обработка заказа: { fruits: ["яблоки", "груши"], size: { height: "150px", width: "250px" } }
// Вывод: Коробка создана: { height: "150px", width: "250px", containsFruit: true }
// Вывод: Заказ упакован: {
//   fruits: ["яблоки", "груши"],
//   size: { height: "150px", width: "250px" },
//   box: { height: "150px", width: "250px", containsFruit: true }
// }

// Пример с пустой корзиной для демонстрации обработки ошибок
const emptyOrder = {
    fruits: [],
    size: { height: "150px", width: "250px" }
};

processFruitOrder(
    emptyOrder,
    (result) => console.log("Заказ упакован:", result),
    (error) => console.error("Ошибка при упаковке:", error)
);
// Вывод: Обработка заказа: { fruits: [], size: { height: "150px", width: "250px" } }
// Вывод: Ошибка при упаковке: Error: Корзина пуста