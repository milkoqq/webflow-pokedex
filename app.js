console.log("connected");

//DOM Elements selection
const pokeContainer = document.querySelector(".pokemon-container");

const btnFetchAll = document.querySelector(".fetch-all");
const btnSortById = document.querySelector(".sort-by-id");
const btnSearch = document.querySelector(".btn-search");

const inputSearch = document.querySelector(".input-search");

// Global Variables
const pokemons = [];
let html;

//Fetch Button setup
btnFetchAll.addEventListener("click", (e) => {
    e.preventDefault();
    getPokemon(151);
    btnFetchAll.disabled = true;
    console.log("Making API calls to the server......");
});

btnSortById.addEventListener("click", sortPokemonsById);

const getPokemon = async (num) => {
    try {
        //Setup a mini fetch-timer.
        let time = 0;
        let intervalFetch = setInterval(() => time++, 1);
        intervalFetch;

        //Fetch Pokemons URL
        const url = `https://pokeapi.co/api/v2/pokemon/`;

        //Fetch pokemons and push into array
        for (let i = 1; i <= num; i++) {
            const res = await fetch(`${url}${i}`);
            const data = await res.json();
            pokemons.push(data);
        }

        //Log fetch time in console.
        clearInterval(intervalFetch);
        console.log(`Pokemons Fetched! in ${(time / 1000).toFixed(2)} seconds.`);

        //For each pokemon display the pokemon block inside the parent container.
        pokemons.forEach((pokemon) => {
            renderPokemon(pokemon);
        });

        btnSortById.disabled = false;

        inputSearch.disabled = false;
    } catch (err) {
        new Error(err, "NOT gonna catch them all today.");
    }
};

let order = true;
if (pokemons.length === 0) btnSortById.disabled = true;

function sortPokemonsById() {
    order = !order;
    console.log("After Pressing The Button:", order);
    pokeContainer.innerHTML = "";
    order === true
        ? pokemons.sort((a, b) => a.id - b.id)
        : pokemons.sort((a, b) => b.id - a.id);
    pokemons.forEach((pokemon) => {
        renderPokemon(pokemon);
    });
}

inputSearch.addEventListener("keyup", (e) => {
    pokeContainer.innerHTML = "";
    let searchPokemons = pokemons.filter((poke) =>
        poke.name.includes(inputSearch.value)
    );
    console.log(inputSearch.value);
    searchPokemons.forEach((pokemon) => {
        renderPokemon(pokemon);
    });
});

function renderPokemon(pokemon) {
    html = `
    <div class="pokemon-wrapper"> 
    <div class="pokemon-name">${pokemon.name} </div>
    <div class="pokemon-id">${pokemon.id}</div>
    <img src="${pokemon.sprites.front_default}">
    <div class="pokemon-type">${pokemon.types[0].type.name}
    </div>
    `;
    pokeContainer.insertAdjacentHTML("beforeend", html);
}
///function sortPokemon(type)
/// if (type === select-value) { }

function sayHello(e) {
    console.log("hey babe");
}
