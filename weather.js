// OpenWeatherMap API configuration
const WEATHER_API_KEY = 'c4632569d3e2437e97d51417252802';
const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1/current.json';

// Cache weather data to avoid excessive API calls
const weatherCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

// Get coordinates for major cities
const cityCoordinates = new Map([
    ['America/New_York', { lat: 40.7128, lon: -74.0060 }], // New York
    ['Europe/London', { lat: 51.5074, lon: -0.1278 }], // London
    ['Asia/Tokyo', { lat: 35.6762, lon: 139.6503 }], // Tokyo
    ['Australia/Sydney', { lat: -33.8688, lon: 151.2093 }], // Sydney
    ['Asia/Kolkata', { lat: 22.5726, lon: 88.3639 }], // Kolkata
    // Add more cities as needed
]);

async function fetchWeatherData(timezone) {
    try {
        // Check cache first
        const cachedData = weatherCache.get(timezone);
        if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_DURATION) {
            return cachedData.data;
        }

        // Get coordinates for the timezone
        const coords = cityCoordinates.get(timezone);
        if (!coords) return null;

        // Fetch weather data
        const response = await fetch(
            `${WEATHER_API_BASE_URL}?key=${WEATHER_API_KEY}&q=${coords.lat},${coords.lon}&aqi=no`
        );

        if (!response.ok) {
            throw new Error('Weather API request failed');
        }

        const data = await response.json();
        
        // Process the weather data
        const weatherData = {
            temp: Math.round(data.current.temp_c),
            description: data.current.condition.text,
            icon: data.current.condition.icon,
            timestamp: Date.now()
        };

        // Update cache
        weatherCache.set(timezone, {
            data: weatherData,
            timestamp: Date.now()
        });

        return weatherData;
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
}

async function getCoordinatesForTimezone(timezone) {
    // This is a simplified version. In a production environment,
    // you would want to use a more comprehensive geocoding service
    const defaultCoords = { lat: 0, lon: 0 };
    return cityCoordinates.get(timezone) || defaultCoords;
}

async function updateWeatherForCard(card, timezone) {
    const weatherData = await fetchWeatherData(timezone);
    if (!weatherData) return;

    const weatherContainer = card.querySelector('.weather-container');
    if (weatherContainer) {
        weatherContainer.innerHTML = `
            <img src="${weatherData.icon}" 
                 alt="${weatherData.description}" 
                 class="weather-icon" />
            <span class="weather-temp">${weatherData.temp}°C</span>
            <span class="weather-desc">${weatherData.description}</span>
        `;
    }
}

// Export functions for use in main script
window.WeatherService = {
    fetchWeatherData,
    updateWeatherForCard
}; 