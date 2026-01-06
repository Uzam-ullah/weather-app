// Weather service for WeatherAPI.com API calls

const API_KEY = '69e7bf90b4f640caa44100750260601';
const BASE_URL = 'https://api.weatherapi.com/v1';

/**
 * Fetch current weather for a city
 * @param {string} city - City name
 * @returns {Promise<Object>} - Weather data
 */
export async function fetchCurrentWeather(city) {
  const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error?.message || `City "${city}" not found`);
  }

  return data;
}

/**
 * Fetch weather forecast for a city
 * @param {string} city - City name
 * @returns {Promise<Object>} - Forecast data
 */
export async function fetchForecast(city) {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=1`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error?.message || `City "${city}" not found`);
  }

  return data;
}
