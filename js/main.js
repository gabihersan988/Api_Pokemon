let currentPokemonInformation;
let name;
let imgId;
let pokemonArray = [];
let inputValue;
let pokemonGlobalList;

document
  .getElementById("searchForm")
  .addEventListener("submit", findPokemonByName);

function findPokemonByName(event) {
  event.preventDefault();
  inputValue = document.getElementById("buscarInput").value.toLowerCase();
  const apiURL = "https://pokeapi.co/api/v2/pokemon/" + inputValue;

  fetchPokemonByName(apiURL)
}

function findPokemonByNameOnClick(event, pokemonName) {
  event.preventDefault();
  const apiURL = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;

  fetchPokemonByName(apiURL)
}

function fetchPokemonByName(apiUrl) {
  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      cleanResultsSection();
      printPokemonInformation(data);
      currentPokemonInformation = data;
    })
    .catch((error) => {
      console.error("Error:", error);
      cleanResultsSection();
      document.getElementById("notFound").innerText =
        "¿Qué? ¡Ese Pokémon no existe!";
    });
}

function cleanResultsSection() {
  document.getElementById("notFound").innerText = "";
  document.getElementById("frontImage").removeAttribute("src");
  document.getElementById("backImage").removeAttribute("src");
  document.getElementById("tituloResultados").innerText = "";
  document.getElementById("listaResultados").innerHTML = "";
  document.getElementById("resultadosSection").hidden = true;
  document.getElementById("resultadosSection").removeAttribute("class");
}
("");
//Pintar carta Pokémon

function printPokemonInformation(pokemonInformation) {
  document.getElementById("resultadosSection").removeAttribute("hidden");
  document.getElementById("frontImage").setAttribute("src", pokemonInformation.sprites.front_default);
  document.getElementById("backImage").setAttribute("src", pokemonInformation.sprites.back_default);
  document.getElementById("frontImage").setAttribute("alt", "");
  document.getElementById("backImage").setAttribute("alt", "");
 
  const nombre = capitalizeFirstLetter(pokemonInformation.name);
  document.getElementById("tituloResultados").innerText = nombre;

  const ulResults = document.getElementById("listaResultados");

  addLiElement(ulResults, "Nombre: " + nombre);
  addLiElement(ulResults, "Altura: " + pokemonInformation.height * 10 + " cm");
  addLiElement(ulResults,"Tipos: " + pokemonInformation.types.map((type) => capitalizeFirstLetter(type.type.name)).join(", "));
  addLiElement(ulResults, "Peso: " + pokemonInformation.weight / 10 + " Kg");
  addLiElement(ulResults,"Puntos de vida: " + pokemonInformation.stats[0].base_stat);
  addLiElement(ulResults, "Ataque: " + pokemonInformation.stats[1].base_stat);
  addLiElement(ulResults, "Defensa: " + pokemonInformation.stats[2].base_stat);
  addLiElement(ulResults,"Velocidad: " + pokemonInformation.stats[5].base_stat);
  document.getElementById("resultadosSection").classList.add(pokemonInformation.types[0].type.name);
}

// Función para añadir elementos li a una ul con el texto recibido (Lista de características de Pokemon)
function addLiElement(ulElement, text) {
  let liElement = document.createElement("li");
  liElement.innerText = text;
  ulElement.append(liElement);
}

// Función poñer primera letra en mayúsculas
function capitalizeFirstLetter(name) {
  let nameWithCapitalLetter = name.charAt(0).toUpperCase() + name.slice(1);
  return nameWithCapitalLetter;
}
// Capturar Pokémon
const capturaPokemon = document.querySelector(".capture");
capturaPokemon.addEventListener("click", capturaEstePokemon);
function capturaEstePokemon() {
  if (currentPokemonInformation) {
    let imgElement = document.createElement("img");
    imgElement.id = currentPokemonInformation.name;
    imgId = imgElement.id;
    imagesContainer2.append(imgElement);
    if (pokemonArray.includes(imgId)) {
      window.alert("Ya tienes este pokémon");
      console.log(pokemonArray);
    } else {
      pokemonArray.push(imgId);
      console.log(pokemonArray);
      document.getElementById("voidP").setAttribute("hidden", "true")
      document.getElementById(imgId).setAttribute("class", "currentPokemon");
      document.getElementById(imgId).setAttribute("src", currentPokemonInformation.sprites.front_default);
      document.getElementById(imgId).setAttribute("alt", currentPokemonInformation.name);
      
      document.querySelector("#"+imgId+".currentPokemon").addEventListener("click", (event) => {
        imageCall(event)
      })
      let pokemonCaptured = {
        "name": currentPokemonInformation.name,
        "img": currentPokemonInformation.sprites.front_default
      }
      let pokemonCapturedList = localStorage.getItem("pokemonCapturedList")
      pokemonCapturedList = pokemonCapturedList ? JSON.parse(pokemonCapturedList) : [];
      pokemonCapturedList.push(pokemonCaptured)
      localStorage.setItem("pokemonCapturedList", JSON.stringify(pokemonCapturedList));

      return pokeButton();
    }
  } else {
    let pElement = document.createElement("p");
    pElement.innerText = "Aún no hay ningún Pokémon en tu colección";
    pokedex.append(pElement);
  }
}

//Funcion que llama a la funcion findpokemonByPoke
function imageCall(imgId) {
  console.log("imgId:" + imgId.id);
  findPokemonByPoke(imgId.id);
}

//Creo una funcion que llama al API de pokemon que acepta un literal EJ:"pikachu"
function findPokemonByPoke(pokemon) {
  const apiURL = "https://pokeapi.co/api/v2/pokemon/" + pokemon;

  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      cleanResultsSection();
      printPokemonInformation(data);
      currentPokemonInformation = data;
    })
    .catch((error) => {
      console.error("Error:", error);
      cleanResultsSection();
      document.getElementById("notFound").innerText =
        "¿Qué? ¡Ese Pokémon no existe!";
    });
}

function pokeButton() {
  for (let i = 0; i < pokemonArray.length; i++) {
    let setPokemon = pokemonArray[i];
    let infoPokemonCapturado = document.querySelector("." + setPokemon);
    console.log(infoPokemonCapturado);
    infoPokemonCapturado.onmouseenter = () =>
      (infoPokemonCapturado.style.outline = "4px solid lightgrey");
    infoPokemonCapturado.onmouseleave = () =>
      (infoPokemonCapturado.style.outline = "0px");
    document
      .getElementById(setPokemon)
      .addEventListener("submit", findPokemonByName);
    inputValue = document.getElementById(setPokemon).id;
    console.log(inputValue);
  }
}
// funcion para añadir sonido al capturar
function reproducirSonido() {
  const miSonido = document.getElementById('miSonido');
  miSonido.play();
  sonidoReproducido = false;
}