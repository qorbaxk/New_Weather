import React from 'react'

const WeatherBox = ({weather}) => {
  console.log("weather?",weather);

    return (
    
      <div className='box'>
          <h2>{weather?.name}</h2><br></br>
          <h1>{weather?(weather.main.temp).toFixed(1):null} &#8451;</h1><br></br>
          <h4>{weather?.weather[0].description}</h4>
          {/* <h6>{weather.rain?"💧"+Object.values(weather.rain)+"mm":0+"mm"}</h6> */}
      </div>
      
    )

  
}

export default WeatherBox