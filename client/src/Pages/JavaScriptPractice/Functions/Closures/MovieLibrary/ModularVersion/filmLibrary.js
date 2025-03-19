// Основная функция создания библиотеки фильмов
export function filmLibrary(api_films) {
    let filmLibraryList = [...api_films];

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
        addFilm(title, genre) {
            const newFilm = { title, genre }
            filmLibraryList.push(newFilm);
        },
        getFilmsByGenre() {
            return groupByGenre();
        }
    }
}