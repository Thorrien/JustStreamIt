
async function fetchRandomMysteryFilms() {
    try {
        const baseUrl = 'http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=9.4&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=';

        let allData = [];
        let nextPage = baseUrl;
        let films = []
    
        while (nextPage) {
            const response = await fetch(nextPage);
            const data = await response.json();
            allData = allData.concat(data.results);
            nextPage = data.next;
        }

        allData.sort((a, b) => b.imdb_score - a.imdb_score);
        const bestMovies = allData.slice(0, 6);
        films = films.concat(bestMovies);


        const filmsContainer = document.getElementById('filmsContainer');
        filmsContainer.innerHTML = '';
        const h2 = document.createElement('h2');
        h2.textContent = "Films les mieux notés";
        filmsContainer.append(h2)

        const newRow = document.createElement('div');
        newRow.classList.add('row', 'justify-content-center', 'justify-content-center');
        filmsContainer.appendChild(newRow);

        films.forEach((film, index) => {

            const filmDiv = document.createElement('div');
            if (index < 2) {
                filmDiv.classList.add('col-10', 'col-lg-4', 'col-sm-6');
            } else if (index < 4) {
                filmDiv.classList.add('col-10', 'col-lg-4', 'col-sm-6', 'film-thumbnail', 'd-none', 'd-md-block');
            } else {
                filmDiv.classList.add('col-10', 'col-lg-4', 'col-sm-6', 'film-thumbnail', 'd-none', 'd-lg-block');
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

           
            const lastRow = filmsContainer.lastChild;
            lastRow.appendChild(filmDiv);
        });

        return films;
    } catch (error) {
        console.error('Error fetching mystery films:', error);
        throw error;
    }
}
