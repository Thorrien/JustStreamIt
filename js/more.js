
let plié = true;


function Thumbnails() {
    const thumbnails = document.querySelectorAll('.film-thumbnail');
    for (let i = 2; i < thumbnails.length; i++) {
               thumbnails[i].classList.toggle('d-none');
    }
    document.getElementById('voirPlusButton').textContent = plié ? 'Voir plus' : 'Voir moins';
}

// Gestionnaire d'événements pour le bouton "Voir plus" et "Voir moins"
document.getElementById('voirPlusButton').addEventListener('click', function() {
    plié = !plié;
    Thumbnails();
});

// Appel initial de la fonction pour masquer les vignettes supplémentaires
Thumbnails();