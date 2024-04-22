function toggleThumbnails(thumbnailClass, buttonId) {
    let folded = true;

    function updateThumbnails() {
        const thumbnails = document.querySelectorAll(thumbnailClass);
        for (const thumbnail of thumbnails) {
            if (folded) thumbnail.classList.add('d-none');
            else thumbnail.classList.remove('d-none');
        }

        document.getElementById(buttonId).textContent = folded ? 'Voir plus' : 'Voir moins';
    }

    document.getElementById(buttonId).addEventListener('click', function() {
        folded = !folded;
        updateThumbnails();
    });

    updateThumbnails();
}

toggleThumbnails('.film-thumbnail', 'voirPlusButton');
toggleThumbnails('.film-thumbnail2', 'voirPlusButton2');
toggleThumbnails('.film-thumbnail3', 'voirPlusButton3');
toggleThumbnails('.film-thumbnail4', 'voirPlusButton4');
toggleThumbnails('.film-thumbnail5', 'voirPlusButton5');