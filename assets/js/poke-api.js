const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemon = async (number) => {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${number}`
    const eggGroupUrl = `https://pokeapi.co/api/v2/egg-group/${number}`
    const evolvesUrl = `https://pokeapi.co/api/v2/evolution-chain/${number}`

    pokemonReturn = await fetch(pokemonUrl)
    pokemonReturn = await pokemonReturn.json();

    eggGroupReturn = await fetch(eggGroupUrl)
    eggGroupReturn = await eggGroupReturn.json();

    evolvesReturn = await fetch(evolvesUrl)
    evolvesReturn = await evolvesReturn.json();

    let details = [pokemonReturn, eggGroupReturn, evolvesReturn]
    let results = convertPokemon(details)

    return results
}

function convertPokemon(pokeDetail) {
    const pokemon = new PokemonDetails()
    const pokemonDetails = pokeDetail[0]
    const pokemonEggGroup = pokeDetail[1]

    pokemon.number = pokemonDetails.id
    pokemon.name = pokemonDetails.name
    const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokemonDetails.sprites.other.dream_world.front_default
    pokemon.height = pokemonDetails.height
    pokemon.weight = pokemonDetails.weight
    const abilities = pokemonDetails.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name)
    pokemon.abilities = abilities

    pokemon.eggGroup = pokemonEggGroup.name

    return pokemon
}