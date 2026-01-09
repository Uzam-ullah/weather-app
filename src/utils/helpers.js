// Helper functions for WeatherAPI.com

/**
 * Format localtime string to "HH:MM" and "Day, D Mon YY" format
 * @param {string} localtime - LocalTime from API (e.g., "2026-01-06 15:00")
 * @returns {Object} - { time: "HH:MM", date: "Day, D Mon YY" }
 */
export function formatDateTime(localtime) {
  const date = new Date(localtime);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);

  const dateStr = `${dayName}, ${day} ${month} ${year}`;

  return { time, date: dateStr };
}

/**
 * Format time string to "HH:MM" format
 * @param {string} timeStr - Time from API (e.g., "2026-01-06 09:00")
 * @returns {string} - "HH:MM"
 */
export function formatTime(timeStr) {
  const date = new Date(timeStr);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Wind speed is already in km/h from WeatherAPI.com
 * @param {number} kph - Speed in km/h
 * @returns {number} - Speed in km/h (rounded)
 */
export function convertWindSpeed(kph) {
  return Math.round(kph);
}

/**
 * Get weather condition name from condition text
 * @param {string} conditionText - Condition text from API
 * @returns {string} - Simplified weather condition
 */
export function getWeatherCondition(conditionText) {
  const text = conditionText.toLowerCase();

  if (text.includes('snow') || text.includes('sleet') || text.includes('blizzard')) {
    return 'Snow';
  } else if (text.includes('rain') || text.includes('drizzle') || text.includes('shower')) {
    return 'Rain';
  } else if (text.includes('thunder')) {
    return 'Thunderstorm';
  } else if (text.includes('cloud') || text.includes('overcast')) {
    return 'Clouds';
  } else if (text.includes('fog') || text.includes('mist')) {
    return 'Mist';
  } else if (text.includes('clear') || text.includes('sunny')) {
    return 'Clear';
  }

  return conditionText;
}

/**
 * Get background type based on weather condition
 * @param {string} conditionText - Condition text from API
 * @returns {string} - 'cold' | 'sunny' | 'rainy' | 'cloudy'
 */
export function getWeatherBackgroundType(conditionText) {
  const text = conditionText.toLowerCase();

  // Cold weather conditions
  if (text.includes('snow') || text.includes('sleet') || text.includes('blizzard') ||
    text.includes('ice') || text.includes('frost') || text.includes('freezing')) {
    return 'cold';
  }

  // Rainy weather conditions
  if (text.includes('rain') || text.includes('drizzle') || text.includes('shower') ||
    text.includes('thunder') || text.includes('storm')) {
    return 'rainy';
  }

  // Cloudy weather conditions
  if (text.includes('cloud') || text.includes('overcast') || text.includes('mist') || text.includes('fog')) {
    return 'cloudy';
  }

  // Sunny weather conditions (clear, sunny)
  return 'sunny';
}
