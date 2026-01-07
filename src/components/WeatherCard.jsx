import React from 'react';
import cloudIcon from '../assets/icons/cloud.png';

const WeatherCard = ({ weatherData }) => {
  const temperature = weatherData?.temperature ?? 0;
  const location = weatherData?.location ?? '—';
  const time = weatherData?.time ?? '';
  const date = weatherData?.date ?? '';

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
            src={cloudIcon}
            alt="Cloud"
            className="w-10 h-10 md:w-13.75 md:h-13.75 object-contain shrink-0 mt-1 md:mt-2"
          />
        </div>
      </div>

      {/* Desktop: Flex container for temperature + location together */}
      <div className="hidden lg:flex absolute left-[5%] bottom-[12%] items-center gap-4">
        {/* Temperature */}
        <div className="font-normal leading-none tracking-[0.01em] text-[107px]">
          {temperature}°
        </div>

        {/* Location + Time + Icon */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <div
              className="font-normal leading-none max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap"
              style={{ fontSize: 'clamp(32px, 3.5vw, 45px)' }}
            >
              {location}
            </div>
            <div className="mt-3 font-normal leading-none text-[13.5px] opacity-90">
              {time}
              {time && date ? ' - ' : ''}
              {date}
            </div>
          </div>
          <img
            src={cloudIcon}
            alt="Cloud"
            className="w-13 h-13 object-contain shrink-0 mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;