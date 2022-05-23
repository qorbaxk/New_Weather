import React from 'react'


const WeatherBtn = ({cities, selectedCity, handleCityChange}) => {
  return (
    <div>
        <button
        className='btn-4'
        variant={`${selectedCity == null ? "outline-warning":"warning"}`}
        onClick={()=>handleCityChange("current")}>
        My Place
        </button>

        {
          cities.map((city)=>{
            return <button className='btn-4'
            variant={`${selectedCity == null ? "outline-warning":"warning"}`}
            onClick={()=>handleCityChange(city)}>{city}</button>
          })
        }
    </div>
  )
}

export default WeatherBtn