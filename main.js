function findPokemonByName(event) {
  event.preventDefault(); 
  const inputValue = document.getElementById('buscarInput').value.toLowerCase();
  const apiURL = 'https://pokeapi.co/api/v2/pokemon/' + inputValue;

  fetch(apiURL)
  .then(response => {
    return response.json();
  })
  .then(data => {
    cleanResultsSection();
    printPokemonInformation(data);
  })
  .catch(error => {
    console.error('Error:', error);
    cleanResultsSection();
    document.getElementById('notFound').innerText = '¿Qué? ¡Ese Pokémon no existe!'
    });
}