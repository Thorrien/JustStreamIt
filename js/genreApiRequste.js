async function getAllPages(baseUrl) {
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

  console.log(types);
}
  
  getAllPages('')
    .then(data => {
      console.log(data); 
    })
    .catch(error => {
      console.error('Erreur :', error);
    }); 
