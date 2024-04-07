async function getRandomPage() {
    // Générer un nombre aléatoire entre 1 et 1000 pour la page
    return Math.floor(Math.random() * 1000) + 1;
}

async function fetchRandomMysteryFilms() {
    try {
        // Prendre 2 pages aléatoires
        const pageNumbers = [];
        for (let i = 0; i < 2; i++) {
            const pageNumber = await getRandomPage();
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

        // Boucler à travers les films et générer le contenu HTML pour chaque film
        films.forEach((film, index) => {
            // Vérifier si c'est le début d'une nouvelle ligne
            if (index % 3 === 0) {
                // Créer une nouvelle rangée (div avec la classe row)
                const newRow = document.createElement('div');
                newRow.classList.add('row', 'row-cols-3');
                filmsContainer.appendChild(newRow); // Ajouter la nouvelle rangée au conteneur
            }

            // Créer une colonne (div avec la classe col-md-4)
            const filmDiv = document.createElement('div');
            filmDiv.classList.add('col-md-4');

            const miniImgDiv = document.createElement('div');
            miniImgDiv.classList.add('mini-img');

            const img = document.createElement('img');
            img.alt = film.title;

            // Vérifier si l'URL de l'image renvoie un code 404
            fetch(film.image_url)
                .then(response => {
                    if (!response.ok) {
                        // Si l'image n'est pas trouvée, utiliser une image par défaut
                        img.src = 'https://picsum.photos/id/237/200/300';
                    } else {
                        img.src = film.image_url;
                    }
                })
                .catch(() => {
                    // En cas d'erreur, utiliser une image par défaut
                    img.src = 'https://picsum.photos/id/237/200/300';
                });

            const overlayDiv = document.createElement('div');
            overlayDiv.classList.add('overlay');

            const h3 = document.createElement('h3');
            h3.textContent = film.title;

            const button = document.createElement('button');
            button.textContent = 'Détails';
            button.classList.add('btn', 'btn-primary');
            button.dataset.toggle = 'modal';
            button.dataset.target = '#modalfade';
            button.dataset.filmUrl = film.url; // Ajouter l'URL du film comme attribut data-film-url

            // Structurer les éléments HTML
            overlayDiv.appendChild(h3);
            const divElement = document.createElement('div');
            divElement.classList.add('d-flex', 'justify-content-end');
            overlayDiv.appendChild(divElement);
            overlayDiv.appendChild(button);
            miniImgDiv.appendChild(img);
            miniImgDiv.appendChild(overlayDiv);
            filmDiv.appendChild(miniImgDiv);

            // Ajouter la colonne à la dernière rangée
            const lastRow = filmsContainer.lastChild;
            lastRow.appendChild(filmDiv);
        });

        return films;
    } catch (error) {
        console.error('Error fetching mystery films:', error);
        throw error;
    }
}