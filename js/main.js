//https://pokeapi.co/  -> documentación de la API

//https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event#examples
let currentPokemonInformation;
let name;
let imgId;
let pokemonArray = [];
let inputValue;
document.getElementById('searchForm').addEventListener('submit', findPokemonByName);

function findPokemonByName(event) {
  event.preventDefault(); 
  inputValue = document.getElementById('buscarInput').value.toLowerCase();
  const apiURL = 'https://pokeapi.co/api/v2/pokemon/' + inputValue;

  fetch(apiURL)
  .then(response => {
    return response.json();
  })
  .then(data => {
    cleanResultsSection();
    printPokemonInformation(data);
    currentPokemonInformation = data;
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
  addLiElement(ulResults, 'Altura: ' + pokemonInformation.height*10 + " cm");
  addLiElement(ulResults, 'Tipos: '+ pokemonInformation.types.map(type => capitalizeFirstLetter(type.type.name)).join(', '));
  addLiElement(ulResults, 'Peso: ' + pokemonInformation.weight/10 + " Kg")
  addLiElement(ulResults, 'Puntos de vida: ' + pokemonInformation.stats[0].base_stat)
  addLiElement(ulResults, 'Ataque: ' + pokemonInformation.stats[1].base_stat)
  addLiElement(ulResults, 'Defensa: ' + pokemonInformation.stats[2].base_stat)
  addLiElement(ulResults, 'Velocidad: ' + pokemonInformation.stats[5].base_stat)
  document.getElementById('resultadosSection').classList.add(pokemonInformation.types[0].type.name)

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
const capturaPokemon = document.querySelector(".capture");
capturaPokemon.addEventListener("click", capturaEstePokemon);
function capturaEstePokemon () {
  if (currentPokemonInformation) {
    let imgElement = document.createElement('img');
    imgElement.id = currentPokemonInformation.name;
    imgId = imgElement.id;
    pokedex.append(imgElement);
    if (pokemonArray.includes(imgId)) {
      console.log("Ya tienes este pokemon")
      console.log(pokemonArray);
    } else {
      pokemonArray.push(imgId);
      console.log(pokemonArray);
      document.getElementById('voidP').innerText = '';
      document.getElementById(imgId).setAttribute('class', currentPokemonInformation.name);
      document.getElementById(imgId).setAttribute('src', currentPokemonInformation.sprites.front_default);
      document.getElementById(imgId).setAttribute('type', "submit");
      return pokeButton();
    };
    
  } else {
    let pElement = document.createElement("p");
    pElement.innerText = "Aún no hay ningún Pokémon en tu colección";
    pokedex.append(pElement);
  };
};
function pokeButton() {
  for (let i = 0; i < pokemonArray.length; i++) {
    let setPokemon = pokemonArray[i];
    let infoPokemonCapturado = document.querySelector("." + setPokemon);
    console.log(infoPokemonCapturado);
    infoPokemonCapturado.onmouseenter = () => infoPokemonCapturado.style.outline = '4px solid lightgrey';
    infoPokemonCapturado.onmouseleave = () => infoPokemonCapturado.style.outline = '0px';
    document.getElementById(setPokemon).addEventListener('submit', findPokemonByName);
    inputValue = document.getElementById(setPokemon).id;
  }
}