import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList({ searchQuery }) {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    loading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemon() {
    setPokemonListState((state) => ({ ...state, loading: true }));
    const response = await axios.get(pokemonListState.pokedexUrl);

    const pokemonResults = response.data.results;

    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));

    const pokemonResultsPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    const pokemonData = await axios.all(pokemonResultsPromise);

    const pokeListRes = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.front_shiny,
        type: pokemon.types,
      };
    });

    setPokemonListState((state) => ({
      ...state,
      pokemonList: pokeListRes,
      loading: false,
    }));
  }

  useEffect(() => {
    downloadPokemon();
  }, [pokemonListState.pokedexUrl]);

  // Filter Pokémon based on search query
  const filteredPokemonList = pokemonListState.pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.loading
          ? "Loading...."
          : filteredPokemonList.length > 0
          ? filteredPokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))
          : "No Pokémon found"}
      </div>
      <div className="controls">
        <button
          className="btns"
          disabled={!pokemonListState.prevUrl}
          onClick={() => {
            setPokemonListState((state) => ({
              ...state,
              pokedexUrl: state.prevUrl,
            }));
          }}
        >
          Prev
        </button>
        <button
          className="btns"
          disabled={!pokemonListState.nextUrl}
          onClick={() => {
            setPokemonListState((state) => ({
              ...state,
              pokedexUrl: state.nextUrl,
            }));
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
