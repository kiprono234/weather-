import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherProvider";

const WeatherCard = () => {
  const { weather, loading, error } = useContext(WeatherContext);

  if (loading) return <div className="weather-card">Loading...</div>;
  if (error) return <div className="weather-card error">{error}</div>;
  if (!weather) return <div className="weather-card">No weather data yet.</div>;

  const iconUrl =
    weather.weather && weather.weather[0]
      ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
      : "";

  return (
    <div className="weather-card">
      <div className="weather-main">
        {iconUrl && <img src={iconUrl} alt={weather.weather[0].description} className="weather-icon main" />}
        <div className="temp-row">
          <span className="temp">{Math.round(weather.main.temp)}</span>
          <span className="deg">℃</span>
        </div>
      </div>
      <div className="weather-desc">
        <span>{weather.weather[0].main}</span>
        <span>{weather.name}, {weather.sys.country}</span>
        <span>{new Date(weather.dt * 1000).toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default WeatherCard;