let globalPokemon = null;
function findPokemonByName() {
  const pokemonName = prompt("Dime un pokemon");

  const pokemons = fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=1126${pokemonName}`
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
    return pokemon.name == "picachu";
  });

  alert(`nombre: ${a[0].name} url: ${a[0].url}`);
}
