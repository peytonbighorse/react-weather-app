import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  //Variables
  const [loaded, setLoaded] = useState(false);
  const [city, setCity] = useState(props.city);
  const [cityHeading, setCityHeading] = useState(city);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [condition, setCondition] = useState("");
  const [weatherEmoji, setWeatherEmoji] = useState("");
  const [date, setDate] = useState(null);
  const apiKey = `aef1757e37906f8atc32b9da5odbc24a`;
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  //City

  function changeCity(event) {
    setCity(event.target.value);
  }

  function searchCity(event) {
    event.preventDefault();
    axios.get(apiUrl).then((response) => {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const day = days[new Date(response.data.time).getDay()];
      const hour = new Date(response.data.time).getHours();
      const minutes = new Date(response.data.time).getMinutes();
      setDate(`${day} ${hour}:${minutes}`);
      setCityHeading(response.data.city);
      setTemperature(response.data.temperature.current);
      setHumidity(response.data.temperature.humidity);
      setWindSpeed(response.data.wind.speed);
      setCondition(response.data.condition.description);
      setWeatherEmoji(response.data.condition.icon);
    });
  }
  if (!loaded) {
    axios.get(apiUrl).then((response) => {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const day = days[new Date(response.data.time).getDay()];
      const hour = new Date(response.data.time).getHours();
      const minutes = new Date(response.data.time).getMinutes();
      setDate(`${day} ${hour}:${minutes}`);
      setCityHeading(response.data.city);
      setTemperature(response.data.temperature.current);
      setHumidity(response.data.temperature.humidity);
      setWindSpeed(response.data.wind.speed);
      setCondition(response.data.condition.description);
      setWeatherEmoji(response.data.condition.icon);
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
              {date}, {condition}
            </p>
            <p className="weather-paragraph">
              Humidity: <strong>{humidity}%</strong>, Wind:{" "}
              <strong>{windSpeed}mph</strong>
            </p>
          </div>
          <div>
            <p className="right-side">
              <img
                src={`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherEmoji}.png`}
                className="weather-emoji"
                alt={`${weatherEmoji} icon`}
              />
              <span className="temperature">{Math.round(temperature)}°F </span>
            </p>
          </div>
        </div>
        <footer>
          This project was coded by{" "}
          <a href="https://github.com/peytonbighorse">Peyton Bighorse</a> and is{" "}
          <a href="https://github.com/peytonbighorse/react-weather-app">
            open-sourced on GitHub
          </a>{" "}
          and hosted on{" "}
          <a href="https://pmb-react-weather-search.netlify.app/">Netlify</a>
        </footer>
      </div>
    );
  }
}
