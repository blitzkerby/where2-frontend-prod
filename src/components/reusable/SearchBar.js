import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from "lucide-react";

const cssStyles = {
  form: {
    height: "54px",
    display: "flex",
    justifyContent: "space-between",
    overflow: "hidden",
    width: "inherit",
    padding: "0 1.6875rem",
    position: "relative",
    transition: "border-radius 0.5s ease",
    border: "1px solid #d1d5db", /* border-gray-300 */
    backgroundColor: "rgba(255, 255, 255, 0.8)", /* bg-white bg-opacity-80 */
    borderRadius: "10px"
  },
  input: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "inherit"
  },
  button: {
    border: "none",
    background: "none",
    cursor: "pointer"
  },
  icon: {
    color: "#9ca3af" /* text-gray-400 */
  },
  formFocusWithin: {
    borderRadius: "10px"
  },
  formBlur: {
    borderRadius: "30px"
  }
};

const SearchBar = ({ handleSearch, searchPlaceholder, category }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/list/${category}?q=${searchQuery}&page=1`);
    handleSearch(searchQuery);
  };

  return (
    <form
      onSubmit={onSubmit}
      style={cssStyles.form}
      onFocus={(e) => e.currentTarget.style.borderRadius = cssStyles.formFocusWithin.borderRadius}
      onBlur={(e) => e.currentTarget.style.borderRadius = cssStyles.formBlur.borderRadius}
    >
      <input
        type="text"
        name="search"
        placeholder={searchPlaceholder}
        value={searchQuery}
        onChange={onChange}
        style={cssStyles.input}
      />
      <button
        type="submit"
        style={cssStyles.button}
        aria-label="Search"
      >
        <Search style={cssStyles.icon} />
      </button>
    </form>
  );
};

const SearchComponent = ({ handleSearch, placeholder = "Search...", category }) => {
  return (
    <SearchBar handleSearch={handleSearch} searchPlaceholder={placeholder} category={category} />
  );
};

export default SearchComponent;
