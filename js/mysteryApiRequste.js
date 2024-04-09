async function getRandomPageA() {
    // Générer un nombre aléatoire entre 1 et 1000 pour la page
    return Math.floor(Math.random() * 1045) + 1;
}

async function fetchRandomMysteryFilms() {
    try {
        // Prendre 2 pages aléatoires
        const pageNumbers = [];
        for (let i = 0; i < 2; i++) {
            const pageNumber = await getRandomPageA();
            pageNumbers.push(pageNumber);
        }

        // Récupérer les films de chaque page et les concaténer
        let films = [];
        for (const pageNumber of pageNumbers) {
            const response = await fetch(`http://localhost:8000/api/v1/titles/?genre=Mystery&page=${pageNumber}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const randomMovies = data.results.sort(() => Math.random() - 0.5).slice(0, 3); // Prendre 3 films aléatoires
            films = films.concat(randomMovies);
        }

        // Récupérer une référence à l'élément où vous voulez ajouter les films
        const filmsContainer = document.getElementById('filmsContainer');

        // Vider le conteneur des films précédents s'il y en a
        filmsContainer.innerHTML = '';
        const h2 = document.createElement('h2');
        h2.textContent = "Mystery";
        filmsContainer.append(h2)

        const newRow = document.createElement('div');
        newRow.classList.add('row');
        filmsContainer.appendChild(newRow);

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

           
            const lastRow = filmsContainer.lastChild;
            lastRow.appendChild(filmDiv);
        });

        return films;
    } catch (error) {
        console.error('Error fetching mystery films:', error);
        throw error;
    }
}

fetchRandomMysteryFilms()