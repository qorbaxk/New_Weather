import React from "react";


const WeatherBtn = ({ cities, handleCityChange }) => {
  

  
  return (
    <div>
      <button
        className="btn-4" 
        onClick={() => handleCityChange("current") }
      >
        My Place
      </button>
    
      {cities.map((city) => {
        return (
          <button
            className="btn-4"
            onClick={() => handleCityChange(city)}
          >
            {city}
          </button>
        );
      })}
    </div>
  );
};

export default WeatherBtn;
