console.log('connected')

const pokeContainer = document.querySelector('.pokemon-container')
const btnFetchAll = document.querySelector('.fetch-all')
const btnSortById = document.querySelector('.sort-by-id')
console.log(btnSortById)
const pokemons = []
let html;


btnFetchAll.addEventListener('click', (e)=> {
    e.preventDefault()
    getPokemon(10)
    btnFetchAll.disabled = true
    console.log('All pokemons fetched!')
})

btnSortById.addEventListener('click', sortPokemonsById)

const getPokemon = async num => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/`

        //Fetch pokemons and push into array
        for (let i = 1; i <= num; i++) {
            const res = await fetch(`${url}${i}`)
            const data = await res.json()
            pokemons.push(data)
        }


        //For each pokemon display the pokemon block inside the parent container.
        pokemons.forEach((pokemon)=> {  
            html = `
            <div class="pokemon-wrapper"> 
            <div class="pokemon-name">${pokemon.name} </div>
            <div class="pokemon-id">${pokemon.id}</div>
            <img src="${pokemon.sprites.front_default}">
            <div class="pokemon-type">${pokemon.types[0].type.name}
            </div>
            `
            pokeContainer.insertAdjacentHTML('beforeend',html)
        })
    
        btnSortById.disabled=false
    }
    catch (err) {
        new Error(err, 'NOT gonna catch them all today.')
    }
}


let order = true;
if (pokemons.length===0) btnSortById.disabled=true

function sortPokemonsById() {
    order = !order
    console.log('After Pressing The Button:',order)
    pokeContainer.innerHTML=''
    order === true ? pokemons.sort((a,b)=>a.id-b.id) : pokemons.sort((a,b)=>b.id-a.id)
    pokemons.forEach((pokemon)=> {
        html = `
        <div class="pokemon-wrapper"> 
        <div class="pokemon-name">${pokemon.name} </div>
        <div class="pokemon-id">${pokemon.id}</div>
        <img src="${pokemon.sprites.front_default}">
        <div class="pokemon-type">${pokemon.types[0].type.name}
        </div>
        `
        pokeContainer.insertAdjacentHTML('beforeend',html)
    })
    
    
}

///function sortPokemon(type) 
/// if (type === select-value) { }



