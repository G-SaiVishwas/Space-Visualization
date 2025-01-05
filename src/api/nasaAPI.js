class NasaAPI {
    constructor() {
        this.apiKey = import.meta.env.VITE_NASA_API_KEY;
        this.baseURL = 'https://api.nasa.gov';
    }

    async getPlanetaryData() {
        try {
            // Get data from NASA's APIs
            const [apodResponse, neoResponse] = await Promise.all([
                fetch(`${this.baseURL}/planetary/apod?api_key=${this.apiKey}`),
                fetch(`${this.baseURL}/neo/rest/v1/feed?api_key=${this.apiKey}`)
            ]);

            const apodData = await apodResponse.json();
            const neoData = await neoResponse.json();

            return { apodData, neoData };
        } catch (error) {
            console.error('Error fetching NASA data:', error);
            throw error;
        }
    }

    async getPlanetImages() {
        try {
            // Using NASA's Images API
            const response = await fetch(
                `https://images-api.nasa.gov/search?q=planets&media_type=image`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching planet images:', error);
            throw error;
        }
    }
}

export default NasaAPI;