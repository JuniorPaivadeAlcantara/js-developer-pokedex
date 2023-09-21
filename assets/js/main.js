const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const closeButton = document.getElementById('botaoFechar')
const modalDetails = document.getElementById('modalDetails')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    
        <li class="pokemon ${pokemon.type}" onclick="abrir(${pokemon.number})">

            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            
        </li>
        
    `
}

function abrir(numero) {
    modalDetails.showModal()
    loadPokemon(numero)
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function convertPokemonToModal(pokemon) {
    return `<div class="${pokemon.type} cardColor">
    <button type="button" id="botaoFechar" onclick=modalDetails.close()>
    <i class="fa fa-close"></i>
</button>
<section class="pokemon">
    <div class="detail">
        <div class="nameNumber">
            <h1 class="name">${pokemon.name}</h1>
            <span class="number">#${pokemon.number}</span>
        </div>
        <div>
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
        </div>
    </div>
    <div>
        <img class="photo" src="${pokemon.photo}" 
            alt=${pokemon.name}
    </div>

    <div>

        <div class="abas">
            <nav class="navigation">
                <a href="#about">About</a>
                <a href="#baseStats">Base Stats</a>
                <a href="#evolution">Evolution</a>
                <a href="#moves">Moves</a>
            </nav>
            <div id="about">

                <p>Species</p>
                <p>Height - ${pokemon.height}</p>
                <p>Weight - ${pokemon.weight}</p>
                <p>Abilities -  
                    ${pokemon.abilities.map((abilities) => `<span style="text-transform: capitalize;">${abilities}<span>`).join(', ')}
                </p>

                <h4>Breeding</h4>

                <p>Gander</p>
                <p style="text-transform: capitalize;" >Egg Group - ${pokemon.eggGroup}</p>
                <p>Egg Cycle</p>

            </div>

            <div id="baseStats">

                <p>HP</p>
                <p>Attack</p>
                <p>Defense</p>
                <p>Sp. Atk</p>
                <p>Sp. Def</p>
                <p>Speed</p>
                <p>Total</p>

            </div>
        </div>
    </div>
</section>
</div>`
}

function loadPokemon(number) {
    const pokemon = pokeApi.getPokemon(number).then(pokemon => {
        const newHtml = convertPokemonToModal(pokemon)
        modalDetails.innerHTML = newHtml
    })
}
