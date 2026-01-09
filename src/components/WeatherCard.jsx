import React from 'react';
import cloudIcon from '../assets/icons/Cloudy.svg';
import rainIcon from '../assets/icons/rain.svg';
import snowIcon from '../assets/icons/freeze1.svg';
import sunIcon from '../assets/icons/sun.png';

// Helper function to get weather icon based on condition
const getWeatherIcon = (condition) => {
  if (!condition) return sunIcon;
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('shower') || conditionLower.includes('thunderstorm')) {
    return rainIcon;
  } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast') || conditionLower.includes('mist') || conditionLower.includes('fog')) {
    return cloudIcon;
  } else if (conditionLower.includes('snow') || conditionLower.includes('sleet') || conditionLower.includes('blizzard') || conditionLower.includes('ice') || conditionLower.includes('frost') || conditionLower.includes('freezing')) {
    return snowIcon;
  } else if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    return sunIcon;
  }
  return sunIcon; // Default to sun icon
};

const WeatherCard = ({ weatherData }) => {
  const temperature = weatherData?.temperature ?? 0;
  const location = weatherData?.location ?? '—';
  const time = weatherData?.time ?? '';
  const date = weatherData?.date ?? '';
  const condition = weatherData?.condition ?? '';
  const weatherIcon = getWeatherIcon(condition);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none text-white font-['Roboto',system-ui,-apple-system,'Segoe_UI',Arial,sans-serif]">
      {/* Mobile/Tablet: Keep original separate positioning */}
      <div className="lg:hidden">
        {/* Temperature */}
        <div className="absolute left-5.5 top-35.5 w-21.5 h-18.75 md:left-9.75 md:top-66.75 md:w-40.25 md:h-35.25 font-normal leading-none tracking-[0.01em] text-[64px] md:text-[120px]">
          {temperature}°
        </div>

        {/* Location + Time + Icon container */}
        <div className="absolute left-29.5 top-39.75 md:left-52.5 md:top-76 flex items-center gap-2 md:gap-3">
          <div className="flex flex-col">
            <div
              className="font-normal leading-none max-w-[140px] md:max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap"
              style={{ fontSize: 'clamp(20px, 7vw, 30px)' }}
            >
              <span className="md:hidden">{location}</span>
            </div>
            <div
              className="hidden md:block font-normal leading-none max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap"
              style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}
            >
              {location}
            </div>
            <div className="mt-2 md:mt-3 font-normal leading-none text-[10px] md:text-[16px] opacity-90">
              {time}
              {time && date ? ' - ' : ''}
              {date}
            </div>
          </div>
          <img
            src={weatherIcon}
            alt="Weather"
            className="w-10 h-10 md:w-13.75 md:h-13.75 object-contain shrink-0 mt-1 md:mt-2"
          />
        </div>
      </div>

      {/* Desktop: Flex container for temperature + location together */}
      <div className="hidden lg:flex absolute left-[5%] bottom-[10%] items-center gap-[clamp(12px,1.5vw,20px)]">
        {/* Temperature */}
        <div className="font-normal leading-none tracking-[0.01em] text-[clamp(80px,8vw,120px)]">
          {temperature}°
        </div>

        {/* Location + Time + Icon */}
        <div className="flex items-center gap-[clamp(12px,1.5vw,20px)]">
          <div className="flex flex-col">
            <div
              className="font-normal leading-none max-w-[clamp(180px,20vw,320px)] overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(32px,3.5vw,50px)]"
            >
              {location}
            </div>
            <div className="mt-[clamp(8px,0.8vw,14px)] font-normal leading-none text-[clamp(11px,1vw,15px)] opacity-90">
              {time}
              {time && date ? ' - ' : ''}
              {date}
            </div>
          </div>
          <img
            src={weatherIcon}
            alt="Weather"
            className="w-[clamp(40px,4vw,56px)] h-[clamp(40px,4vw,56px)] object-contain shrink-0 mt-[clamp(4px,0.5vw,10px)]"
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;