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
function imageCall(event) {
  findPokemonByPoke(event.target.id);
}

//Funcion que llama al API de pokemon que acepta un literal EJ:"pikachu"
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
    console.log("infoPokemonCapturado:" + setPokemon);
    infoPokemonCapturado.onmouseenter = () =>
      (infoPokemonCapturado.style.outline = "4px solid lightgrey");
    infoPokemonCapturado.onmouseleave = () =>
      (infoPokemonCapturado.style.outline = "0px");
    document
      .getElementById(setPokemon)
      .addEventListener("submit", findPokemonByName);
    inputValue = document.getElementById(setPokemon).id;
    console.log("inputValue:" + inputValue);
    console.log("findPokemonByName:" + findPokemonByName);
  }
}
// Llamar a la función que muestre Pokémons al cargar la página

window.addEventListener('load', getAllPokemon);

function getAllPokemon() {
  const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=10000";

  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      buildPokemonList(data.results);
      printCapturedPokemonList();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function buildPokemonList(pokemonList) {
  pokemonGlobalList = pokemonList

  const listaResultados = document.getElementById("listaInicio");
  const unorderedList = pokemonList.sort(() => 0.5 - Math.random());
  let randomPokemonShow = unorderedList.slice(0, 10);
  let randomPokemonHide = unorderedList.slice(10)

  listaResultados.innerHTML = "";

  //Muestra Pokémons random
  randomPokemonShow.forEach((pokemon) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${capitalizeFirstLetter(pokemon.name)}`;
    listItem.classList.add(pokemon.name)

    const imgElement = document.createElement("img");

    imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`;

    imgElement.alt = "";
    imgElement.width = 50;

    listItem.addEventListener("click", (event) => {
      findPokemonByNameOnClick(event, pokemon.name)
    })

    listItem.appendChild(imgElement);

    listaResultados.appendChild(listItem);
  });

  // Mustra pokémons al autocompletar
  randomPokemonHide.forEach((pokemon) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${capitalizeFirstLetter(pokemon.name)}`;
    listItem.classList.add(pokemon.name)
    listItem.style.display = "none"

    const imgElement = document.createElement("img");

    imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`;

    imgElement.alt = "";
    imgElement.width = 50; 

    listItem.addEventListener("click", (event) => {
      findPokemonByNameOnClick(event, pokemon.name)
    })

    listItem.appendChild(imgElement);

    listaResultados.appendChild(listItem);
  });
}

function onLoadCapturas() {
  printCapturedPokemonList();
  createButonLimpiar();
}

function printCapturedPokemonList() {
  let pokemonCapturedList = localStorage.getItem("pokemonCapturedList");
  pokemonCapturedList = pokemonCapturedList ? JSON.parse(pokemonCapturedList) : [];
  console.log(pokemonCapturedList)

  pokemonCapturedList.forEach((pokemonCaptured) => {
    let imgElement = document.createElement("img");
    imgElement.id = pokemonCaptured.name;

    imgId = imgElement.id;
    imagesContainer2.append(imgElement);

    pokemonArray.push(imgId);
    document.getElementById("voidP").setAttribute("hidden", "true")
    document.getElementById(imgId).setAttribute("class", "currentPokemon");
    document.getElementById(imgId).setAttribute("src", pokemonCaptured.img);

    console.log("#"+imgId+".currentPokemon")
    if (document.querySelector("#"+imgId+".currentPokemon")) {
      document.querySelector("#"+imgId+".currentPokemon").addEventListener("click", (event) => {
        imageCall(event)
      });
    }
  });
  pokeButton();
}

document.getElementById("buscarInput").addEventListener("input", filterPokemonList);
function filterPokemonList() {
  const searchTerm = buscarInput.value.trim().toLowerCase();
  if (searchTerm.length === 0) {
    buildPokemonList(pokemonGlobalList);
  } else {
    pokemonGlobalList.forEach((pokemon) => {
      const pokemonName = pokemon.name.toLowerCase();
      const shouldShow = pokemonName.startsWith(searchTerm);
      let element = document.querySelector("." + pokemonName)
      if (element) {
        element.style.display = shouldShow ? "list-item" : "none";
      }
    });
  }
}
document.getElementById('cabecera').addEventListener('click', function() {
  location.reload();
});

onLoadCapturas();
function createButonLimpiar() {
}

function borrarCache() {
  let pokemonCapturedList = localStorage.getItem("pokemonCapturedList");
  pokemonCapturedList = pokemonCapturedList
    ? JSON.parse(pokemonCapturedList)
    : [];

  pokemonCapturedList.forEach((pokemonCaptured) => {
    document.getElementById(pokemonCaptured.name).remove(pokemonCapturedList);
  });

  localStorage.setItem("pokemonCapturedList", JSON.stringify([]));
  pokemonArray = [];
  printCapturedPokemonList();
}


// Función para añadir sonido al capturar
function reproducirSonido() {
  const miSonido = document.getElementById("miSonido");
  miSonido.play();
  sonidoReproducido = false;
}
