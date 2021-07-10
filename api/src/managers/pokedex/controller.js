const Service = require('./service');

const getPokedex = async (req, res) => {
    try {
        const { query: { skip = 0, limit = 30 } } = req;
        const pokedex = await Service.getPokedex({ skip: Number(skip), limit: Number(limit) });
        res.status(200).send(pokedex);
    } catch (error) {
        console.error('GET_POKEDEX_ERROR: ', error)
        res.status(error.status || 500).send(error.data || error);
    }
};

const getPokemon = async (req, res) => {
    try {
        const { params: { id } } = req;
        const pokedex = await Service.getPokemon({ id: Number(id) });
        res.status(200).send(pokedex);
    } catch (error) {
        console.error('GET_POKEDEX_ERROR: ', error)
        res.status(error.status || 500).send(error.data || error);
    }
};

const getPokemonDetail = async (req, res) => {
    try {
        const { params: { id } } = req;
        const pokedex = await Service.getPokemonDetail({ id: Number(id) });
        res.status(200).send(pokedex);
    } catch (error) {
        console.error('GET_POKEDEX_ERROR: ', error)
        res.status(error.status || 500).send(error.data || error);
    }
};

module.exports = {
    getPokedex,
    getPokemon,
    getPokemonDetail
};