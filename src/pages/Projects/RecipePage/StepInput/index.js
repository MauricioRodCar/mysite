import {useState} from 'react';

import './stepinput.css'

const StepInput = ({handleChange}) => {

  const [step, setStep] = useState("");

  function verifyFields(){
    if (step!="") {
      handleChange(step)
    }
  }

  return (
    <div className="ingredient-input-wrapper">
    <p className="input-label">Add Step</p>
      <div>
        <input className="custom-input-step" type="text" value={step} onChange={(e)=>{setStep(e.target.value)}}/>
        <div className="add-button" onClick={()=>{verifyFields()}}/>
      </div>
    </div>
  )
}

export default StepInput;
