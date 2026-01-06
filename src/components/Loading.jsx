import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4"></div>
        <p className="text-white text-xl font-medium">Loading weather data...</p>
      </div>
    </div>
  );
};

export default Loading;
