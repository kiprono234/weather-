import React, { useContext } from "react";
import WeatherProvider, { WeatherContext } from "./context/WeatherProvider";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import LocationDetector from "./components/LocationDetector";
import ForecastList from "./components/ForecastList";
import "./App.scss";

const Main = () => {
  const { searchWeather, getWeatherByLocation, forecast } = useContext(WeatherContext);

  return (
    <div className="weather-app-bg">
      <div>
        <Header onSearch={searchWeather} />
        <LocationDetector onDetect={getWeatherByLocation} />
        <WeatherCard />
        <ForecastList forecast={forecast} />
      </div>
    </div>
  );
};

function App() {
  return (
    <WeatherProvider>
      <Main />
    </WeatherProvider>
  );
}

export default App;