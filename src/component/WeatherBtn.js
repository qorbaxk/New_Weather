import React from 'react'


const WeatherBtn = (props) => {
  return (
    <div>
        <button onClick={() => {props.onClick();}} 
        className='btn2 btnPush'>
        {props.title}
        </button>
    </div>
  )
}

export default WeatherBtn