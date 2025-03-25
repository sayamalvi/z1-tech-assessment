import { useState } from "react";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import "./Pokedex.css";

function Pokedex() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="pokedex-wrapper">
      <Search onSearch={setSearchQuery} />
      <PokemonList searchQuery={searchQuery} />
    </div>
  );
}

export default Pokedex;
