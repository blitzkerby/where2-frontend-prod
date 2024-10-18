import axios from 'axios';
import config from '../../config';

export async function filterByLocation({ location, page }) {
    try {
        const response = await axios.get(`${config.universities.getAllUniversity}?page=${page}&location=${location}`);
        
        const { list, pagination: { totalPages } = {} } = response.data;

        return { list, totalPages: totalPages || 1 };
    } catch (error) {
        console.error("Error fetching filtered data:", error);
        return { list: [], totalPages: 1 };
    }
}
