import React from 'react';
import cloudIcon from '../assets/icons/cloud.png';

const WeatherCard = ({ weatherData }) => {
  const temperature = weatherData?.temperature ?? 0;
  const location = weatherData?.location ?? '—';
  const time = weatherData?.time ?? '';
  const date = weatherData?.date ?? '';

  return (
    <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none text-white font-['Roboto',system-ui,-apple-system,'Segoe_UI',Arial,sans-serif]">
      {/* Temperature */}
      <div className="absolute left-5.5 top-35.5 w-21.5 h-18.75 md:left-9.75 md:top-66.75 md:w-40.25 md:h-35.25 lg:left-22.5 lg:top-104.25 lg:w-36 lg:h-31.5 font-normal leading-none tracking-[-0.08em] text-[64px] md:text-[120px] lg:text-[107px]">
        {temperature}°
      </div>

      {/* Location + Time + Icon container - Flexbox for dynamic layout */}
      <div className="absolute left-29.5 top-39.75 md:left-52.5 md:top-76 lg:left-60.25 lg:top-111.25 flex items-start gap-2 md:gap-3 lg:gap-4">

        {/* Location and Time/Date wrapper */}
        <div className="flex flex-col">
          {/* Location - Dynamic font with max-width and shrink */}
          <div
            className="font-normal leading-none max-w-[140px] md:max-w-[220px] lg:max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap"
            style={{
              fontSize: 'clamp(20px, 7vw, 30px)',
            }}
          >
            <span className="md:hidden">{location}</span>
          </div>
          <div
            className="hidden md:block lg:hidden font-normal leading-none max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap"
            style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}
          >
            {location}
          </div>
          <div
            className="hidden lg:block font-normal leading-none max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap"
            style={{ fontSize: 'clamp(32px, 3.5vw, 45px)' }}
          >
            {location}
          </div>

          {/* Time + Date - Added top margin */}
          <div className="mt-2 md:mt-3 lg:mt-3 font-normal leading-none text-[10px] md:text-[16px] lg:text-[13.5px] opacity-90">
            {time}
            {time && date ? ' - ' : ''}
            {date}
          </div>
        </div>

        {/* Weather Icon - Positioned inline with flexbox, maintains gap */}
        <img
          src={cloudIcon}
          alt="Cloud"
          className="w-10 h-10 md:w-13.75 md:h-13.75 lg:w-13 lg:h-13 object-contain flex-shrink-0 mt-1 md:mt-2 lg:mt-2"
        />
      </div>
    </div>
  );
};

export default WeatherCard;