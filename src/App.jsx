import { useState, useEffect } from 'react';
import './App.css';

import bgCold from './assets/bg-images/bg-desktop.png';    // Cold weather background
import bgRainy from './assets/bg-images/bg-mobile.png';    // Rainy weather background
import bgSunny from './assets/bg-images/bg-tab.png';       // Sunny weather background
import Header from './components/Header.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import WeatherDetails from './components/WeatherDetails.jsx';
import { fetchCurrentWeather, fetchForecast } from './services/weatherService.js';
import { formatDateTime, convertWindSpeed, formatTime, getWeatherCondition, getWeatherBackgroundType } from './utils/helpers.js';

function App() {
  const [city, setCity] = useState('London');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundType, setBackgroundType] = useState('sunny'); // 'cold' | 'sunny' | 'rainy'

  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    location: '—',
    time: '',
    date: '',
    condition: '',
    tempMax: 0,
    tempMin: 0,
    humidity: 0,
    cloudy: 0,
    wind: 0,
  });

  const [forecastData, setForecastData] = useState([]);

  // Auto-clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Fetch weather data for a city
  const handleSearch = async (searchCity) => {
    if (!searchCity.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch current weather from WeatherAPI.com
      const current = await fetchCurrentWeather(searchCity);
      const { time, date } = formatDateTime(current.location.localtime);

      // Fetch forecast for hourly data
      const forecast = await fetchForecast(searchCity);
      const forecastDay = forecast.forecast.forecastday[0];

      setWeatherData({
        temperature: Math.round(current.current.temp_c),
        location: current.location.name,
        time,
        date,
        condition: current.current.condition.text.toUpperCase(),
        tempMax: Math.round(forecastDay.day.maxtemp_c),
        tempMin: Math.round(forecastDay.day.mintemp_c),
        humidity: current.current.humidity,
        cloudy: current.current.cloud,
        wind: convertWindSpeed(current.current.wind_kph),
      });

      // Get hourly forecast - filter to future hours only
      const currentHour = new Date(current.location.localtime).getHours();
      const hourlyData = forecastDay.hour
        .filter(h => new Date(h.time).getHours() >= currentHour)
        .slice(0, 4)
        .map(item => ({
          time: formatTime(item.time),
          temp: Math.round(item.temp_c),
          condition: getWeatherCondition(item.condition.text),
          icon: item.condition.icon,
        }));

      setForecastData(hourlyData);
      setCity(searchCity);
      setSearchInput(''); // Clear search input on success

      // Update background based on weather condition
      setBackgroundType(getWeatherBackgroundType(current.current.condition.text));

    } catch (err) {
      // Set styled error instead of alert
      setError(err.message || 'Location not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load default city on mount
  useEffect(() => {
    handleSearch('London');
  }, []);

  // Handle search submit
  const handleSearchSubmit = () => {
    if (searchInput.trim()) {
      handleSearch(searchInput.trim());
    }
  };

  // Get background image based on weather condition
  const getBackgroundImage = () => {
    switch (backgroundType) {
      case 'cold': return bgCold;
      case 'rainy': return bgRainy;
      case 'sunny':
      default: return bgSunny;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* Weather-based Background - responsive to all screen sizes */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${getBackgroundImage()})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <Header
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        onSearch={handleSearchSubmit}
      />
      <WeatherCard weatherData={weatherData} />
      <WeatherDetails
        weatherData={weatherData}
        forecastData={forecastData}
        error={error}
      />




    </div>
  );
}

export default App;
