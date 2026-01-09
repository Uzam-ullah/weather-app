import React, { useState, useEffect, useRef } from 'react'
import heighTemIcon from '../assets/icons/maxTem.svg'
import lowTemIcon from '../assets/icons/minTem.svg'
import humadityIcon from '../assets/icons/rain.svg'
import cloudIcon from '../assets/icons/Cloudy.svg'
import windIcon from '../assets/icons/wind1.svg'
import snowIcon from '../assets/icons/freeze1.svg'
import sunIcon from '../assets/icons/sun.png'
import search from '../assets/icons/searchIcon.png'
import { searchCities } from '../services/weatherService.js'

// Helper function to get weather icon based on condition
const getWeatherIcon = (condition) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('shower') || conditionLower.includes('thunderstorm')) {
    return humadityIcon;
  } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast') || conditionLower.includes('mist') || conditionLower.includes('fog')) {
    return cloudIcon;
  } else if (conditionLower.includes('snow') || conditionLower.includes('sleet') || conditionLower.includes('blizzard') || conditionLower.includes('ice') || conditionLower.includes('frost') || conditionLower.includes('freezing')) {
    return snowIcon;
  } else if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    return sunIcon;
  }
  return sunIcon; // Default to sun icon
};

const WeatherDetails = ({ weatherData = {}, forecastData = [], error = null, searchInput, onSearchInputChange, onSearch }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Debounced search for suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchInput.length >= 2) {
        setIsLoading(true);
        try {
          const results = await searchCities(searchInput);
          setSuggestions(results);
          setShowSuggestions(results.length > 0);
          setSelectedIndex(-1);
        } catch (err) {
          setSuggestions([]);
          setShowSuggestions(false);
        }
        setIsLoading(false);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelectSuggestion(suggestions[selectedIndex]);
      } else {
        setShowSuggestions(false);
        onSearch();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSelectSuggestion = (suggestion) => {
    onSearchInputChange(suggestion.name);
    setShowSuggestions(false);
    setSuggestions([]);
    // Trigger search with the selected city
    setTimeout(() => {
      onSearch();
    }, 50);
  };
  // Extract values with defaults
  const condition = weatherData.condition || 'LOADING...';
  const tempMax = weatherData.tempMax ?? 0;
  const tempMin = weatherData.tempMin ?? 0;
  const humidity = weatherData.humidity ?? 0;
  const cloudy = weatherData.cloudy ?? 0;
  const wind = weatherData.wind ?? 0;

  const newLocal = "flex items-center gap-2.5"
  return (
    <>
      {/* Error Message Display - Fixed above blur panel on all devices */}
      {error && (
        <div className="fixed z-50 left-1/2 -translate-x-1/2 top-[28vh] md:top-[38vh] lg:top-4 lg:left-[calc(var(--blur-panel-left)+((100%-var(--blur-panel-left))/2))] bg-red-500/20 backdrop-blur-sm border border-red-400/50 rounded-lg px-4 py-2">
          <p className="text-red-200 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Search Section - Responsive (moved from Header) */}
      <div className="relative z-20" ref={dropdownRef}>
        <div
          className="hidden lg:block fixed top-0 left-[calc(var(--blur-panel-left)+0.3125rem)] right-0 h-[14.5vh] z-30 pointer-events-none backdrop-blur-[19px] mask-[linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />

        <div className="absolute top-4.75 right-8 w-31.25 h-5 md:top-3.25 md:right-16 md:w-76.25 md:h-11.25 lg:fixed lg:top-[4.5%] lg:left-[calc(var(--blur-panel-left)+1.875rem)] lg:w-75 lg:min-w-75 lg:max-w-75 lg:h-12.5 lg:z-40 border-b border-white/70">

          {/* Search Input */}
          <input
            ref={inputRef}
            type="search"
            placeholder="Search Location..."
            value={searchInput}
            onChange={(e) => onSearchInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            className="absolute top-0.5 left-0 w-28.5 h-3.5 md:w-full md:h-11.25 md:top-0 lg:top-3.5 lg:w-full lg:h-5.75 pr-10 bg-transparent outline-none text-white/70 placeholder:text-white/70 font-roboto font-normal text-[0.625rem] md:text-[1.125rem] lg:text-[1.25rem] leading-[100%]"
          />

          {/* Search Icon */}
          <img
            src={search}
            alt="Search"
            onClick={() => {
              setShowSuggestions(false);
              onSearch();
            }}
            className="absolute top-1 right-0 w-3 h-2.75 md:top-4.5 md:right-2 md:w-5.5 md:h-5.25 lg:top-2.25 lg:right-2 lg:w-7 lg:h-7 object-contain cursor-pointer"
          />
        </div>

        {/* Autocomplete Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-10 right-8 w-31.25 md:top-14 md:right-16 md:w-76.25 lg:fixed lg:top-[10.7%] lg:left-[calc(var(--blur-panel-left)+1.875rem)] lg:w-75 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg shadow-lg overflow-hidden z-50">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.id}
                onClick={() => handleSelectSuggestion(suggestion)}
                className={`px-3 py-2 md:px-4 md:py-3 cursor-pointer transition-colors duration-150 
                  ${index === selectedIndex
                    ? 'bg-white/20'
                    : 'hover:bg-white/10'
                  }
                  ${index !== suggestions.length - 1 ? 'border-b border-white/10' : ''}
                `}
              >
                <p className="text-white text-[0.625rem] md:text-[0.875rem] lg:text-[1rem] font-medium truncate">
                  {suggestion.name}
                </p>
                <p className="text-white/60 text-[0.5rem] md:text-[0.75rem] lg:text-[0.8125rem] truncate">
                  {suggestion.region ? `${suggestion.region}, ` : ''}{suggestion.country}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed z-10 backdrop-blur-[19px] border-[#FFFFFF24] border-t-[5px] left-0 right-0 bottom-0 top-[33vh] md:top-[43vh] lg:top-0 lg:left-[var(--blur-panel-left)] lg:border-t-0 lg:border-l-[5px] overflow-hidden lg:overflow-y-auto">

        {/* Mobile/Tablet Layout - Centered with explicit spacer for visible gap */}
        <div className="lg:hidden flex flex-col items-center h-full pb-0 relative">

          {/* SPACER - Forces visible gap between white border and content */}
          <div className="h-[8vh] md:h-[10vh] w-full shrink-0"></div>

          {/* Weather Details Title */}
          <h2 className="text-[0.875rem] md:text-[1.125rem] font-normal text-white text-center">
            Weather Details...
          </h2>

          {/* SPACER - Forces visible gap BELOW title */}
          <div className="h-[3vh] md:h-[1vh] w-full shrink-0"></div>

          {/* Weather condition */}
          <h3 className="text-[0.875rem] md:text-[0.9375rem] text-center font-medium uppercase text-white">
            {condition}
          </h3>

          {/* SPACER - Forces visible gap BELOW condition to push items down */}
          <div className="h-[8vh] md:h-[10vh] w-full shrink-0"></div>

          {/* Weather Items - consistent gaps */}
          <div className="flex flex-col gap-[4vh] md:gap-[4vh] w-[85%] max-w-[20rem] md:max-w-95">
            {/* Temp Max */}
            <div className="flex items-center justify-between">
              <span className="text-[1rem] font-normal text-white">Temp max</span>
              <div className="flex items-center gap-2.5">
                <span className="text-[1rem] font-normal text-white">{tempMax}°</span>
                <img src={heighTemIcon} alt="High Temperature" className="w-6 h-6 md:w-5.5 md:h-5.5 object-contain" />
              </div>
            </div>

            {/* Temp Min */}
            <div className="flex items-center justify-between">
              <span className="text-[1rem] font-normal text-white">Temp min</span>
              <div className="flex items-center gap-2.5">
                <span className="text-[1rem] font-normal text-white">{tempMin}°</span>
                <img src={lowTemIcon} alt="Low Temperature" className="w-6 h-6 md:w-5.5 md:h-5.5 object-contain" />
              </div>
            </div>

            {/* Humidity */}
            <div className="flex items-center justify-between">
              <span className="text-[1rem] font-normal text-white">Humidity</span>
              <div className={newLocal}>
                <span className="text-[1rem] font-normal text-white">{humidity}%</span>
                <img src={humadityIcon} alt="Humidity" className="w-6 h-6 md:w-5.5 md:h-5.5 object-contain" />
              </div>
            </div>

            {/* Cloudy */}
            <div className="flex items-center justify-between">
              <span className="text-[1rem] font-normal text-white">Cloudy</span>
              <div className="flex items-center gap-2.5">
                <span className="text-[1rem] font-normal text-white">{cloudy}%</span>
                <img src={cloudIcon} alt="Cloudiness" className="w-6 h-6 md:w-5.5 md:h-5.5 object-contain" />
              </div>
            </div>

            {/* Wind */}
            <div className="flex items-center justify-between">
              <span className="text-[1rem] font-normal text-white">Wind</span>
              <div className="flex items-center gap-2.5">
                <span className="text-[1rem] font-normal text-white">{wind}km/h</span>
                <img src={windIcon} alt="Wind Speed" className="w-6 h-6 md:w-5.5 md:h-5.5 object-contain" />
              </div>
            </div>
          </div>

          {/* Bottom Border Line - Absolutely positioned at bottom */}
          <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[85%] max-w-[20rem] md:max-w-95 border-b border-white"></div>
        </div>

        {/* Desktop Layout - Flexbox with clear vertical margins */}
        <div className="hidden lg:flex absolute top-[16%] left-[5.7%] min-w-[57%] flex-col gap-9 pt-10">

          {/* Weather Details Heading - with margin bottom */}
          <h2 className="text-[0.875rem] font-normal not-italic leading-none tracking-normal text-white mb-7">
            Weather Details...
          </h2>

          {/* Weather Condition - with margin bottom */}
          <h3 className="text-[0.875rem] text-left font-medium leading-snug uppercase text-white max-w-[20rem] mb-5">
            {condition}
          </h3>

          {/* Weather Items Container */}
          <div className="flex flex-col gap-5.5">

            {/* Temp Max */}
            <div className="flex items-center justify-between w-[57%] min-w-75">
              <span className="text-[1rem] font-normal text-white/80">Temp max</span>
              <div className="flex items-center gap-2.5">
                <span className="text-[1rem] font-normal text-white">{tempMax}°</span>
                <img src={heighTemIcon} alt="High Temperature" className="w-5.5 h-5.5 object-contain" />
              </div>
            </div>

            {/* Temp Min */}
            <div className="flex items-center justify-between w-[57%] min-w-75">
              <span className="text-[1rem] font-normal text-white/80">Temp min</span>
              <div className="flex items-center gap-2.5">
                <span className="text-[1rem] font-normal text-white">{tempMin}°</span>
                <img src={lowTemIcon} alt="Low Temperature" className="w-5.5 h-5.5 object-contain" />
              </div>
            </div>

            {/* Humidity */}
            <div className="flex items-center justify-between w-[57%] min-w-75">
              <span className="text-[1rem] font-normal text-white/80">Humidity</span>
              <div className="flex items-center gap-2.5">
                <span className="text-[1rem] font-normal text-white">{humidity}%</span>
                <img src={humadityIcon} alt="Humidity" className="w-5.5 h-5.5 object-contain" />
              </div>
            </div>

            {/* Cloudy */}
            <div className="flex items-center justify-between w-[57%] min-w-75">
              <span className="text-[1rem] font-normal text-white/80">Cloudy</span>
              <div className="flex items-center gap-2.5">
                <span className="text-[1rem] font-normal text-white">{cloudy}%</span>
                <img src={cloudIcon} alt="Cloudiness" className="w-5.5 h-5.5 object-contain" />
              </div>
            </div>

            {/* Wind */}
            <div className="flex items-center justify-between w-[57%] min-w-75">
              <span className="text-[1rem] font-normal text-white/80">Wind</span>
              <div className="flex items-center gap-2.5">
                <span className="text-[1rem] font-normal text-white">{wind}km/h</span>
                <img src={windIcon} alt="Wind Speed" className="w-5.5 h-5.5 object-contain" />
              </div>
            </div>
          </div>

          {/* Divider Line - with margin top and bottom */}
          <div className="w-[57%] min-w-75 border-b border-white my-7" />

          {/* Today's Weather Forecast Heading - with margin bottom */}
          <h3 className="text-[0.875rem] font-normal not-italic leading-none tracking-normal text-white opacity-80 mb-5">
            Today's Weather Forecast...
          </h3>

          {/* Hourly Forecast Cards Container */}
          <div className="flex flex-col gap-4">
            {/* Map forecast data to cards */}
            {forecastData.slice(0, 8).map((forecast, index) => (
              <div
                key={index}
                className="flex items-center justify-between w-[57%] min-w-75"
              >
                {/* Left side - Icon and Time/Weather */}
                <div className="flex items-center gap-3">
                  {/* Weather Icon */}
                  <img
                    src={getWeatherIcon(forecast.condition)}
                    alt={`Weather at ${forecast.time}`}
                    className="w-5.5 h-5.5 object-contain opacity-90"
                  />

                  {/* Time and Weather Type stacked */}
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="text-[0.875rem] font-normal text-white opacity-80"
                    >
                      {forecast.time}
                    </span>
                    <span
                      className="text-[0.875rem] font-normal text-white opacity-80"
                    >
                      {forecast.condition}
                    </span>
                  </div>
                </div>

                {/* Temperature Value - Right side */}
                <span
                  className="text-[1.25rem] font-normal text-white"
                >
                  {forecast.temp}°
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default WeatherDetails;
