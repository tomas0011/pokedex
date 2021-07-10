const { Router } = require('express');
const {
    pokedexManager
} = require('../managers');

const routes = Router();

routes.get('/pokedex/all', pokedexManager.getPokedex);

routes.get('/pokemon/:id', pokedexManager.getPokemon);

module.exports = routes