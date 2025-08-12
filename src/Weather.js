import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import FormattedDate from "./FormattedDate";
import Temperature from "./Temperature";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props) {
  //Variables
  const [date, setDate] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [city, setCity] = useState(props.city);
  const [cityHeading, setCityHeading] = useState(city);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [condition, setCondition] = useState("");
  const [weatherEmoji, setWeatherEmoji] = useState("");
  const [cityTracker, setCityTracker] = useState(false);

  const apiKey = `aef1757e37906f8atc32b9da5odbc24a`;
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  //City

  function changeCity(event) {
    setCity(event.target.value);
  }

  function searchCity(event) {
    event.preventDefault();
    if (cityTracker) {
      setCityTracker(false);
    } else if (!cityTracker) {
      setCityTracker(true);
    }
    axios.get(apiUrl).then((response) => {
      console.log(response.data);
      setCityHeading(response.data.city);
      setTemperature(response.data.temperature.current);
      setHumidity(response.data.temperature.humidity);
      setWindSpeed(response.data.wind.speed);
      setCondition(response.data.condition.description);
      setWeatherEmoji(response.data.condition.icon);
      setDate(response.data.time);
    });
  }
  if (!loaded) {
    axios.get(apiUrl).then((response) => {
      setCityHeading(response.data.city);
      setTemperature(response.data.temperature.current);
      setHumidity(response.data.temperature.humidity);
      setWindSpeed(response.data.wind.speed);
      setCondition(response.data.condition.description);
      setWeatherEmoji(response.data.condition.icon);
      setDate(response.data.time);
      setLoaded(true);
    });
  } else {
    return (
      <div className="weather-container">
        <h1>Weather Search Engine</h1>
        <form onSubmit={searchCity}>
          <input
            type="search"
            placeholder="Enter a city"
            onChange={changeCity}
            className="search-input"
          ></input>
          <input type="submit" value="Search" className="search-btn"></input>
        </form>
        <div className="weather-content">
          <div>
            <h2>{cityHeading}</h2>
            <p className="weather-paragraph">
              <FormattedDate city={city} date={date} />, {condition}
            </p>
            <p className="weather-paragraph">
              Humidity: <strong>{humidity}%</strong>, Wind:{" "}
              <strong>{windSpeed}mph</strong>
            </p>
          </div>

          <Temperature emoji={weatherEmoji} temperature={temperature} />
        </div>
        <div className="forecast">
          <WeatherForecast
            emoji={weatherEmoji}
            city={city}
            cityTracker={cityTracker}
          />
        </div>

        <footer>
          This project was coded by{" "}
          <a
            href="https://github.com/peytonbighorse"
            target="_blank"
            rel="noreferrer"
          >
            Peyton Bighorse
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/peytonbighorse/react-weather-app"
            target="_blank"
            rel="noreferrer"
          >
            open-sourced on GitHub
          </a>{" "}
          and hosted on{" "}
          <a
            href="https://pmb-react-weather-search.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            Netlify
          </a>
        </footer>
      </div>
    );
  }
}
