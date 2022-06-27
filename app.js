console.log('connected')
const wrapperPoke = document.querySelector('.pokemon__wrapper')
console.log(wrapperPoke)

const getPokemon = async num => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/`
        for (let i = 1; i <= num; i++) {

            const res = await fetch(`${url}${i}`)
            const data = await res.json()
            // console.log(data)
            console.log(data.id, data.name, data.types[0].type.name)
            const html = `
            <div class="pokemon__name">${data.name}</div>
            
        </div>
            `
            wrapperPoke.insertAdjacentHTML('beforeend', html)

        }

    }
    catch (err) {
        new Error(err, 'NOT gonna catch them all')
    }

}
{/* <img src="" alt="" class="pokemon__image"></img> */ }
getPokemon(25)
// fetch(`https://pokeapi.co/api/v2/pokemon/ditto`).then((res) => res.json())
//     .then(data => {
//         console.log(data)
//         console.log(data.name)
//         console.log(data.sprites.front_shiny)
//     })
