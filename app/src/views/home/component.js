import React, { Fragment, useState, useEffect } from "react";
import { callService } from "../../utils";
import { ButtonLoader } from '../../components';
import moment from "moment";


moment.locale("es");

const Home = () => {
    const [pokedexData, setPokedexData] = useState({});
    const [pokedexLoading, setPokedexLoading] = useState(false);

    useEffect(() => {
        callService({
            method: 'get',
            url: '/pokedex/all'
        })
            .then((response) => {
                setPokedexData(response)
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

    const mapPokedexItems = (pokedex) => {
        return pokedex.map((pokemon, index) => {
            return (
                <tr key={index}>
                    <td className="img"><img src={pokemon.frontImage}/></td>
                    <td className="pokemonInfo">    
                        <td className="id">
                            <span>{`#${pokemon.id}`}</span>
                        </td>
                        <td className="name">{pokemon.name}</td>
                    </td>
                </tr>
            );
        });
    };

    return (
        <Fragment>
            <h1>Pokedex: Enciclopedex de Tomas</h1>
            {pokedexData.pokedex && pokedexData.pokedex.length  ? mapPokedexItems(pokedexData.pokedex) : 'empty'}
            {pokedexLoading ? <ButtonLoader/> : <button onClick={nextPage} disabled={pokedexLoading}>Next page</button>}
        </Fragment>
    );
};

export {
    Home
}
