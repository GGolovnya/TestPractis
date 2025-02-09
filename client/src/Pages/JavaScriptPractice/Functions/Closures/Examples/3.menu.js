// Пример создания меню с приватным состоянием
function createMenu(items) {
    let selectedItem = null;
    let isOpen = false;
    
    return {
        open() {
            isOpen = true;
            console.log('Меню открыто');
        },
        close() {
            isOpen = false;
            console.log('Меню закрыто');
        },
        select(item) {
            if (!items.includes(item)) {
                console.log('Такого пункта нет в меню');
                return;
            }
            selectedItem = item;
            console.log(`Выбран пункт: ${item}`);
        },
        getState() {
            return {
                isOpen,
                selectedItem,
                items
            };
        }
    };
}

const menu = createMenu(['Главная', 'О нас', 'Контакты']);
menu.open();
menu.select('О нас');