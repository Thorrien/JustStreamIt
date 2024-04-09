const maxPagesByGenre2 = {
    "Action": 2590,
    "Adult": 1,
    "Adventure": 1518,
    "Animation": 429,
    "Biography": 476,
    "Comedy": 5873,
    "Crime": 2214,
    "Documentary": 1,
    "Drama": 9422,
    "Family": 793,
    "Fantasy": 763,
    "Film-Noir": 133,
    "History": 460,
    "Horror": 1912,
    "Music": 338,
    "Musical": 409,
    "Mystery": 1045,
    "News": 1,
    "Reality-TV": 1,
    "Romance": 2826,
    "Sci-Fi": 722,
    "Sport": 213,
    "Thriller": 2278,
    "War": 449,
    "Western": 317
};


async function getRandomPage2(genre) {
    // Générer un nombre aléatoire entre 1 et 1000 pour la page
    return Math.floor(Math.random() * maxPagesByGenre2[genre]) + 1;
}

async function fetchFilmsByGenre2(genre) {
    try {
        // Obtenir le nombre maximum de pages pour le genre donné
        const maxPages = maxPagesByGenre2[genre];
        
        let films = [];
        // Si le nombre maximum de pages est égal à 1, récupérer simplement les films de la première page
        if (maxPages === 1) {
            const response = await fetch(`http://localhost:8000/api/v1/titles/?genre=${genre}&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data2 = await response.json();
            const randomMovies = data2.results.sort(() => Math.random() - 0.5).slice(0, 3); // Prendre 3 films aléatoires
            films = films.concat(randomMovies);
        }

        // Sinon, prendre 2 pages aléatoires en fonction du genre
        const pageNumbers = [];
        for (let i = 0; i < 2; i++) {
            const pageNumber = await getRandomPage2(genre);
            pageNumbers.push(pageNumber);
        }

        // Récupérer les films de chaque page et les concaténer
        if (maxPages !== 1) {
        for (const pageNumber of pageNumbers) {
            const response2 = await fetch(`http://localhost:8000/api/v1/titles/?genre=${genre}&page=${pageNumber}`);
            if (!response2.ok) {
                throw new Error('Network response was not ok');
            }
            const data2 = await response2.json();
            const randomMovies = data2.results.sort(() => Math.random() - 0.5).slice(0, 3); // Prendre 3 films aléatoires
            films = films.concat(randomMovies);
        }
        }

        // Récupérer une référence à l'élément où vous voulez ajouter les films
        const filmsContainer5 = document.getElementById('filmsContainer5');

        // Vider le conteneur des films précédents s'il y en a
        filmsContainer5.innerHTML = '';

        const newRow = document.createElement('div');
        newRow.classList.add('row');
        filmsContainer5.appendChild(newRow);

        // Boucler à travers les films et générer le contenu HTML pour chaque film
        films.forEach((film, index) => {
   
            const filmDiv = document.createElement('div');
            filmDiv.classList.add('col-10', 'col-lg-4', 'col-sm-6');

            const miniImgDiv = document.createElement('div');
            miniImgDiv.classList.add('mini-img');

            const img = document.createElement('img');
            img.alt = film.title;

            fetch(film.image_url)
                .then(response => {
                    if (!response.ok) {
                        img.src = 'https://picsum.photos/id/237/200/300';
                    } else {
                        img.src = film.image_url;
                    }
                })
                .catch(() => {
                    img.src = 'https://picsum.photos/id/237/200/300';
                });

            const overlayDiv = document.createElement('div');
            overlayDiv.classList.add('overlay');

            const h3 = document.createElement('h3');
            h3.textContent = film.title;

            const button = document.createElement('button');
            button.textContent = 'Détails';
            button.classList.add('btn', 'btn-primary');
            button.dataset.bsToggle = 'modal';
            button.dataset.bsTarget = '#modalfade';
            button.dataset.filmUrl = film.url; 

           
            overlayDiv.appendChild(h3);
            const divElement = document.createElement('div');
            divElement.classList.add('d-flex', 'justify-content-end');
            overlayDiv.appendChild(divElement);
            overlayDiv.appendChild(button);
            miniImgDiv.appendChild(img);
            miniImgDiv.appendChild(overlayDiv);
            filmDiv.appendChild(miniImgDiv);

           
            const lastRow = filmsContainer5.lastChild;
            lastRow.appendChild(filmDiv);
        });

        return films;
    } catch (error) {
        console.error('Error fetching horror films:', error);
        throw error;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const menuDeroulant2 = document.getElementById('menuDeroulant2');

    // Ajouter un écouteur d'événements pour détecter les changements de sélection
    menuDeroulant2.addEventListener('change', async () => {
        const selectedGenre = menuDeroulant2.value;

        try {
            const films = await fetchFilmsByGenre2(selectedGenre);
            // Faites quelque chose avec les films ici, par exemple les afficher sur la page

            // Récupérer tous les boutons générés par fetchFilmsByGenre
            const genreButtons = document.querySelectorAll('[data-film-url]');
            genreButtons.forEach(button => {
                // Ajouter un écouteur d'événement à chaque bouton pour mettre à jour le contenu du modal
                button.addEventListener('click', function() {
                    updateModalContentFromButton(button);
                });
            });
        } catch (error) {
            console.error('Une erreur est survenue lors du chargement des films :', error);
        }
    });

    // Mettre à jour le menu déroulant au chargement de la page
    updateMenuDeroulant();
});