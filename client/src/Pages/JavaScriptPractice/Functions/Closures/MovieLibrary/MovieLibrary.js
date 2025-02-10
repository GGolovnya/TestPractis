// =============== Суть программы ===============

// - поместить данные с БД в переменные
// - создать функцию которая будет отражать все полки (БД + новые)
// - создать метод добавления в эту переменную новых фильмов
// - новые фильмы должны по жанру создавать новую полку если в начале этой полки жанра нет

// =============== Заготовка шаблонных данных ===============

// Создаем заготовку картотеки, как будто у нас это хранится в БД и мы запрашиваем эти данные через API и помещаем в закрытую переменную и работаем с ней

const API_FILMS_MVIDEO = [
    { title: 'Чужой', genre: 'Ужасы'},
    { title: "Фрэди Крюгер 1", genre: "Ужасы" },
    { title: "Маска", genre: "Комедия" },
    { title: "Любовь до гроба", genre: "Мелодрама" },
];

const API_FILMS_MOVILOVE = [
    { title: "Письма к Джульетте", genre: "Мелодрама" },
    { title: "Один день", genre: "Мелодрама" },
    { title: "Прежде чем я усну", genre: "Триллер" },
    { title: "P.S. Я люблю тебя", genre: "Мелодрама" },
    { title: "Век Адалин", genre: "Фэнтези" }
];

const API_FILMS_DNS = [
    { title: "Как приручить дракона", genre: "Мультфильм" },
    { title: "Тайная жизнь домашних животных", genre: "Мультфильм" },
    { title: "Круэлла", genre: "Семейный" },
    { title: "Книга джунглей", genre: "Приключения" },
    { title: "Чарли и шоколадная фабрика", genre: "Фэнтези" }
];

const API_FILMS_ELDORADO = [
    { title: "Криминальное чтиво", genre: "Криминал" },
    { title: "Матрица", genre: "Фантастика" },
    { title: "Зеленая миля", genre: "Драма" },
    { title: "Побег из Шоушенка", genre: "Драма" },
    { title: "Форрест Гамп", genre: "Драма" }
];

// =============== Замыкание по созданию каталога фильмов ===============

// Создаем замыкающую функцию для работы с картотекой
function filmLibrary (api_films){
    // Инициализируем картотеку начальными данными из "API"
    let filmLibraryList = [...api_films];

    // Группируем фильмы по жанрам и создаем полки с названиями жанров
    const groupByGenre = () => {
        const genres = {};
        filmLibraryList.forEach(film => {
            if (!genres[film.genre]) {
                genres[film.genre] = [];
            }
            genres[film.genre].push(film)
        })
        return genres;
    }

    return {
        // Метод для добавления нового фильма
        addFilm(title, genre ) {
            const newFilm = {title, genre}
            filmLibraryList.push(newFilm);
        },
        // Метод для получения фильмов по жанрам
        getFilmsByGenre() {
            return groupByGenre();
        },
    }
}

// =============== Магазин: МВидео ===============

//Для примера создадим магазин МВидео в котором будет наш базовый каталог + добавим новые фильмы
const mVideoMarket = filmLibrary(API_FILMS_MVIDEO);

// Вывод каталога до добавления новых фильмов
console.log('СТАРЫЙ КАТАЛОГ:')
console.log(mVideoMarket.getFilmsByGenre()) // Текущий список

//Добавляем фильмы и специально в рандомном порядке (чтобы функция сортировки использовалась, а то будет скучать)
mVideoMarket.addFilm('Вареник в масле','Сказка');
mVideoMarket.addFilm('Борщь беседует с ложкой','Сказка');
mVideoMarket.addFilm('Олень и тапки','Фантастика');
mVideoMarket.addFilm('Ночной фонарь','Детектив');
mVideoMarket.addFilm('Дневной фонарь','Детектив');
mVideoMarket.addFilm('Поломанный фонарь','Детектив');
mVideoMarket.addFilm('Колесница муровьев','Документальный');
mVideoMarket.addFilm('Обиженный фонарь','Детектив');

// Выводим сгрупированный результат нашего каталога в магазине с добавленнными новыми фильмами
console.log('НОВЫЙ КАТАЛОГ:')
console.log(mVideoMarket.getFilmsByGenre())


// =============== Магазин: Movi Love ===============
// Способ добавления фильмов через массив []

const moviLoveMarket = filmLibrary(API_FILMS_MOVILOVE)
console.log('Movi Love \n СТАРЫЙ КАТАЛОГ:')
console.log(moviLoveMarket.getFilmsByGenre()) // Метод тот же, но данные другие

// Вбиваем нужные фильмы в массив (подобный код лучше вынести в одно место по всем магазинам)
const newFilmsMoviLoveMarket = [
    ['Котлета ищет друга', 'Комедия'],
    ['Тапочки-путешественники', 'Приключения'],
    ['Суп с характером', 'Драма'],
    ['Говорящий холодильник', 'Фантастика'],
    ['Танцующий шкаф', 'Мюзикл'],
    ['Пельмени на каникулах', 'Комедия'],
    ['Чайник-детектив', 'Детектив'],
    ['Подушка-экстрасенс', 'Мистика']
];

// Распарсиваем каждый элемент и добавляем в основной кататлог магазина Movi Love
newFilmsMoviLoveMarket.forEach(([title, genre]) => moviLoveMarket.addFilm(title, genre));

// Выводим сгрупированный результат нашего каталога в магазине с добавленнными новыми фильмами
console.log('Movi Love \n НОВЫЙ КАТАЛОГ:')
console.log(moviLoveMarket.getFilmsByGenre())

// =============== Магазин: DNS ===============

const dnsMarket = filmLibrary(API_FILMS_DNS)
const newFilmsDnsMarket = [
    ['Робот-пылесос влюбляется', 'Романтическая комедия'],
    ['Умный дом сходит с ума', 'Триллер'],
    ['Планшет-путешественник', 'Приключения'],
    ['Битва смартфонов', 'Боевик'],
    ['Призрак в ноутбуке', 'Ужасы'],
    ['Принтер и его чернила', 'Драма'],
    ['Геймер и его консоль', 'Фэнтези'],
    ['Виртуальная реальность 2.0', 'Фантастика']
];
newFilmsDnsMarket.forEach(([title, genre]) => dnsMarket.addFilm(title, genre));

// =============== Магазин: Эльдорадо ===============

const eldoradoMarket = filmLibrary(API_FILMS_ELDORADO)
const newFilmsEldoradoMarket = [
    ['Холодильник-телепорт', 'Фантастика'],
    ['Стиральная машина времени', 'Приключения'],
    ['Микроволновка-экстрасенс', 'Мистика'],
    ['Кофеварка мечты', 'Драма'],
    ['Телевизор-портал', 'Фэнтези'],
    ['Утюг-детектив', 'Детектив'],
    ['Посудомойка с характером', 'Комедия'],
    ['Электрочайник будущего', 'Научная фантастика']
];
newFilmsEldoradoMarket.forEach(([title, genre]) => eldoradoMarket.addFilm(title,genre));


// =============== ВЫВОД ВСЕХ КАТАЛОГОВ ===============
// Теперь повыводим все каталоги и убедимся в том, что у каждого каталога сожнанено лексическое окружение несмотря на порядок вывода

console.log('ВЫВОД ВСЕХ ФИЛЬМОВ ВСЕХ МАГАЗИНОВ:')
console.log(eldoradoMarket.getFilmsByGenre()) // 4
console.log(moviLoveMarket.getFilmsByGenre()) // 2
console.log(mVideoMarket.getFilmsByGenre()) // 1
console.log(dnsMarket.getFilmsByGenre()) // 3

// ИТОГ: используем 1 функцию (filmLibrary), которая собирает каталог фильмов для всех магазинов, создает независимые друг от друга экземпляры со своим внутренним состоянием. Своего рода автоматизация алгоритма обработки каталогов, чтобы не дублировать один и тот же код мгного раз.

// =============== Декоратор для вывода фильмов ===============
// Список фильмов выводится в не удобном для восприятии формате, можно изменить вывод в самой функции замыкания, но что если нам нельзя менять эту функцию? Для этого мы можем улучшить наш код используя декоратор. Это позволит нам не переписывать замыкание.

function formatFilmLibrary (originalLibrary) {
    // Создаем ссылку на оригинальную библиотеку которая уже использует замыкание filmLibrary
    const original = originalLibrary

    return {
        // Копируем все методы оригинальной библиотеки
        ...original,
        
        // Добавляем новый метод для форматированного вывода
        getFormattedFilmsByGenre() {
            // Получаем структуру жанров из оригинальной библиотеки
            const genres = original.getFilmsByGenre();
            // Создаем массив для хранения отформатированных строк
            let output = [];

            // Перебираем все жанры и их фильмы
            Object.entries(genres).forEach(([genre, films], genreIndex) => {
                // Добавляем заголовок жанра с порядковым номером
                output.push(`\nЖанр ${genreIndex + 1}: ${genre}`);
                films.forEach((film, filmIndex) => {
                    // Добавляем название фильма с порядковым номером
                    output.push(`Фильм ${filmIndex + 1}: ${film.title}`)
                });
            });

            // Возвращаем форматированную строку со статистикой и списком
            return `Список фильмов (всего жанров: ${Object.keys(genres).length}):\n${output.join('\n')}`;
        }
    }
}

// Применяем декоратор к существующим каталогам
const formattedMVideo = formatFilmLibrary(mVideoMarket);
const formattedMoviLove = formatFilmLibrary(moviLoveMarket);
const formattedDns = formatFilmLibrary(dnsMarket);
const formattedEldorado = formatFilmLibrary(eldoradoMarket);

// Выводим отформатированные каталоги используя добавленный метод getFormattedFilmsByGenre
console.log('ФОРМАТИРОВАННЫЙ ВЫВОД КАТАЛОГОВ:');
console.log('\nМВидео:');
console.log(formattedMVideo.getFormattedFilmsByGenre());
console.log('\nMovi Love:');
console.log(formattedMoviLove.getFormattedFilmsByGenre());
console.log('\nDNS:');
console.log(formattedDns.getFormattedFilmsByGenre());
console.log('\nЭльдорадо:');
console.log(formattedEldorado.getFormattedFilmsByGenre());