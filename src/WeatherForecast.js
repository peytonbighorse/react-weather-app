import { useState } from "react";
import "./WeatherForecast.css";
import axios from "axios";

export default function WeatherForecast(props) {
  const [city, setCity] = useState(props.city);
  const [forecast, setForecast] = useState(null);
  const [loaded, setLoaded] = useState(false);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  if (loaded) {
    function getDay() {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const date = new Date(forecast[0].time * 1000);
      const day = days[date.getDay()];
      return day;
    }
    function getMinTemp() {
      return Math.round(forecast[0].temperature.minimum);
    }
    function getMaxTemp() {
      return Math.round(forecast[0].temperature.maximum);
    }
    function getWeatherIcon() {
      return forecast[0].condition.icon_url;
    }
    return (
      <div className="forecast-container">
        <div className="weather-forecast">
          <div className="day">{getDay()}</div>
          <div>
            <img
              src={getWeatherIcon()}
              alt={`${props.emoji} icon`}
              className="forecast-icon"
            />
          </div>
          <div className="forecast-temperature">
            <span className="max-temp">{getMaxTemp()}°</span>{" "}
            <span className="min-temp">{getMinTemp()}°</span>
          </div>
        </div>
      </div>
    );
  } else {
    const apiKey = `aef1757e37906f8atc32b9da5odbc24a`;
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;

    axios.get(apiUrl).then(handleResponse);
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
}
