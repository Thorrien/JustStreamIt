async function updateBestFilm() {
    const baseUrl = 'http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=9.4&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=';

    let allData = [];
    let nextPage = baseUrl;
    let plusHautScore = -Infinity;
    let urlFilm = null;

    while (nextPage) {
        const response = await fetch(nextPage);
        const data = await response.json();
        allData = allData.concat(data.results);
        nextPage = data.next;
    }

    allData.forEach(function(film) {
        const score = parseFloat(film.imdb_score);
        if (score > plusHautScore) {
            plusHautScore = score;
            urlFilm = film.url;
        }
    });

    if (urlFilm) {
        const response = await fetch(urlFilm);
        const topFilm = await response.json();

        const bestFilmContainer = document.getElementById('bestFilmContainer');
        const bestFilmImage = document.getElementById('bestFilmImage');
        const bestFilmTitle = document.getElementById('bestFilmTitle');
        const bestFilmDescription = document.getElementById('bestFilmDescription');

        bestFilmImage.src = topFilm.image_url;
        bestFilmImage.alt = topFilm.title;
        bestFilmTitle.textContent = topFilm.title;
        bestFilmDescription.textContent = topFilm.long_description;

        // Mettre à jour l'attribut data-film-url du bouton "Détails" avec l'URL du film
        const detailsButton = document.getElementById('detailsButton');
        detailsButton.dataset.filmUrl = urlFilm;
    }
}

// Appel de la fonction pour mettre à jour les informations du meilleur film lorsque le DOM est chargé
document.addEventListener("DOMContentLoaded", function() {
    updateBestFilm();
});