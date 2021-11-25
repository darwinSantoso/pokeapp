import './PokemonCard.css';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function PokemonCard(props) {
  const [pokeData, setPokeData] = useState({});
  const [pokeDataLoading, setPokeDataLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    setPokeDataLoading(true);

    axios({
      url: props.pokemon.url,
      method: 'GET',
    })
      .then((res) => {
        console.log(res.data);
        setPokeData(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => setPokeDataLoading(false));
  }, []);

  const openDetail = (name) => {
    history.push(`/detail/${name}`);
  };

  if (pokeDataLoading) {
    return <h5>image is loading</h5>;
  }

  return (
    <div className="col" onClick={() => openDetail(props.pokemon.name)}>
      <div className="card h-100 pokemon-card">
        <img
          className="card-img-top poke-img"
          alt="pokemon"
          src={pokeData.sprites.other['official-artwork'].front_default}
        />
        <div className="card-body">
          <h5 className="card-title text-light">{props.pokemon.name}</h5>
          {pokeData.types.map((type) => (
            <div className="pokeType rounded-pill text-center">
              <p>{type.type.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
