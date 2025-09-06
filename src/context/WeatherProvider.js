import React, { createContext, useState } from "react";

export const WeatherContext = createContext();

const API_KEY = "e7359ac473181d832bbe581cdd59d00d";

// Helper: Get city/county coordinates by name
async function fetchCoordsByCity(city) {
  const resp = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city},KE&limit=1&appid=${API_KEY}`
  );
  const data = await resp.json();
  if (!data[0]) throw new Error("City not found");
  return {
    lat: data[0].lat,
    lon: data[0].lon,
    name: data[0].name,
    country: data[0].country,
  };
}

// Helper: Get 5-day/3-hour forecast for coordinates
async function fetchForecast(lat, lon) {
  const resp = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!resp.ok) throw new Error("Forecast not found");
  return resp.json();
}

// Helper: Extract a daily forecast (one per day, preferably at 12:00)
function getDailyForecasts(forecastList) {
  const daily = [];
  const map = {};
  forecastList.forEach(item => {
    const date = item.dt_txt.split(" ")[0];
    // Pick the forecast at 12:00 if available, else the first of the day
    if (!map[date] || item.dt_txt.includes("12:00:00")) {
      map[date] = item;
    }
  });
  // Return up to 5 days
  Object.values(map).slice(0, 5).forEach(item => daily.push(item));
  return daily;
}

const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null); // Current weather object
  const [forecast, setForecast] = useState([]); // Array of daily forecasts
  const [location, setLocation] = useState(""); // City/county name
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Search by city/county name
  const searchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      const coords = await fetchCoordsByCity(city);
      setLocation(`${coords.name}, ${coords.country}`);
      const data = await fetchForecast(coords.lat, coords.lon);
      setWeather({
        ...data.list[0],
        name: coords.name,
        country: coords.country,
      });
      setForecast(getDailyForecasts(data.list)); // 5-day forecast
    } catch (err) {
      setError(err.message || "Failed to fetch weather");
      setWeather(null);
      setForecast([]);
      setLocation("");
    }
    setLoading(false);
  };

  // Search by geolocation (lat/lon)
  const getWeatherByLocation = async (lat, lon) => {
    setLoading(true);
    setError("");
    try {
      // Reverse geocode to get location name
      const resp = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );
      const rev = await resp.json();
      const place =
        rev[0] && rev[0].name && rev[0].country
          ? `${rev[0].name}, ${rev[0].country}`
          : "";
      setLocation(place);

      const data = await fetchForecast(lat, lon);
      setWeather({
        ...data.list[0],
        name: rev[0]?.name ?? "",
        country: rev[0]?.country ?? "",
      });
      setForecast(getDailyForecasts(data.list));
    } catch (err) {
      setError(err.message || "Failed to fetch weather");
      setWeather(null);
      setForecast([]);
      setLocation("");
    }
    setLoading(false);
  };

  return (
    <WeatherContext.Provider
      value={{
        weather,
        forecast,
        location,
        loading,
        error,
        searchWeather,
        getWeatherByLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;