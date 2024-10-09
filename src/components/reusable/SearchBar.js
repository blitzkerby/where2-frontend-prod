import { Search } from "lucide-react";

const styles = {
    form    : "relative mx-[20px]",
    input   : "w-full py-3 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-80",
    button  : "absolute right-3 top-1/2 transform -translate-y-1/2",
    icon    : "h-5 w-5 text-gray-400 z-[0]"
};

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