console.log("connected");

//DOM Elements selection
const pokeContainer = document.querySelector(".pokemon-container");

const btnFetchAll = document.querySelector(".fetch-all");
const btnSortById = document.querySelector(".sort-by-id");
const btnSearch = document.querySelector(".btn-search");

const inputSearch = document.querySelector(".input-search");
const sortSelect = document.querySelector('#sort')

// Global Variables
let pokemons = [];
let tempPokemons = pokemons;

let html;

// ............
// FETCH function for pokemons
// ............
btnFetchAll.addEventListener("click", (e) => {
    e.preventDefault();
    getPokemon(351);
    btnFetchAll.disabled = true;
    console.log("Making API calls to the server......");
});



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

// ............
// Renderer function for each pokemon-wrapper
// ............
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

// ............
// Sorting function
// ............
let order = true;
btnSortById.addEventListener("click", () => {
    sortPokemons(tempPokemons, 'id')
});

if (pokemons.length === 0) btnSortById.disabled = true;

function sortPokemons(array, attr) {
    order = !order;
    // console.log(attr)
    // console.log("After Pressing The Button:", order);
    pokeContainer.innerHTML = "";
    order === true
        ? array.sort((a, b) => a[attr] - b[attr])
        : array.sort((a, b) => b[attr] - a[attr]);
    array.forEach((pokemon) => {
        renderPokemon(pokemon);
    });
}


sortSelect.addEventListener('change', () => {
    sortPokemons(tempPokemons, sortSelect.value)
})

// ............
// Search function
// ............
inputSearch.addEventListener("keyup", (e) => {
    pokeContainer.innerHTML = "";
    let searchPokemons = pokemons.filter((poke) =>
        poke.name.includes(inputSearch.value)
    );
    searchPokemons.forEach((pokemon) => {
        renderPokemon(pokemon);
    });

    tempPokemons = searchPokemons

});
