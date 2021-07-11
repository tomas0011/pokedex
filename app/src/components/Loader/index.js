import React from "react";
import './loader.css'
const pokeball = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';

const Loader = () => {
    return (
        <img className='pokeball' src={pokeball}/>
    );
};

export {
    Loader
}
