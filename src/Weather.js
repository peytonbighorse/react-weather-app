import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [temperature, setTemperature] = useState(null);
  const city = `Boston`;
  const apiKey = `aef1757e37906f8atc32b9da5odbc24a`;
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then((response) => {
    setTemperature(response.data.temperature.current);
  });
  return (
    <h2>
      {city}: {Math.round(temperature)}°F
    </h2>
  );
}
