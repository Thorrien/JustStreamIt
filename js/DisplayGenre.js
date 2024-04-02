async function displayGenres() {
    const genres = await getAllPages('http://localhost:8000/api/v1/genres/');
    const genreList = document.getElementById('genreList');

    genres.forEach(genre => {
        const listItem = document.createElement('li');
        listItem.textContent = genre.name;
        genreList.appendChild(listItem);
    });
}
