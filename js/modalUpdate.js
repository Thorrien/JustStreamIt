async function updateModalContent(filmUrl) {
    try {

        const response = await fetch(filmUrl);
        const film = await response.json();

        const modalTitle = document.querySelector('.modal-title');
        modalTitle.textContent = film.title;

        const modalAnneeType = document.getElementById('modalAnneeType');
        const modalPGTime = document.getElementById('modalPGTime');
        const modalIMDB = document.getElementById('modalIMDB');
        const modalAuthors = document.getElementById('modalAuthors');
        const modalDescription = document.getElementById('modalDescription');
        const modalAvec = document.getElementById('modalAvec');
        const modalFilmTitle = document.getElementById('modalFilmTitle');
        const modalFilmImage = document.getElementById('modalFilmImage');


        fetch(film.image_url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de chargement de l\'image');
            }
            return response.blob();
        })
        .then(blob => {
            modalFilmImage.src = URL.createObjectURL(blob);
        })
        .catch(error => {
            console.error('Erreur lors du chargement de l\'image:', error);
            modalFilmImage.src = 'https://picsum.photos/200/300?random=1';
        });

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

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await updateBestFilm();

        const variableButtons = document.querySelectorAll('[data-film-url]');
        variableButtons.forEach(button => {
            button.addEventListener('click', function() {
                updateModalContentFromButton(button);
            });
        });
        
        const bestFilmButton = document.getElementById('detailsButton');
        if (bestFilmButton) {
            bestFilmButton.addEventListener('click', updateBestFilm);
            updateModalContentFromButton(bestFilmButton);
        }
    } catch (error) {
        console.error('Une erreur est survenue lors du chargement des films :', error);
    }
});

async function updateModalContentFromButton(button) {
    try {
        const filmUrl = button.getAttribute('data-film-url');
        await updateModalContent(filmUrl);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du contenu du modal :', error);
    }
}