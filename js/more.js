
let plié = true;


function Thumbnails() {
    const thumbnails = document.querySelectorAll('.film-thumbnail');
    for (const thumbnail of thumbnails) {
        if (plié) thumbnail.classList.add('d-none');
        else thumbnail.classList.remove('d-none');
    }

    document.getElementById('voirPlusButton').textContent = plié ? 'Voir plus' : 'Voir moins';
}


document.getElementById('voirPlusButton').addEventListener('click', function() {
    plié = !plié;
    Thumbnails();
});


let plié2 = true;

function Thumbnails2() {
    const thumbnails = document.querySelectorAll('.film-thumbnail2');
    for (const thumbnail of thumbnails) {
        if (plié2) thumbnail.classList.add('d-none');
        else thumbnail.classList.remove('d-none');
    }

    document.getElementById('voirPlusButton2').textContent = plié2 ? 'Voir plus' : 'Voir moins';
}


document.getElementById('voirPlusButton2').addEventListener('click', function() {
    plié2 = !plié2;
    Thumbnails2();
});

let plié3 = true;

function Thumbnails3() {
    const thumbnails = document.querySelectorAll('.film-thumbnail3');
    for (const thumbnail of thumbnails) {
        if (plié3) thumbnail.classList.add('d-none');
        else thumbnail.classList.remove('d-none');
    }

    document.getElementById('voirPlusButton3').textContent = plié3 ? 'Voir plus' : 'Voir moins';
}


document.getElementById('voirPlusButton3').addEventListener('click', function() {
    plié3 = !plié3;
    Thumbnails3();
});
let plié4 = true;

function Thumbnails4() {
    const thumbnails = document.querySelectorAll('.film-thumbnail4');
    for (const thumbnail of thumbnails) {
        if (plié4) thumbnail.classList.add('d-none');
        else thumbnail.classList.remove('d-none');
    }

    document.getElementById('voirPlusButton4').textContent = plié4 ? 'Voir plus' : 'Voir moins';
}


document.getElementById('voirPlusButton4').addEventListener('click', function() {
    plié4 = !plié4;
    Thumbnails4();
});
let plié5 = true;

function Thumbnails5() {
    const thumbnails = document.querySelectorAll('.film-thumbnail5');
    for (const thumbnail of thumbnails) {
        if (plié5) thumbnail.classList.add('d-none');
        else thumbnail.classList.remove('d-none');
    }

    document.getElementById('voirPlusButton5').textContent = plié5 ? 'Voir plus' : 'Voir moins';
}


document.getElementById('voirPlusButton5').addEventListener('click', function() {
    plié5 = !plié5;
    Thumbnails5();
});

Thumbnails();
Thumbnails2();
Thumbnails3();
Thumbnails4();
Thumbnails5();