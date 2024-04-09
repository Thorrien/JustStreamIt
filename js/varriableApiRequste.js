const maxPagesByGenre = {
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

const minNoteByGenre = {
    "Action": 8.9,
    "Adventure": 8.9,
    "Animation": 8.6,
    "Biography": 8.7,
    "Comedy": 9.1,
    "Crime": 9,
    "Drama": 9.3,
    "Family": 8.9,
    "Fantasy": 8.6,
    "Film-Noir": 8.1,
    "History": 8.9,
    "Horror": 8.5,
    "Music": 8.8,
    "Musical": 8.8,
    "Mystery": 8.9,
    "Romance": 8.8,
    "Sci-Fi": 8.5,
    "Sport": 8.3,
    "Thriller": 8.9,
    "War": 8.7,
    "Western": 8.2
};



async function getRandomPage(genre) {
    return Math.floor(Math.random() * maxPagesByGenre[genre]) + 1;
}

async function fetchFilmsByGenre(genre) {
    try {
        const maxPages = maxPagesByGenre[genre];
        
        let films = [];
        
        if (maxPages === 1) {
            const response = await fetch(`http://localhost:8000/api/v1/titles/?genre=${genre}&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data2 = await response.json();
            const randomMovies = data2.results.sort(() => Math.random() - 0.5).slice(0, 3); // Prendre 3 films aléatoires
            films = films.concat(randomMovies);
        }

        if (maxPages !== 1) {

            const minNote = minNoteByGenre[genre];
            let nextPage = `http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=${minNote}&imdb_score_max=&title=&title_contains=&genre=${genre}&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=`;
            let allData = []
        
            while (nextPage) {
                const response = await fetch(nextPage);
                const data = await response.json();
                allData = allData.concat(data.results);
                nextPage = data.next;
            }
            
            allData.sort((a, b) => b.imdb_score - a.imdb_score);
            const bestMovies = allData.slice(0, 6);
            console.log(bestMovies)
            films = films.concat(bestMovies);
        }


        const filmsContainer4 = document.getElementById('filmsContainer4');
        filmsContainer4.innerHTML = '';
        const newRow = document.createElement('div');
        newRow.classList.add('row', 'justify-content-center', 'justify-content-center');
        filmsContainer4.appendChild(newRow);

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
                        img.src = 'https://picsum.photos/200/300?random=1';
                    } else {
                        img.src = film.image_url;
                    }
                })
                .catch(() => {
                    img.src = 'https://picsum.photos/200/300?random=1';
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

           
            const lastRow = filmsContainer4.lastChild;
            lastRow.appendChild(filmDiv);
        });

        return films;
    } catch (error) {
        console.error('Error fetching horror films:', error);
        throw error;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const menuDeroulant = document.getElementById('menuDeroulant');

    menuDeroulant.addEventListener('change', async () => {
        const selectedGenre = menuDeroulant.value;

        try {
            const films = await fetchFilmsByGenre(selectedGenre);

            const genreButtons = document.querySelectorAll('[data-film-url]');
            genreButtons.forEach(button => {
                button.addEventListener('click', function() {
                    updateModalContentFromButton(button);
                });
            });
        } catch (error) {
            console.error('Une erreur est survenue lors du chargement des films :', error);
        }
    });
});