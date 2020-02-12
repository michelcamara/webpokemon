import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

import pokebola from './assets/pokebola.png';

function App() {
  const [poke, setPoke] = useState([]);

  useEffect(() => {
    async function loadPokemons() {
      const response = await axios.get('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json');
      setPoke(response.data.pokemon);
    }
    loadPokemons();
  }, []);

  return (
    <div id="app">
      <div className="asidediv">
        <aside>
          <form>
            <div className="input-block">
              <img src={pokebola} alt="Pokebola" />
              <label>Buscar Pokémon</label>
              <input type="text" placeholder="Digite o nome do Pokémon" />
            </div>
            <button type="submit">Buscar</button>
          </form>
        </aside>
      </div>

      <main>
        <ul>
          { poke.map(pok => (
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