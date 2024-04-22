async function fetchFilmsByGenre(genre, div, thumbnail) {
    try {
        let films = [];
        const response = await fetch(`http://localhost:8000/api/v1/titles/?genre=${genre}&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dataCount = data.count;

        if (dataCount < 6 ) {
            const response = await fetch(`http://localhost:8000/api/v1/titles/?genre=${genre}&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data2 = await response.json();
            const randomMovies = data2.results.sort(() => Math.random() - 0.5).slice(0, 3); 
            films = films.concat(randomMovies);
        }

        if (dataCount > 5) {
            let nextPage = `http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=${genre}&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=`;
            let allData = []
            let pageCount = 0

            while (pageCount < 2) {
                const response = await fetch(nextPage);
                const data = await response.json();
                allData = allData.concat(data.results);
                nextPage = data.next;
                pageCount++
            }

            const bestMovies = allData.slice(0, 6);
            films = films.concat(bestMovies);
        }

        const filmsContainer4 = document.getElementById(div);
        filmsContainer4.innerHTML = '';
        const newRow = document.createElement('div');
        newRow.classList.add('row', 'justify-content-center', 'justify-content-center');
        filmsContainer4.appendChild(newRow);

        films.forEach((film, index) => {
   
            const filmDiv = document.createElement('div');
            if (index < 2) {
                filmDiv.classList.add('col-10', 'col-lg-4', 'col-sm-6');
            } else if (index < 4) {
                filmDiv.classList.add('col-10', 'col-lg-4', 'col-sm-6', thumbnail, 'd-none', 'd-md-block');
            } else {
                filmDiv.classList.add('col-10', 'col-lg-4', 'col-sm-6', thumbnail, 'd-none', 'd-lg-block');
            }         

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


fetchFilmsByGenre('Horror', 'filmsContainer2', 'film-thumbnail3')
fetchFilmsByGenre('Adventure', 'filmsContainer3', 'film-thumbnail2')
fetchFilmsByGenre('', 'filmsContainer', 'film-thumbnail')

document.addEventListener('DOMContentLoaded', () => {
    const menuDeroulant = document.getElementById('menuDeroulant');

    menuDeroulant.addEventListener('change', async () => {
        const selectedGenre = menuDeroulant.value;

        try {
            const films = await fetchFilmsByGenre(selectedGenre, 'filmsContainer4');

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

document.addEventListener('DOMContentLoaded', () => {
    const menuDeroulant2 = document.getElementById('menuDeroulant2');

    menuDeroulant2.addEventListener('change', async () => {
        const selectedGenre = menuDeroulant2.value;

        try {
            const films = await fetchFilmsByGenre(selectedGenre, 'filmsContainer5');
            
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