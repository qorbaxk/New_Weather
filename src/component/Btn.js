import React from 'react'

const Btn = (props) => {
  return (
    <div>
        <button className='btn btnPush'>
        {props.title}
        </button>
    </div>
  )
}

export default Btn