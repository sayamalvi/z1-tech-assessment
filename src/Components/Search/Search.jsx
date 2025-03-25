import { useState } from "react";
import "./Search.css";

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(event) {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass search query to parent
  }

  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search Pokémon"
        id="poke-name-search"
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
