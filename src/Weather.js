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
  const apiKey = `aef1757e37906f8atc32b9da5odbc24a`;
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  //City

  function changeCity(event) {
    setCity(event.target.value);
  }

  function searchCity(event) {
    event.preventDefault();
    axios.get(apiUrl).then((response) => {
      console.log(response.data);
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
      console.log(response.data);
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
        <form onSubmit={searchCity}>
          <input
            type="search"
            placeholder="Enter a city"
            onChange={changeCity}
          ></input>
          <input type="submit" value="Search"></input>
        </form>
        <div className="weather-content">
          <div>
            <h2>{cityHeading}</h2>
            <p className="weather-paragraph">Monday 22:50, {condition}</p>
            <p className="weather-paragraph">
              Humidity: {humidity}%, Wind: {windSpeed}mph
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
      </div>
    );
  }
}
