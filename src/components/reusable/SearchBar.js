import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from "lucide-react";

const tailwindStyles = {
  form: "rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-80",
  input: "bg-opacity-0",
  button: "",
  icon: "text-gray-400"
};

const cssStyles = {
  form: {
    height: "54px",
    display: "flex",
    justifyContent: "space-between",
    overflow: "hidden",
    width: "inherit",
    padding: "0 1.6875rem",
    position: "relative",
    transition: "border-radius 0.5s ease"
  },
  input: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "inherit"
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
        className={tailwindStyles.form}
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
        className={`${tailwindStyles.input}`} 
        style={cssStyles.input}
      />
      <button 
        type="submit" 
        className={`${tailwindStyles.button}`} 
        style={cssStyles.button}
        aria-label="Search"
      >
        <Search className={tailwindStyles.icon} style={cssStyles.icon} />
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