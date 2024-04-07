async function getRandomPage() {
    // Générer un nombre aléatoire entre 1 et 1000 pour la page
    return Math.floor(Math.random() * 1000) + 1;
}

async function getMoviesFromPage(page) {
    try {
        // Effectuer une requête HTTP GET à l'API pour obtenir les données de la page sélectionnée
        const response = await fetch(`/api/v1/titles/?genre=Mystery&page=${page}`);
        const data = await response.json();

        // Vérifier si des résultats sont retournés
        if (data.results && data.results.length > 0) {
            // Sélectionner aléatoirement 6 films de la page
            const randomMovies = [];
            while (randomMovies.length < 6) {
                const randomIndex = Math.floor(Math.random() * data.results.length);
                randomMovies.push(data.results[randomIndex]);
            }

            return randomMovies;
        } else {
            console.error('Aucun film trouvé sur la page sélectionnée.');
            return [];
        }

    } catch (error) {
        console.error('Erreur lors de la récupération des films depuis l\'API :', error);
        return [];
    }
}

async function fetchRandomMysteryFilms() {
    const pageNumber = await getRandomPage();
    console.log('Page sélectionnée :', pageNumber);
    const url = `http://localhost:8000/api/v1/titles/?genre=Mystery&page=${pageNumber}`;
    console.log('URL de la requête :', url);

    try {
        const response = await fetch(url);
        console.log('Réponse reçue :', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Données récupérées :', data);
        const films = data.results.slice(0, 6); // Prend les 6 premiers films
        console.log('Films chargés :', films);

        // Récupérer une référence à l'élément où vous voulez ajouter les films
        const filmsContainer = document.getElementById('filmsContainer');

        // Boucler à travers les films et générer le contenu HTML pour chaque film
        films.forEach(film => {
            const filmDiv = document.createElement('div');
            filmDiv.classList.add('col-md-12');

            const miniImgDiv = document.createElement('div');
            miniImgDiv.classList.add('mini-img');

            const img = document.createElement('img');
            img.src = film.image_url;
            img.alt = film.title;

            const overlayDiv = document.createElement('div');
            overlayDiv.classList.add('overlay');

            const h3 = document.createElement('h3');
            h3.textContent = film.title;

            const button = document.createElement('button');
            button.textContent = 'Détails';
            button.classList.add('btn', 'btn-primary');
            button.dataset.toggle = 'modal';
            button.dataset.target = '#modalfade';
            button.dataset.filmUrl = film.url; // Ajoute l'URL du film comme attribut data-film-url

            // Structurer les éléments HTML
            overlayDiv.appendChild(h3);
            const divElement = document.createElement('div');
            divElement.classList.add('d-flex', 'justify-content-end');
            overlayDiv.appendChild(divElement);
            overlayDiv.appendChild(button);
            miniImgDiv.appendChild(img);
            miniImgDiv.appendChild(overlayDiv);
            filmDiv.appendChild(miniImgDiv);

            // Ajouter le film au conteneur
            filmsContainer.appendChild(filmDiv);
        });

        return films;
    } catch (error) {
        console.error('Error fetching mystery films:', error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const films = await fetchRandomMysteryFilms();
        console.log('Films chargés :', films);
    } catch (error) {
        console.error('Une erreur est survenue lors du chargement des films :', error);
    }
});