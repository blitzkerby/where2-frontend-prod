function SearchBar({ handleSearch, searchPlaceholder }) {
    return (
        <form onSubmit={handleSearch} className="relative mx-[20px]">
            <input 
                type="text" 
                name="search" 
                placeholder={searchPlaceholder} 
                className="w-full py-3 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-80"
            />
            <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                aria-label="Search"
            >
                {/* <Search className="h-5 w-5 text-gray-400 z-[0]" /> */}
            </button>
        </form>
)
}

export default SearchBar;