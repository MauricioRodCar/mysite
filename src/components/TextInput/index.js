import React from 'react';
import './textinput.css';

const TextInput = ({ children, label, handleChange }) => {

  return(
    <div className="text-input-container">
    <p className="input-label">
      {label}
    </p>
      <input className="custom-input-text" type="text" onChange={(e)=>{handleChange(e.target.value)}}/>
    </div>
  )
};

export default TextInput;
