import axios from 'axios';

class NasaAPI {
    constructor() {
        this.apiKey = process.env.NASA_API_KEY;
        this.baseURL = 'https://api.nasa.gov';
    }

    async getPlanetaryData() {
        try {
            const response = await axios.get(
                `${this.baseURL}/planetary/apod?api_key=${this.apiKey}`
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching planetary data:', error);
            throw error;
        }
    }

    async getAsteroidData() {
        try {
            const response = await axios.get(
                `${this.baseURL}/neo/rest/v1/feed?api_key=${this.apiKey}`
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching asteroid data:', error);
            throw error;
        }
    }
}