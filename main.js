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

function cleanResultsSection() {
  document.getElementById('notFound').innerText = '';
  document.getElementById('frontImage').removeAttribute('src');
  document.getElementById('backImage').removeAttribute('src');
  document.getElementById('tituloResultados').innerText = '';
  document.getElementById('listaResultados').innerHTML = '';
  document.getElementById('resultadosSection').hidden = true;
  document.getElementById('resultadosSection').removeAttribute('class');
}
//Pintar información do Pokemon
function printPokemonInformation(pokemonInformation) {
  //Eliminar hidden ao amosar os resultados
  document.getElementById('resultadosSection').removeAttribute('hidden');
  //Pintar imaxe
  document.getElementById('frontImage').setAttribute('src', pokemonInformation.sprites.front_default);
  document.getElementById('backImage').setAttribute('src', pokemonInformation.sprites.back_default);
  //Pintar nome do Pokemon
  //const nombre = pokemonInformation.name.charAt(0).toUpperCase() + pokemonInformation.name.slice(1);
  const nombre = capitalizeFirstLetter(pokemonInformation.name)
  document.getElementById('tituloResultados').innerText = nombre;

  //Pintar a lista de características de Pokemon
  const ulResults = document.getElementById('listaResultados');

  addLiElement(ulResults, 'Nombre: ' + nombre);
  addLiElement(ulResults, 'Altura: ' + pokemonInformation.height);

  addLiElement(ulResults, 'Tipos: '+ pokemonInformation.types.map(type => capitalizeFirstLetter(type.type.name)).join(', '));

  document.getElementById('resultadosSection').classList.add(pokemonInformation.types[0].type.name)

  //TODO
  console.log('Peso: ' + pokemonInformation.weight)
  console.log('Puntos de vida: ' + pokemonInformation.stats[0].base_stat)
  console.log('Ataque: ' + pokemonInformation.stats[1].base_stat)
  console.log('Defensa: ' + pokemonInformation.stats[2].base_stat)
  console.log('Velocidad: ' + pokemonInformation.stats[5].base_stat)
}

// Función para engadir elementos li a unha ul co texto recibido (Lista de características de Pokemon)
function addLiElement(ulElement, text) {
  let liElement = document.createElement('li');
  liElement.innerText = text;
  ulElement.append(liElement);
}

// Función poñer primeira letra en maiúsculas
function capitalizeFirstLetter(name) {
  let nameWithCapitalLetter = name.charAt(0).toUpperCase() + name.slice(1);
  return nameWithCapitalLetter;
}