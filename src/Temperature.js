import { useState } from "react";
import "./Temperature.css";
export default function Temperature(props) {
  const [unit, setUnit] = useState("fahrenheit");
  const [temperature, setTemperature] = useState(props.temperature);
  function convertToCelsius() {
    return (props.temperature - 32) * (5 / 9);
  }
  function convertTemperature(event) {
    event.preventDefault();
    if (unit === "fahrenheit") {
      setUnit("celsius");
      setTemperature(convertToCelsius());
    } else if (unit === "celsius") {
      setUnit("fahrenheit");
      setTemperature(props.temperature);
    }
  }
  if (unit === "fahrenheit") {
    return (
      <div className="temperature-container">
        <img
          src={`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${props.emoji}.png`}
          className="weather-emoji"
          alt={`${props.emoji} icon`}
        />

        <div className="temperature">{Math.round(temperature)}</div>
        <div className="temperature-unit">
          <a href="/" onClick={convertTemperature}>
            C°
          </a>{" "}
          | <span className="active-unit">°F</span>
        </div>
      </div>
    );
  } else if (unit === "celsius") {
    return (
      <div className="temperature-container">
        <img
          src={`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${props.emoji}.png`}
          className="weather-emoji"
          alt={`${props.emoji} icon`}
        />

        <div className="temperature">{Math.round(temperature)}</div>
        <div className="temperature-unit">
          <span className="active-unit">C°</span> |{" "}
          <a href="/" onClick={convertTemperature}>
            °F
          </a>
        </div>
      </div>
    );
  }
}
