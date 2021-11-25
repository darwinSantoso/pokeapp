import './Home.css';

import React, { useEffect, useState } from 'react';
import axios from '../../apis/server';

import PokemonCard from '../../components/PokemonCard/PokemonCard';

export default function Home() {
  const [pokeResult, setPokeResult] = useState([]);
  const [pokeResultIsLoading, setPokeResultIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsIsLoading, setPokemonsIsLoading] = useState(true);

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/',
    })
      .then((res) => {
        setPokemons(res.data.results);
        setPokeResult(res.data);

        console.log(pokeResult);
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => {
        setPokemonsIsLoading(false);
        setPokeResultIsLoading(false);
      });
  }, []);

  const nextClicked = () => {
    setPokemonsIsLoading(true);
    setPokeResultIsLoading(true);

    axios
      .get(pokeResult.next)
      .then((res) => {
        setPokeResult(res.data);
        setPokemons(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPokemonsIsLoading(false);
        setPokeResultIsLoading(false);
      });
  };

  const prevClicked = () => {
    setPokemonsIsLoading(true);
    setPokeResultIsLoading(true);

    axios
      .get(pokeResult.previous)
      .then((res) => {
        setPokeResult(res.data);
        setPokemons(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPokemonsIsLoading(false);
        setPokeResultIsLoading(false);
      });
  };

  if (pokemonsIsLoading) {
    return <h5>Loading...</h5>;
  }

  if (pokeResultIsLoading) {
    return <h5>Loading...</h5>;
  }

  return (
    <>
      <div className="container">
        <h1 className="text-center">Pokedex</h1>

        <div className="content">
          <div class="row row-cols-1 row-cols-md-4 g-4">
            {pokemons.map((pokemon) => (
              <PokemonCard pokemon={pokemon} />
            ))}
          </div>
          <br />

          <div className="text-center">
            {pokeResult.previous !== null ? (
              <button className="page-btn" onClick={prevClicked}>
                Prev
              </button>
            ) : (
              ''
            )}

            {pokeResult.next !== null ? (
              <button className="page-btn" onClick={nextClicked}>
                Next
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
}
