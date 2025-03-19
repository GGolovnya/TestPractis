// Декоратор для форматированного вывода
export function formatFilmLibrary(originalLibrary) {
    const original = originalLibrary;

    return {
        ...original,
        getFormattedFilmsByGenre() {
            const genres = original.getFilmsByGenre();
            const output = [];

            Object.entries(genres).forEach(([genre, films], genreIndex) => {
                output.push(`\nЖанр ${genreIndex + 1}: ${genre}`);
                films.forEach((film, filmIndex) => {
                    output.push(`Фильм ${filmIndex + 1}: ${film.title}`);
                });
            });

            return `Список фильмов (всего жанров: ${Object.keys(genres).length}):\n${output.join('\n')}`;
        }
    }
}