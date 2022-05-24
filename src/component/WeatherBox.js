import React from "react";

const WeatherBox = ({ weather, rainFall }) => {
  console.log("weather?", weather);

  if(weather){
    if(weather.rain){
      rainFall = Object.values(weather.rain);
    }else{
      rainFall = 0;
    }
  }



  return (
    <div className="box">
      <h2>{weather?.name}</h2>
      <br></br>
      <div className="ondo">{weather ? weather.main.temp.toFixed(1) : null} &#8451;</div>
      <br></br>
      <h4>{weather?.weather[0].description}</h4>
      <h6>{`💧 ${rainFall} mm`}</h6>
    </div>
  );
};

export default WeatherBox;
