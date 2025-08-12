import { useState, useEffect } from "react";
import "./WeatherForecast.css";
import axios from "axios";

export default function WeatherForecast(props) {
  const city = props.city;
  const [forecast, setForecast] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [props.cityTracker]);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  if (loaded) {
    function getWeekday(day) {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const date = new Date(day.time * 1000);
      return days[date.getDay()];
    }
    function getMinTemp(day) {
      return Math.round(day.temperature.minimum);
    }
    function getMaxTemp(day) {
      return Math.round(day.temperature.maximum);
    }
    function getWeatherIcon(day) {
      return day.condition.icon_url;
    }
    return (
      <div className="forecast-container">
        {forecast.map((dailyForecast, index) => {
          return (
            <div className="weather-forecast" key={index}>
              <div className="day">{getWeekday(dailyForecast)}</div>
              <div>
                <img
                  src={getWeatherIcon(dailyForecast)}
                  alt={`weather icon`}
                  className="forecast-icon"
                />
              </div>
              <div className="forecast-temperature">
                <span className="max-temp">{getMaxTemp(dailyForecast)}°</span>{" "}
                <span className="min-temp">{getMinTemp(dailyForecast)}°</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    const apiKey = `aef1757e37906f8atc32b9da5odbc24a`;
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;

    axios.get(apiUrl).then(handleResponse);
    return null;
  }
}
