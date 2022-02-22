import {useState} from 'react';

import './clickablecomponent.css'

const ClickableComponent = ({clicks, handleClick}) => {

  return (
    <div className="clickable-component-container">
    {
      clicks.map((area, index) =>
        <div key={index} className="clickable-area" id={"clickable-area-"+area.id} style={{backgroundColor:area.color}} onClick={()=>{handleClick(area)}}/>
      )
    }
    </div>
  )
}

export default ClickableComponent;
