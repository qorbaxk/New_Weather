import React from 'react'

const WeatherBox = ({weather}) => {
  console.log("weather?",weather);
  return (
    
    <div className='box'>
        <h4>{weather?.name}</h4><br></br>
        <h1>{weather?.main.temp} &#8451;</h1><br></br>
        <h4>{weather?.weather[0].description}</h4>
    </div>
    
  )
}

export default WeatherBox