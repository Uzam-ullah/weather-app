import React from 'react';
import freeze from '../assets/icons/freeze.png';

const ForecastList = ({ forecast }) => {
  return (
    <div>
      <h3 className="text-white/70 text-sm font-medium mb-4">Today's Weather Forecast...</h3>
      <div className="flex gap-4">
        {forecast.map((item, index) => (
          <div 
            key={index}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex items-center gap-4 min-w-45"
          >
            <img src={freeze} alt={item.condition} className="w-10 h-10" />
            <div>
              <p className="text-white/70 text-xs mb-1">{item.time}</p>
              <p className="text-white/60 text-xs mb-2">{item.condition}</p>
              <p className="text-white font-semibold text-lg">{item.temp}°</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastList;
