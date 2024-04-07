async function displayGenres() {
    const genres = await getAllPages('http://localhost:8000/api/v1/genres/');
    const genreList = document.getElementById('genreList');

    genres.forEach(genre => {
        const listItem = document.createElement('li');
        listItem.textContent = genre.name;
        genreList.appendChild(listItem);
    });
}



async function getAllPages(baseUrl) {
    let allData = [];
    let nextPage = baseUrl;
  
    while (nextPage) {
      const response = await fetch(nextPage);
      const data = await response.json();
      allData = allData.concat(data.results);

      nextPage = data.next;
    }
  
    return allData;
  }
  
  getAllPages('http://localhost:8000/api/v1/genres/')
    .then(data => {
      console.log(data); 
    })
    .catch(error => {
      console.error('Erreur :', error);
    }); 
