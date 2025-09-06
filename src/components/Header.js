import React from "react";
import SearchBar from "./SearchBar";

const Header = ({ onSearch }) => (
  <header className="weather-header">
    <h2>Kenyan Weather</h2>
    <SearchBar onSearch={onSearch} />
  </header>
);

export default Header;