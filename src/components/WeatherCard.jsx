import React from 'react';
import cloudIcon from '../assets/icons/cloud.png';

const WeatherCard = ({ weatherData }) => {
  const temperature = weatherData?.temperature ?? 0;
  const location = weatherData?.location ?? '—';
  const time = weatherData?.time ?? '';
  const date = weatherData?.date ?? '';

  return (
    <div className="weather-card text-white font-['Roboto']">
      {/* Temperature */}
      <div className="absolute left-5.5 top-35.5 w-21.5 h-18.75 md:left-9.75 md:top-66.75 md:w-40.25 md:h-35.25 lg:left-22.5 lg:top-104.25 lg:w-36 lg:h-31.5 weather-temp text-[64px] md:text-[120px] lg:text-[107px]">
        {temperature}°
      </div>

      {/* Location + Time container */}
      <div className="absolute left-29.5 top-39.75 w-34.75 h-10 md:left-52.5 md:top-76 md:w-47.25 md:h-16.75 lg:left-60.25 lg:top-111.25 lg:w-42.5 lg:h-17.5">
        {/* Location */}
        <div className="absolute left-0 top-0 w-34.75 h-[25.2174px] md:w-47.25 md:h-[53.011px] lg:w-42.5 lg:h-13.5 weather-location text-[30px] md:text-[48px] lg:text-[45px]">
          {location}
        </div>

        {/* Time + Date */}
        <div className="absolute left-0 top-[31.3px] md:left-[4.11px] md:top-13.25 lg:left-1 lg:top-13.5 w-34.75 h-[8.6957px] md:w-[184.8913px] md:h-3.5 lg:w-38.25 lg:h-4 weather-time text-[10px] md:text-[16px] lg:text-[13.5px]">
          {time}
          {time && date ? ' - ' : ''}
          {date}
        </div>
      </div>

      {/* Weather Icon */}
      <img
        src={cloudIcon}
        alt="Cloud"
        className="absolute left-59.25 top-40.25 w-10 h-10 md:left-103.5 md:top-79.25 md:w-13.75 md:h-13.75 lg:left-104.75 lg:top-115.75 lg:w-13 lg:h-13 object-contain"
      />
    </div>
  );
};

export default WeatherCard;