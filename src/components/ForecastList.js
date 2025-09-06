import React from "react";
import ForecastCard from "./ForecastCard";

const ForecastList = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  // Show only 4 days (Today, Tomorrow, Thursday, Friday)
  const daysToShow = Math.min(forecast.length, 4);

  // Helper to format day labels
  const getDayLabel = (idx, dt) => {
    if (idx === 0) return "Today";
    if (idx === 1) return "Tomorrow";
    return new Date(dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
  };

  // Prepare the cards to duplicate for marquee
  const displayed = forecast.slice(0, daysToShow);

  return (
    <div className="forecast-list-marquee">
      <div className="forecast-list">
        {displayed.map((day, idx) => (
          <ForecastCard
            key={day.dt}
            day={day}
            label={getDayLabel(idx, day.dt)}
          />
        ))}
        {/* {/* Duplicate cards for seamless marquee
        {displayed.map((day, idx) => (
          <ForecastCard
            key={day.dt + "-clone"}
            day={day}
            label={getDayLabel(idx, day.dt)}
          /> */}
        
      </div>
    </div>
  );
};

export default ForecastList;