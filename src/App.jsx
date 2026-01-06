import { useState } from 'react';
import './App.css';

import bgDesktop from './assets/bg-images/bg-desktop.png';
import bgMobile from './assets/bg-images/bg-mobile.png';
import bgTablet from './assets/bg-images/bg-tab.png';
import Header from './components/Header.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import WeatherDetails from './components/WeatherDetails.jsx';

function App() {
  const [weatherData] = useState({
    temperature: 16,
    location: 'London',
    time: '06:05',
    date: 'Monday, 6 Sep 25',
    condition: 'THUNDERSTORM WITH LIGHT DRIZZLE',
    tempMax: 19,
    tempMin: 10,
    humidity: 58,
    cloudy: 86,
    wind: 5,
    forecast: [
      { time: '09:00', temp: 19, condition: 'Snow' },
      { time: '09:00', temp: 19, condition: 'Snow' },
    ]
  });

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      
      {/* Mobile Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: `url(${bgMobile})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Tablet Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block lg:hidden"
        style={{ backgroundImage: `url(${bgTablet})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Desktop Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden lg:block"
        style={{ backgroundImage: `url(${bgDesktop})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      <Header />
      <WeatherCard weatherData={weatherData} />
      <WeatherDetails />
      

      
           
    </div>
  );
}

export default App;
