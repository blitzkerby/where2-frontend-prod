import { Search } from "lucide-react";
function SearchBar({ handleSearch, searchPlaceholder }) {
    return (
        <form onSubmit={handleSearch} className={styles.form}>
            <input 
                type="text" 
                name="search" 
                placeholder={searchPlaceholder} 
                className={styles.input}
            />
            <div>
            <div>
            <button 
                type="submit" 
                className={styles.button}
                aria-label="Search"
            >
                <Search className={styles.icon} />
            </button>
            </div>
            </div>
        </form>
    );
}

export default SearchBar;