import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://api.example.com",
    headers: {
        'Authorization': 'Bearer YOUR_API_TOKEN',
        'Content-Type': 'application/json'
    }
})

export default apiClient;