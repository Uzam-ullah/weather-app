import React from 'react'
import heighTemIcon from '../assets/icons/heighTem.png'
import lowTemIcon from '../assets/icons/lowTem.png'
import humadityIcon from '../assets/icons/humadity.png'
import cloudIcon from '../assets/icons/cloud.png'
import windIcon from '../assets/icons/wind.png'
import snowIcon from '../assets/icons/freeze.png'

const WeatherDetails = () => {
  return (
    <div className="fixed z-10 backdrop-blur-[19px] border-[#FFFFFF24] border-t-[5px] left-0 right-0 bottom-0 top-[247px] md:top-[452px] lg:top-0 lg:left-[780px] lg:border-t-0 lg:border-l-[5px]">
      <h2
        className="absolute w-[110px] h-[16px] top-[55px] left-1/2 -translate-x-1/2 md:w-[141px] md:h-[21px] md:top-[107px] md:left-1/2 md:-translate-x-1/2 lg:top-[132px] lg:left-[30px] lg:translate-x-0 text-[14px] md:text-[18px] font-normal not-italic leading-none tracking-normal text-white"
      >
        Weather Details...
      </h2>

      {/* Weather Details Container */}
      <div className="absolute top-[115px] left-1/2 -translate-x-1/2 md:top-[165px] lg:top-[175px] lg:left-[30px] lg:translate-x-0 flex flex-col gap-[40px] md:gap-[45px] lg:gap-[24px]">

        {/* Heading */}
        <h3
          className="text-[16px] md:text-[16px] lg:text-[16px] text-center md:text-center lg:text-left font-medium leading-tight uppercase text-white max-w-[320px] md:max-w-[380px] lg:max-w-[320px]"
        >
          thunderstorm with light drizzle
        </h3>

        {/* Weather Items Container */}
        <div className="flex flex-col gap-[40px] md:gap-[40px] lg:gap-[22px]">

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
                19°
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
                15°
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
                58%
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
                86%
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
                5km/h
              </span>
              <img
                src={windIcon}
                alt="Wind Speed"
                className="w-[24px] h-[24px] md:w-[22px] md:h-[22px] object-contain"
              />
            </div>
          </div>

          {/* Spacer for mobile */}
          <div className="h-[25px] md:h-[30px] lg:h-0"></div>

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
          {/* Sample hourly forecast cards - Only showing first 2 */}
          {[
            { time: '09:00', weather: 'Snow', temp: '19°', icon: snowIcon },
            { time: '09:00', weather: 'Snow', temp: '10°', icon: snowIcon }
          ].slice(0, 2).map((forecast, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-[300px]"
            >
              {/* Left side - Icon and Time/Weather */}
              <div className="flex items-center gap-[12px]">
                {/* Weather Icon */}
                <img
                  src={forecast.icon}
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
                    {forecast.weather}
                  </span>
                </div>
              </div>

              {/* Temperature Value - Right side */}
              <span
                className="text-[20px] font-normal text-white"
              >
                {forecast.temp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeatherDetails;