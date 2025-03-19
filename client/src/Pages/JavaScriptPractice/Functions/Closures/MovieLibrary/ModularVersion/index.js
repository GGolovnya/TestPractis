import { 
    API_FILMS_MVIDEO, 
    API_FILMS_MOVILOVE,
    API_FILMS_DNS,
    API_FILMS_ELDORADO 
} from './config.js';
import { filmLibrary } from './filmLibrary.js';
import { formatFilmLibrary } from './formatDecorator.js';
import { 
    newFilmsMVideoMarket,
    newFilmsMoviLoveMarket,
    newFilmsDnsMarket,
    newFilmsEldoradoMarket 
} from './newFilms.js';

// Создание экземпляров магазинов
const mVideoMarket = filmLibrary(API_FILMS_MVIDEO);
const moviLoveMarket = filmLibrary(API_FILMS_MOVILOVE);
const dnsMarket = filmLibrary(API_FILMS_DNS);
const eldoradoMarket = filmLibrary(API_FILMS_ELDORADO);

// Вывод старого каталога МВидео
console.log('СТАРЫЙ КАТАЛОГ МВИДЕО:');
console.log(mVideoMarket.getFilmsByGenre());

// Добавление фильмов в магазины
newFilmsMVideoMarket.forEach(([title, genre]) => mVideoMarket.addFilm(title, genre));
newFilmsMoviLoveMarket.forEach(([title, genre]) => moviLoveMarket.addFilm(title, genre));
newFilmsDnsMarket.forEach(([title, genre]) => dnsMarket.addFilm(title, genre));
newFilmsEldoradoMarket.forEach(([title, genre]) => eldoradoMarket.addFilm(title, genre));

// Применение декоратора форматирования
const formattedMVideo = formatFilmLibrary(mVideoMarket);
const formattedMoviLove = formatFilmLibrary(moviLoveMarket);
const formattedDns = formatFilmLibrary(dnsMarket);
const formattedEldorado = formatFilmLibrary(eldoradoMarket);

// Вывод каталогов
console.log('ФОРМАТИРОВАННЫЙ ВЫВОД КАТАЛОГОВ:');
console.log('\nМВидео:');
console.log(formattedMVideo.getFormattedFilmsByGenre());
console.log('\nMovi Love:');
console.log(formattedMoviLove.getFormattedFilmsByGenre());
console.log('\nDNS:');
console.log(formattedDns.getFormattedFilmsByGenre());
console.log('\nЭльдорадо:');
console.log(formattedEldorado.getFormattedFilmsByGenre());