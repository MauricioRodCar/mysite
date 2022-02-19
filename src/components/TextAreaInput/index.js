import React from 'react';
import './textareainput.css';

const TextAreaInput = ({ children, label, handleChange }) => {

  return(
    <div className="text-input-container">
    <p className="input-label">
      {label}
    </p>
      <textarea className="custom-textarea" cols="50" rows="3" wrap="hard" maxLength="160" onChange={(e)=>{handleChange(e.target.value)}}/>
    </div>
  )
};

export default TextAreaInput;
