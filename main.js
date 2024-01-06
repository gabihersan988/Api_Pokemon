let globalPokemon = null;
function findPokemonByName() {
  const pokemonName = prompt("Dime un pokemon");

  //https://pokeapi.co/  -> documentación de la API
  
  /* Cambios en la url del fetch: colocar el nombre del pokemon en el lugar de la url que se indica en la documentación
  https://pokeapi.co/api/v2/pokemon/?limit=1126pikachu  => https://pokeapi.co/api/v2/pokemon/pikachu?limit=1126
  */
  const pokemons = fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}?limit=1126`
  )
    .then((resp) => resp.json())
    .then((pokemon) => {
      console.log(pokemon);
      console.log(`lenght: ${pokemon.results.length}`);
      globalPokemon = pokemon.results;
    })
    .catch((error) => console.error(error.message));

  //return pokemon.results;
}
findPokemonByName();
//console.log(`lenght: ${pokemon.results.length}`);

function getLength() {
  alert(`nombre: ${globalPokemon[0].name} url: ${globalPokemon[0].url}`);

  let a = globalPokemon.filter((pokemon) => {
    return pokemon.name == "ivysaur";
  });

  alert(`nombre: ${a[0].name} url: ${a[0].url}`);
}
