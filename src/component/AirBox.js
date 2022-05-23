import React from 'react'

const AirBox = ({air, airLevel}) => {
    console.log("air?", air);


  
  return (
    <div>
        <div className='airbox'>
            <h4>{air?.data.city.name}</h4>
            <h2>{air?.data.aqi}</h2>
            <h4>{air?airLevel(air.data.aqi):null}</h4>
        </div>
    </div>
  )
}

export default AirBox