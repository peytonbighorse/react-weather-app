export default function FormattedDateDate(props) {
  const currentDate = new Date(props.date * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days[currentDate.getDay()];
  const hour = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const formattedDate = `${day}, ${hour < 10 ? `0${hour}` : hour}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;

  return formattedDate;
}
