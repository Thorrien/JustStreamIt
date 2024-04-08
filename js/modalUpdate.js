async function updateModalContent(filmUrl) {
    try {
        // Faire une requête HTTP pour obtenir les informations du film
        const response = await fetch(filmUrl);
        const film = await response.json();

        // Mettre à jour le contenu du modal avec les informations du film
        const modalTitle = document.querySelector('.modal-title');
        modalTitle.textContent = film.title;

        // Mettre à jour les informations du film dans le modal
        const modalAnneeType = document.getElementById('modalAnneeType');
        const modalPGTime = document.getElementById('modalPGTime');
        const modalIMDB = document.getElementById('modalIMDB');
        const modalAuthors = document.getElementById('modalAuthors');
        const modalDescription = document.getElementById('modalDescription');
        const modalAvec = document.getElementById('modalAvec');
        const modalFilmTitle = document.getElementById('modalFilmTitle');
        const modalFilmImage = document.getElementById('modalFilmImage');

        modalFilmImage.src = film.image_url;
        modalFilmTitle.textContent = film.title;
        modalAnneeType.textContent = `${film.year} - ${film.genres.join(', ')}`;
        modalPGTime.textContent = `${film.rated} - ${film.duration} minutes (${film.countries})`;
        modalIMDB.textContent = `IMDB score : ${film.imdb_score}/10`;
        modalAuthors.textContent = film.directors.join(', ');
        modalDescription.textContent = film.long_description;
        modalAvec.textContent = film.actors.join(', ');

    } catch (error) {
        console.error('Erreur lors de la récupération des informations du film :', error);
    }
}

// Fonction pour mettre à jour le contenu du modal lorsqu'il est affiché
async function updateModalContentFromButton(button) {
    try {
        const filmUrl = button.getAttribute('data-film-url');
        await updateModalContent(filmUrl);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du contenu du modal :', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const films = await fetchRandomMysteryFilms();
        console.log('Films chargés :', films);

        // Récupérer tous les boutons générés par fetchRandomMysteryFilms
        const mysteryButtons = document.querySelectorAll('[data-film-url]');
        mysteryButtons.forEach(button => {
            // Ajouter un écouteur d'événement à chaque bouton pour mettre à jour le contenu du modal
            button.addEventListener('click', function() {
                updateModalContentFromButton(button);
            });
        });

        // Appel de la fonction fetchRandomHorrorFilms
        const horrorFilms = await fetchRandomHorrorFilms();
        console.log('Films d\'horreur chargés :', horrorFilms);

        // Récupérer tous les boutons générés par fetchRandomHorrorFilms
        const horrorButtons = document.querySelectorAll('[data-film-url]');
        horrorButtons.forEach(button => {
            // Ajouter un écouteur d'événement à chaque bouton pour mettre à jour le contenu du modal
            button.addEventListener('click', function() {
                updateModalContentFromButton(button);
            });
        });


        const adventureFilms = await fetchRandomAdventureFilms();

        // Récupérer tous les boutons générés par fetchRandomHorrorFilms
        const adventureButtons = document.querySelectorAll('[data-film-url]');
        adventureButtons.forEach(button => {
            // Ajouter un écouteur d'événement à chaque bouton pour mettre à jour le contenu du modal
            button.addEventListener('click', function() {
                updateModalContentFromButton(button);
            });
        });
        
        const variableFilms = await fetchFilmsByGenre(genre);
        // Récupérer tous les boutons générés par fetchRandomHorrorFilms
        const variableButtons = document.querySelectorAll('[data-film-url]');
        variableButtons.forEach(button => {
            // Ajouter un écouteur d'événement à chaque bouton pour mettre à jour le contenu du modal
            button.addEventListener('click', function() {
                updateModalContentFromButton(button);
            });
        });
        

        // Vérifier si l'élément avec l'ID 'bestFilmButton' existe
        const bestFilmButton = document.getElementById('bestFilmButton');
        if (bestFilmButton) {
            // Ajouter un écouteur d'événements si l'élément existe
            bestFilmButton.addEventListener('click', updateBestFilm);
        }
    } catch (error) {
        console.error('Une erreur est survenue lors du chargement des films :', error);
    }
});