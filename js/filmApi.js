async function getAllPages(baseUrl) {
    let allData = [];
    let nextPage = baseUrl;
  
    while (nextPage) {
      const response = await fetch(nextPage);
      const data = await response.json();
      allData = allData.concat(data.results);

      nextPage = data.next;
    }
    
    for






    return allData;
  }
  
  getAllPages('http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=9&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=')
    .then(data => {
      console.log(data); 
    })
    .catch(error => {
      console.error('Erreur :', error);
    }); 
