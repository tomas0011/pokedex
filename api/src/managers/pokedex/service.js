const axios = require('axios');
const { capitalize } = require('../../utils');

const getPokedex = async ({ skip, limit }) => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${skip}&limit=${limit - skip}`);
    return {
        total: data.count,
        nextPage: (limit < data.count) ? `/pokedex/all?skip=${limit}&limit=${limit + 30}` : null,
        previousPage: (skip > 0) ? `/pokedex/all?skip=${skip - 30}&limit=${skip}` : null,
        totalPerPage: data.results.length,
        pokedex: await mapPokemonsDetail(data.results)
    };
};

const mapPokemonsDetail = (pokemons) => {
    return Promise.all(pokemons.map(async (pokemon) => {
        return getPokemon({ id: getIdByUrl(pokemon.url) })
    }));
};

const getIdByUrl = url =>  url.split('/')[url.split('/').length - 2];

const getPokemon = async ({ id }) => {
    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon-form/${id}/`);
        return {
            id: data.id,
            name: data.pokemon.name.toUpperCase(),
            frontImage: data.sprites.front_default,
            backImage: data.sprites.back_default,
            types: data.types.map((type) => {
                return {
                    name: type.type.name.toUpperCase(),
                    typeDetail: `/pokedex/type/${getIdByUrl(type.type.url)}`
                }
            }),
            pokemonDetail: `/pokemon/detail/${id + 1}`,
            nextPokemon: `/pokemon/${id + 1}`,
            previousPokemon: (id > 0) ? `/pokemon/${id - 1}` : null
        }
    } catch (error) {
        throw {
            error: error.message,
            status: error.response.status
        }
    }
};

const getPokemonDetail = async ({ id }) => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    if (!data) { 
        throw {
            status: 404,
            message: `pokemon ${id} not found`
        }
    };
    return {
        ...data
    }
};

module.exports = {
    getPokedex,
    getPokemon,
    getPokemonDetail
};