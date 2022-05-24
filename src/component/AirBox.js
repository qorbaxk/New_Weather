import React from 'react'

const AirBox = ({air, airLevel, condition}) => {
    console.log("air?", air);
  if(air){
    if(airLevel(air.data.aqi)=="좋음"){
     condition = "green";
    }else if(airLevel(air.data.aqi)=="보통"){
     condition = "yellow";
    }else if(airLevel(air.data.aqi)=="약간 좋지 않음"){
     condition = "orange";
    }else if(airLevel(air.data.aqi)=="좋지 않음"){
     condition = "red";
    }else if(airLevel(air.data.aqi)=="매우 좋지 않음"){
     condition = "purple";
    }else if(airLevel(air.data.aqi)=="위험함"){
     condition = "darkred";
    }
    
  }

  return (
    <div>
        <div></div>
        <div className={`airbox ${condition}`}
        >
            <h4>{air?.data.city.name}</h4>
            <div className='num'>{air?.data.aqi}</div>
            <h4>{air?airLevel(air.data.aqi):null}</h4>
        </div>
    </div>
  )
}

export default AirBox