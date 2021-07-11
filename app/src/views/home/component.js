import React, { Fragment, useState, useEffect } from "react";
import { callService } from "../../utils";
import { Loader } from '../../components';
import moment from "moment";
import './component.css';
const pokeball = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';

moment.locale("es");

const Home = () => {
    const [pokedexData, setPokedexData] = useState({});
    const [pokemonCard, setPokemonCard] = useState({});
    const [pokedexLoading, setPokedexLoading] = useState(false);

    useEffect(() => {
        callService({
            method: 'get',
            url: '/pokedex/all'
        })
            .then((response) => {
                setPokedexData(response)
                setPokemonCard(response.pokedex[0])
            })
            .catch((err) => {
                console.info(err)
            });
    }, []);

    const nextPage = () => {
        setPokedexLoading(true)
        callService({
            method: 'get',
            url: pokedexData.nextPage
        })
            .then((response) => {
                setPokedexData({
                    ...pokedexData,
                    nextPage: response.nextPage,
                    previousPage: response.previousPage,
                    pokedex: [
                        ...pokedexData.pokedex, 
                        ...response.pokedex
                    ]
                })
                setPokedexLoading(false)
            })
            .catch((err) => {
                console.info(err)
                alert('tu vieja')
                setPokedexLoading(false)
            });
    };

    const selectPokemon = (pokemon, element) => {
        if (pokemonCard.target) {
            pokemonCard.target.id = undefined;
        }
        element.target.id = `pokemonElementActive`;
        setPokemonCard({...pokemon, target: element.target});
    };

    const mapPokedexItems = (pokedex) => {
        return pokedex.map((pokemon) => {
            return (
                <div key={pokemon.id} className="pokemonElement" onClick={(element) => selectPokemon(pokemon, element)}>
                    <div className="pokemonId">
                        <img className="elementPokeball" src={pokeball}/>
                        <span>{`N° ${pokemon.id}`}</span>
                    </div>
                    <span className="name">{pokemon.name}</span>
                </div>
            );
        });
    };

    return (
        <Fragment>
            <div className="pokedexModule">
                <div className="flex-column">
                    <h1 className="title">POKEDEX</h1>
                    <div className="trapsInfo">
                        <div className="flex-column">
                            <span className="traps">AVISTADOS:</span>
                            <span>{pokedexData.total || '???'}</span>
                        </div>
                        <div className="flex-column">
                            <span className="traps">ATRAPADOS:</span>
                            <span>{pokedexData.total || '???'}</span>
                        </div>
                    </div>
                </div>
                <div className='pokedex'>
                    <div className='pokemonCard'>
                        {pokemonCard.frontImage 
                        ? <img src={pokemonCard.frontImage}/>
                        : <div className="pokemonCardLoader">
                            <Loader/>
                        </div>}
                        {pokemonCard.types && pokemonCard.types.map((type) => {
                            return (<span className="type" id={type.name.toLowerCase()} >{type.name}</span>)
                        })}
                    </div>
                    <div>
                        <div className='pokemonList'>
                            {pokedexData.pokedex && pokedexData.pokedex.length 
                                ? mapPokedexItems(pokedexData.pokedex) 
                                : <div className="pokemonListLoader">
                                    <Loader/>
                                </div>
                            }
                        </div>
                        <button className='nextPageButton' onClick={nextPage} disabled={pokedexLoading}>
                            {pokedexLoading ? <Loader/> : 'Next page'}
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export {
    Home
}
