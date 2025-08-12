import "./Temperature.css";
export default function Temperature(props) {
  return (
    <div className="temperature-container">
      <img
        src={`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${props.emoji}.png`}
        className="weather-emoji"
        alt={`${props.emoji} icon`}
      />

      <div className="temperature">{Math.round(props.temperature)}</div>
      <div className="temperature-unit">
        <span className="active-unit">°F</span>
      </div>
    </div>
  );
}
