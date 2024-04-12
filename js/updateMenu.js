async function updateMenuDeroulant() {
    const baseUrl = 'http://localhost:8000/api/v1/genres/';
    
    let allData = [];
    let nextPage = baseUrl;
    let types = [];

    while (nextPage) {
        const response = await fetch(nextPage);
        const data = await response.json();
        allData = allData.concat(data.results);
        nextPage = data.next;
    }

    allData.forEach(function(item) {
        types.push(item.name);
    });

    const menuDeroulant = document.getElementById('menuDeroulant');
    types.forEach(function(type, index) {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        if (index === 0) {
            option.selected = true;
        }
        menuDeroulant.appendChild(option);
        
        
    });


    
    let types2 = []; 
    types2 = types.slice(); 

    const menuDeroulant2 = document.getElementById('menuDeroulant2');
    types2.forEach(function(type, index) { 
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        if (index === 1) {
            option.selected = true;
        }
        menuDeroulant2.appendChild(option); 
    });
}


document.addEventListener("DOMContentLoaded", function() {
    updateMenuDeroulant();
});
