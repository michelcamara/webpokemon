import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

import pokebola from './assets/pokebola.png';

function App() {
  const [poke, setPoke] = useState([]);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    async function loadPokemons() {
      const response = await axios.get('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json');
      setPoke(response.data.pokemon);

      //Filtrando os tipos de pokemons
      const types = [];
      response.data.pokemon.map(g => (
        // eslint-disable-next-line array-callback-return
        g.type.map(j => {
          if (types.filter(p => p === j).length === 0) {
            types.push(j);
          }
        })
      ));
      setTipos(types);
      //Fim do filtro
    }
    loadPokemons();
  }, []);

  function filterPoks(tipo) {
    console.log(tipo);
    const section = [];
    poke.map(pok => (
      pok.map(p => {
        if (p.type[0] === tipo || p.type[1] === tipo) {
          section.push(pok);
        }
      })
    ))
    setPoke(section);
  }

  return (
    <div id="app">
      <div className="asidediv">
        <aside>
          <form onSubmit={filterPoks}>
            <div className="input-block">
              <img src={pokebola} alt="Pokebola" />
              <label>Filtrar Pokémon</label>
              {tipos.map(tipo => (
                <button key={tipo} className={tipo} value={tipo} type="submit">{tipo}</button>
              ))}
            </div>
          </form>
        </aside>
      </div>

      <main>
        <ul>
          {poke.map(pok => (
            <li key={pok.id} className="poke-item">
              <header >
                <div className="poke-img">
                  <img src={pok.img} alt={pok.name} />
                </div>
                <div className="poke-info" >
                  <strong className={pok.type[0]} >{pok.name}</strong>
                </div>
              </header>
              <p>Tipo: {pok.type.join(', ')} </p>
              <p>Altura: {pok.height}</p>
              <p>Peso: {pok.weight}</p>
              <p>Fraquezas: {pok.weaknesses.join(', ')}</p>
              {/* <p>Proximas Evoluçoes: {pok.next_evolution.name.join(', ')}</p> */}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;