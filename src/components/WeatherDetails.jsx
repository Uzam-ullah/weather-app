import React from 'react'
import heighTemIcon from '../assets/icons/heighTem.png'
import lowTemIcon from '../assets/icons/lowTem.png'
import humadityIcon from '../assets/icons/humadity.png'
import cloudIcon from '../assets/icons/cloud.png'
import windIcon from '../assets/icons/wind.png'
import snowIcon from '../assets/icons/freeze.png'

const WeatherDetails = ({ weatherData = {}, forecastData = [], error = null }) => {
  // Extract values with defaults
  const condition = weatherData.condition || 'LOADING...';
  const tempMax = weatherData.tempMax ?? 0;
  const tempMin = weatherData.tempMin ?? 0;
  const humidity = weatherData.humidity ?? 0;
  const cloudy = weatherData.cloudy ?? 0;
  const wind = weatherData.wind ?? 0;

  return (
    <div className="fixed z-10 backdrop-blur-[19px] border-[#FFFFFF24] border-t-[5px] left-0 right-0 bottom-0 top-[247px] md:top-[452px] lg:top-0 lg:left-[780px] lg:border-t-0 lg:border-l-[5px] overflow-y-auto">

      {/* Error Message Display */}
      {error && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 lg:left-[30px] lg:translate-x-0 bg-red-500/20 backdrop-blur-sm border border-red-400/50 rounded-lg px-4 py-2 z-20">
          <p className="text-red-200 text-sm font-medium">{error}</p>
        </div>
      )}

      <h2
        className="absolute w-[110px] h-[16px] top-[55px] left-1/2 -translate-x-1/2 md:w-[141px] md:h-[21px] md:top-[107px] md:left-1/2 md:-translate-x-1/2 lg:top-[132px] lg:left-[30px] lg:translate-x-0 text-[14px] md:text-[18px] font-normal not-italic leading-none tracking-normal text-white"
      >
        Weather Details...
      </h2>

      {/* Weather Details Container - Now with relative positioning for scroll */}
      <div className="absolute top-[115px] left-1/2 -translate-x-1/2 md:top-[165px] lg:top-[175px] lg:left-[30px] lg:translate-x-0 flex flex-col gap-[25px] md:gap-[30px] lg:gap-[24px] pb-[20px]">

        {/* Heading - Weather condition with word-wrap for long descriptions */}
        <h3
          className="text-[14px] md:text-[15px] lg:text-[16px] text-center md:text-center lg:text-left font-medium leading-snug uppercase text-white max-w-[320px] md:max-w-[380px] lg:max-w-[320px] break-words"
        >
          {condition}
        </h3>

        {/* Weather Items Container - Reduced gaps for shorter screens */}
        <div className="flex flex-col gap-[25px] md:gap-[30px] lg:gap-[22px]">

          {/* Temp Max */}
          <div className="flex items-center justify-between w-[320px] md:w-[380px] lg:w-[300px]">
            <span
              className="text-[16px] md:text-[16px] font-normal text-white"
            >
              Temp max
            </span>
            <div className="flex items-center gap-[10px] md:gap-[10px]">
              <span
                className="text-[16px] md:text-[16px] font-normal text-white"
              >
                {tempMax}°
              </span>
              <img
                src={heighTemIcon}
                alt="High Temperature"
                className="w-[24px] h-[24px] md:w-[22px] md:h-[22px] object-contain"
              />
            </div>
          </div>

          {/* Temp Min */}
          <div className="flex items-center justify-between w-[320px] md:w-[380px] lg:w-[300px]">
            <span
              className="text-[16px] md:text-[16px] font-normal text-white"
            >
              Temp min
            </span>
            <div className="flex items-center gap-[10px] md:gap-[10px]">
              <span
                className="text-[16px] md:text-[16px] font-normal text-white"
              >
                {tempMin}°
              </span>
              <img
                src={lowTemIcon}
                alt="Low Temperature"
                className="w-[24px] h-[24px] md:w-[22px] md:h-[22px] object-contain"
              />
            </div>
          </div>

          {/* Humidity */}
          <div className="flex items-center justify-between w-[320px] md:w-[380px] lg:w-[300px]">
            <span
              className="text-[16px] md:text-[16px] font-normal text-white"
            >
              Humidity
            </span>
            <div className="flex items-center gap-[10px] md:gap-[10px]">
              <span
                className="text-[16px] md:text-[16px] font-normal text-white"
              >
                {humidity}%
              </span>
              <img
                src={humadityIcon}
                alt="Humidity"
                className="w-[24px] h-[24px] md:w-[22px] md:h-[22px] object-contain"
              />
            </div>
          </div>

          {/* Cloudy */}
          <div className="flex items-center justify-between w-[320px] md:w-[380px] lg:w-[300px]">
            <span
              className="text-[16px] md:text-[16px] font-normal text-white"
            >
              Cloudy
            </span>
            <div className="flex items-center gap-[10px] md:gap-[10px]">
              <span
                className="text-[16px] md:text-[16px] font-normal text-white"
              >
                {cloudy}%
              </span>
              <img
                src={cloudIcon}
                alt="Cloudiness"
                className="w-[24px] h-[24px] md:w-[22px] md:h-[22px] object-contain"
              />
            </div>
          </div>

          {/* Wind */}
          <div className="flex items-center justify-between w-[320px] md:w-[380px] lg:w-[300px]">
            <span
              className="text-[16px] md:text-[16px] font-normal text-white"
            >
              Wind
            </span>
            <div className="flex items-center gap-[10px] md:gap-[10px]">
              <span
                className="text-[16px] md:text-[16px] font-normal text-white"
              >
                {wind}km/h
              </span>
              <img
                src={windIcon}
                alt="Wind Speed"
                className="w-[24px] h-[24px] md:w-[22px] md:h-[22px] object-contain"
              />
            </div>
          </div>

          {/* Spacer for mobile - Reduced */}
          <div className="h-[15px] md:h-[20px] lg:h-0"></div>

          {/* Bottom Border Line */}
          <div
            className="w-[320px] md:w-[380px] lg:w-[300px] border-b border-white pb-[10px]"
          />

        </div>
      </div>

      {/* Hourly Weather Forecast Section - Desktop Only */}
      <div className="hidden lg:block absolute top-[490px] left-[30px]">
        {/* Heading */}
        <h3
          className="text-[14px] font-normal not-italic leading-none tracking-normal text-white opacity-80"
        >
          Today's Weather Forecast...
        </h3>

        {/* Spacer */}
        <div className="h-[20px]"></div>

        {/* Hourly Forecast Cards Container */}
        <div className="flex flex-col gap-[12px]">
          {/* Map forecast data to cards */}
          {forecastData.slice(0, 8).map((forecast, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-[300px]"
            >
              {/* Left side - Icon and Time/Weather */}
              <div className="flex items-center gap-[12px]">
                {/* Weather Icon */}
                <img
                  src={snowIcon}
                  alt={`Weather at ${forecast.time}`}
                  className="w-[40px] h-[40px] object-contain opacity-90"
                />

                {/* Time and Weather Type stacked */}
                <div className="flex flex-col gap-[2px]">
                  <span
                    className="text-[14px] font-normal text-white opacity-80"
                  >
                    {forecast.time}
                  </span>
                  <span
                    className="text-[14px] font-normal text-white opacity-80"
                  >
                    {forecast.condition}
                  </span>
                </div>
              </div>

              {/* Temperature Value - Right side */}
              <span
                className="text-[20px] font-normal text-white"
              >
                {forecast.temp}°
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeatherDetails;