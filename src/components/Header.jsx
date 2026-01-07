import React, { useState, useEffect, useRef } from 'react'
import logo from '../assets/icons/logo1.png';
import logo2 from '../assets/icons/logo2.png';
import logo3 from '../assets/icons/logo3.png';
import search from '../assets/icons/searchIcon.png';
import { searchCities } from '../services/weatherService.js';

const Header = ({ searchInput, onSearchInputChange, onSearch }) => {
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

  return (
    <div className="relative z-20">
      {/* Logo Section - Responsive */}
      <div className="absolute top-4 left-4 md:top-6.25 md:left-9.75 lg:top-10 lg:left-30.25">
        <div className="relative w-15 h-7.75 md:w-15 md:h-[31.37px] lg:w-[89.89px] lg:h-11.75">
          {/* Logo 1 */}
          <img
            src={logo}
            alt="Logo 1"
            className="absolute top-0.5 left-0 w-6.75 h-6 md:top-[2.02px] md:w-[27.38px] md:h-[24.44px] lg:top-0.75 lg:w-10.25 lg:h-[36.62px] object-contain"
          />

          {/* Logo 2 */}
          <img
            src={logo2}
            alt="Logo 2"
            className="absolute top-0.5 left-6 w-5 h-6 md:top-[2.02px] md:left-[23.91px] md:w-[20.31px] md:h-[24.40px] lg:top-0.75 lg:left-[35.82px] lg:w-[30.42px] lg:h-[36.55px] object-contain"
          />

          {/* Logo 3 with color */}
          <div
            className="absolute top-0 left-9 w-3.75 h-6.75 md:top-0 md:left-[36.61px] md:w-[15.56px] md:h-[27.94px] lg:left-[54.84px] lg:w-[23.32px] lg:h-[41.86px] rotate-12 origin-bottom-left bg-[#F5BD52]"
            style={{
              WebkitMaskImage: `url(${logo3})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: `url(${logo3})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center'
            }}
          />
        </div>
      </div>

      {/* Search Section - Responsive */}
      <div className="relative" ref={dropdownRef}>
        {/* Desktop Only: Seamless mask using same blur as WeatherDetails (19px) - blends naturally */}
        <div
          className="hidden lg:block fixed top-0 left-[calc(780px+5px)] right-0 h-[130px] z-30 pointer-events-none backdrop-blur-[19px] mask-[linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />

        <div className="absolute top-4.75 right-8 w-31.25 h-5 md:top-3.25 md:right-16 md:w-76.25 md:h-11.25 lg:top-10.25 lg:right-24 lg:w-92.75 lg:h-12.5 lg:z-40 border-b border-white/70">

          {/* Search Input */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Location..."
            value={searchInput}
            onChange={(e) => onSearchInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            className="absolute top-0.5 left-0 w-28.5 h-3.5 md:w-full md:h-11.25 md:top-0 lg:top-3.5 lg:w-full lg:h-5.75 pr-10 bg-transparent outline-none text-white/70 placeholder:text-white/70 font-roboto font-normal text-[10px] md:text-[18px] lg:text-[20px] leading-[100%]"
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
          <div className="absolute top-10 right-8 w-31.25 md:top-14 md:right-16 md:w-76.25 lg:top-24 lg:right-24 lg:w-92.75 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg shadow-lg overflow-hidden z-50">
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
                <p className="text-white text-[10px] md:text-[14px] lg:text-[16px] font-medium truncate">
                  {suggestion.name}
                </p>
                <p className="text-white/60 text-[8px] md:text-[12px] lg:text-[13px] truncate">
                  {suggestion.region ? `${suggestion.region}, ` : ''}{suggestion.country}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Header;