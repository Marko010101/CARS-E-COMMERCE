// Get the element with the ID "poke_container"
const poke_container = document.getElementById("poke_container");

// Get the query parameter from the URL
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

// Fetch data for a specific Pokemon based on its ID
const getPokemons = async (id) => {
  console.log(id);
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  createPokemonCard(data);
};

// Call getPokemons function with the provided ID
getPokemons(id);

// Create a card for a Pokemon and add it to the container
const createPokemonCard = async (pokemon) => {
  const pokemonEl = document.createElement("div");

  // Set the value of pokemon.name in the h1 element
  const pokemonNameEl = document.getElementById("pokemonName");
  pokemonNameEl.textContent = pokemon.name;

  // Get the element with the ID "pokemonNumber"
  const pokemonNumberEl = document.getElementById("pokemonNumber");
  let paddedId;

  if (pokemon.id < 10) {
    paddedId = `#00${pokemon.id}`;
  } else if (pokemon.id < 100) {
    paddedId = `#0${pokemon.id}`;
  } else {
    paddedId = `#${pokemon.id}`;
  }

  pokemonNumberEl.textContent = paddedId;

  // Fetch ability data
  const abilityUrl = pokemon.abilities[0].ability.url;
  const abilityRes = await fetch(abilityUrl);
  const abilityData = await abilityRes.json();
  const effect = abilityData.effect_entries[0].effect;

  // Get the element with the ID "info"
  const infoContainer = document.getElementById("info");

  // Create the HTML content for the ability info
  let abilityInfoHtml = `
    <div class="info">
      <h3>Ability Info:</h3>
      <h5>${effect}</h5>
    </div>
  `;

  // Set the HTML content for the "info" div
  infoContainer.innerHTML = abilityInfoHtml;

  // Create the HTML content for the Pokemon card
  let pokemonInnerHtml = `
    <div class="desc-img">
      <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeadingZeros(
        pokemon.id
      )}.png">
    </div>
  `;

  // Set the HTML content for the Pokemon card
  pokemonEl.innerHTML = pokemonInnerHtml;

  // Add the Pokemon card to the container
  poke_container.appendChild(pokemonEl);

  // Calculate the Pokemon's height
  const pokemonHeight = pokemon.height;

  // Get the element with the class "col-3"
  const col3Element = document.querySelector(".col-3");

  // Create an <h5> element
  const heightElement = document.createElement("h5");

  // Set the text content of the <h5> element to the height value
  heightElement.textContent = `Height: ${pokemonHeight}`;

  // Append the <h5> element to the col-3 element
  col3Element.appendChild(heightElement);
};

// Function to pad leading zeros to the ID
const padLeadingZeros = (id) => {
  if (id < 10) {
    return `00${id}`;
  } else if (id < 100) {
    return `0${id}`;
  } else {
    return `${id}`;
  }
};
