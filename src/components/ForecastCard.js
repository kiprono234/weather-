import React from "react";

const ForecastCard = ({ day, label }) => {
  // For /forecast (3-hour): temps are in day.main.temp, temp_min, temp_max
  const { main, weather } = day;
  const icon = weather[0].icon;
  const description = weather[0].description;

  // Use temp_max and temp_min if available, else fallback to temp
  const max = main?.temp_max ?? main?.temp;
  const min = main?.temp_min ?? main?.temp;

  return (
    <div className="forecast-card">
      <div className="forecast-day">{label}</div>
      <div className="forecast-icon">
        <img
          src={`https://openweathermap.org/img/wn/${icon}.png`}
          alt={description}
        />
      </div>
      <div className="forecast-temp-main">
        {Math.round(main.temp)}°
      </div>
      <div className="forecast-temp-range">
        {Math.round(max)} / {Math.round(min)}°
      </div>
    </div>
  );
};

export default ForecastCard;