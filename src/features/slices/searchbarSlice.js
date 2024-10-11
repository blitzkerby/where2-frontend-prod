/**
 * searchUniversities - Fetches university data based on the query and page parameters.
 *
 * @param {string} query - The search query string used to filter universities.
 * @param {string} page - The page type to search within the API endpoint.
 * @returns {Promise<Array>} - A promise that resolves to an array of search results.
 *                            - If the response contains multiple results, they are returned as-is.
 *                            - If there is a single result, it is returned wrapped in an array.
 *                            - If no results are found, returns an array with a "No results found" string.
 * @throws {Error} - Throws an error if the request fails.
 */

import axios from 'axios';

const searchUniversities = async (query , page) => {
    try {
        const response = await axios.get(`http://127.0.0.1:4000/api/${page}/search?page=${1}&q=${query}`)
        // const response = await axios.get(`http://127.0.0.1:4000/api/university/search?page=1&q=stanford`)
        console.log(response.data.universities)
        return response.data.universities
    } catch (error) {
        console.error('Error fetching data:', error);
        return ["No results found"]
    }
};

export { searchUniversities };
