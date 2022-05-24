import React from 'react'

const WeatherBox = ({weather}) => {
    console.log("weather: ",weather)
  return (
    <div className='weather-box'>
      <h2>{weather?.name}</h2>
      <h1>
        {weather?.main.temp}°C / {weather?.main.temp * 1.8 + 32}°F
      </h1>
      <h2>{weather?.weather[0].description}</h2>
    </div>
  );
}

export default WeatherBox