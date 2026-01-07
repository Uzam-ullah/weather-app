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
    <>
      {/* Error Message Display - Fixed above blur panel on all devices */}
      {error && (
        <div className="fixed z-50 left-1/2 -translate-x-1/2 top-[28vh] md:top-[38vh] lg:top-4 lg:left-[calc(63.5%+((100%-63.5%)/2))] bg-red-500/20 backdrop-blur-sm border border-red-400/50 rounded-lg px-4 py-2">
          <p className="text-red-200 text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="fixed z-10 backdrop-blur-[19px] border-[#FFFFFF24] border-t-[5px] left-0 right-0 bottom-0 top-[33vh] md:top-[43vh] lg:top-0 lg:left-[63.5%] lg:border-t-0 lg:border-l-[5px] overflow-hidden lg:overflow-y-auto">

        {/* Mobile/Tablet Layout - Centered with explicit spacer for visible gap */}
        <div className="lg:hidden flex flex-col items-center h-full pb-0 relative">

          {/* SPACER - Forces visible gap between white border and content */}
          <div className="h-[60px] md:h-[100px] w-full flex-shrink-0"></div>

          {/* Weather Details Title */}
          <h2 className="text-[14px] md:text-[18px] font-normal text-white text-center">
            Weather Details...
          </h2>

          {/* SPACER - Forces visible gap BELOW title */}
          <div className="h-[30px] md:h-[10px] w-full shrink-0"></div>

          {/* Weather condition */}
          <h3 className="text-[14px] md:text-[15px] text-center font-medium uppercase text-white">
            {condition}
          </h3>

          {/* SPACER - Forces visible gap BELOW condition to push items down */}
          <div className="h-[60px] md:h-[100px] w-full shrink-0"></div>

          {/* Weather Items - consistent gaps */}
          <div className="flex flex-col gap-[4vh] md:gap-[4vh] w-[320px] md:w-[380px]">
            {/* Temp Max */}
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-normal text-white">Temp max</span>
              <div className="flex items-center gap-[10px]">
                <span className="text-[16px] font-normal text-white">{tempMax}°</span>
                <img src={heighTemIcon} alt="High Temperature" className="w-[24px] h-[24px] md:w-[22px] md:h-[22px] object-contain" />
              </div>
            </div>

            {/* Temp Min */}
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-normal text-white">Temp min</span>
              <div className="flex items-center gap-[10px]">
                <span className="text-[16px] font-normal text-white">{tempMin}°</span>
                <img src={lowTemIcon} alt="Low Temperature" className="w-[24px] h-[24px] md:w-[22px] md:h-[22px] object-contain" />
              </div>
            </div>

            {/* Humidity */}
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-normal text-white">Humidity</span>
              <div className="flex items-center gap-[10px]">
                <span className="text-[16px] font-normal text-white">{humidity}%</span>
                <img src={humadityIcon} alt="Humidity" className="w-[24px] h-[24px] md:w-[22px] md:h-[22px] object-contain" />
              </div>
            </div>

            {/* Cloudy */}
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-normal text-white">Cloudy</span>
              <div className="flex items-center gap-[10px]">
                <span className="text-[16px] font-normal text-white">{cloudy}%</span>
                <img src={cloudIcon} alt="Cloudiness" className="w-[24px] h-[24px] md:w-[22px] md:h-[22px] object-contain" />
              </div>
            </div>

            {/* Wind */}
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-normal text-white">Wind</span>
              <div className="flex items-center gap-[10px]">
                <span className="text-[16px] font-normal text-white">{wind}km/h</span>
                <img src={windIcon} alt="Wind Speed" className="w-[24px] h-[24px] md:w-[22px] md:h-[22px] object-contain" />
              </div>
            </div>
          </div>

          {/* Bottom Border Line - Absolutely positioned at bottom */}
          <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[320px] md:w-[380px] border-b border-white"></div>
        </div>

        {/* Desktop Layout - Original absolute positioning */}
        <h2
          className="hidden lg:block absolute w-[141px] h-[21px] top-[132px] left-[30px] right-[6%] text-[18px] font-normal not-italic leading-none tracking-normal text-white"
        >
          Weather Details...
        </h2>

        <div className="hidden lg:flex absolute top-[175px] left-[30px] right-[6%] flex-col gap-[24px] pb-[20px]">

          {/* Heading - Weather condition */}
          <h3 className="text-[16px] text-left font-medium leading-snug uppercase text-white max-w-[320px]">
            {condition}
          </h3>

          {/* Weather Items Container */}
          <div className="flex flex-col gap-[22px]">

            {/* Temp Max */}
            <div className="flex items-center justify-between w-[300px]">
              <span className="text-[16px] font-normal text-white">Temp max</span>
              <div className="flex items-center gap-[10px]">
                <span className="text-[16px] font-normal text-white">{tempMax}°</span>
                <img src={heighTemIcon} alt="High Temperature" className="w-[22px] h-[22px] object-contain" />
              </div>
            </div>

            {/* Temp Min */}
            <div className="flex items-center justify-between w-[300px]">
              <span className="text-[16px] font-normal text-white">Temp min</span>
              <div className="flex items-center gap-[10px]">
                <span className="text-[16px] font-normal text-white">{tempMin}°</span>
                <img src={lowTemIcon} alt="Low Temperature" className="w-[22px] h-[22px] object-contain" />
              </div>
            </div>

            {/* Humidity */}
            <div className="flex items-center justify-between w-[300px]">
              <span className="text-[16px] font-normal text-white">Humidity</span>
              <div className="flex items-center gap-[10px]">
                <span className="text-[16px] font-normal text-white">{humidity}%</span>
                <img src={humadityIcon} alt="Humidity" className="w-[22px] h-[22px] object-contain" />
              </div>
            </div>

            {/* Cloudy */}
            <div className="flex items-center justify-between w-[300px]">
              <span className="text-[16px] font-normal text-white">Cloudy</span>
              <div className="flex items-center gap-[10px]">
                <span className="text-[16px] font-normal text-white">{cloudy}%</span>
                <img src={cloudIcon} alt="Cloudiness" className="w-[22px] h-[22px] object-contain" />
              </div>
            </div>

            {/* Wind */}
            <div className="flex items-center justify-between w-[300px]">
              <span className="text-[16px] font-normal text-white">Wind</span>
              <div className="flex items-center gap-[10px]">
                <span className="text-[16px] font-normal text-white">{wind}km/h</span>
                <img src={windIcon} alt="Wind Speed" className="w-[22px] h-[22px] object-contain" />
              </div>
            </div>

            {/* Bottom Border Line */}
            <div className="w-[300px] border-b border-white pb-[10px]" />

          </div>
        </div>

        {/* Hourly Weather Forecast Section - Desktop Only */}
        <div className="hidden lg:block absolute top-[490px] left-[30px] right-[6%]">
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
    </>
  )
}

export default WeatherDetails;