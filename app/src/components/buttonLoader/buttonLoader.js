import React from "react";
import './buttonLoader.css'
const pokeball = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';

const ButtonLoader = () => {
    return (
        <button className='buttonLoader'><img className='pokeball' src={pokeball}/></button>
    );
};

export {
    ButtonLoader
}
