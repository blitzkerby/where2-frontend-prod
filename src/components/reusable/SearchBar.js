import { useState } from 'react';
import { Search } from "lucide-react";
import { searchUniversities } from '../../features/slices/searchbarSlice';

const styles = {
    form: "relative mx-[20px]",
    input: "w-full py-3 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-80",
    button: "absolute right-3 top-1/2 transform -translate-y-1/2",
    icon: "h-5 w-5 text-gray-400 z-[0]"
};

function SearchBar({ handleSearch, searchPlaceholder }) {
    const [searchQuery, setSearchQuery] = useState('');

    const onChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchQuery);
    };

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <input 
                type="text" 
                name="search" 
                placeholder={searchPlaceholder} 
                value={searchQuery}
                onChange={onChange}
                className={styles.input}
            />
            <button 
                type="submit" 
                className={styles.button}
                aria-label="Search"
            >
                <Search className={styles.icon} />
            </button>
        </form>
    );
}

export default function SearchComponent({ handleSearch , placeholder = "Search..."}) {
    return (
        <div>
            <SearchBar handleSearch={handleSearch} searchPlaceholder={placeholder} />
        </div>
    );
}
