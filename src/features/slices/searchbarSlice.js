import axios from 'axios';

/** Enable for debugging */
const isDebug = false;

/**
 * searchUniversities - Fetches university data based on the query and page parameters.
 *
 * @param {string} query - The search query string used to filter universities.
 * @param {number} page - The page number to fetch from the API endpoint.
 * @returns {Promise<Array>} - A promise that resolves to an array of search results.
 *                            - If no results are found, returns an empty array.
 * @throws {Error} - Throws an error if the request fails.
 */
const searchUniversities = async ({ query, page }) => {
    try {
        const url = `http://127.0.0.1:4000/api/list/university/search?q=${query}&page=${page}`;
        
        isDebug ? console.log(`searchbarSlice/searchUniversities: Attempting to GET ${url}`) : null;
        
        const response = await axios.get(url);

        isDebug ? console.log("searchbarSlice/searchUniversities: Received response", response) : null;

        if (response.data.universities && response.data.universities.length > 0) {
            isDebug ? console.log("searchbarSlice/searchUniversities: Data successfully retrieved", response.data.universities) : null;
            return response.data.universities;
        } else {
            isDebug ? console.log("searchbarSlice/searchUniversities: No data found") : null;
            return [];
        }
    } catch (error) {
        isDebug ? console.error('searchbarSlice/searchUniversities: Error fetching data:', error) : null;
        return [];
    }
};

export { searchUniversities };
