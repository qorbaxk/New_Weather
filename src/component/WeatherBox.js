import React from "react";

const WeatherBox = ({ weather }) => {
  console.log("weather?", weather);


  return (
    <div className="box">
      <h2>{weather?.name}</h2>
      <br></br>
      <div className="ondo">{weather ? weather.main.temp.toFixed(1) : null} &#8451;</div>
      <br></br>
      <h4>{weather?.weather[0].description}</h4>
    </div>
  );
};

export default WeatherBox;
