import {useState, useEffect} from 'react';
import { saveAs } from 'file-saver';
import BrushThicknessInput from '../BrushThickness';

import './sketchcanvas.css'

const CanvasControlls = ({activeColor, thickness, canvasRef, canvasContext, handleChangeColor , handleChangeThickness}) => {

      function downloadImage(){
          canvasRef.toBlob(function(blob) {
              saveAs(blob, "Canvas.png");
          })
      }


      function handleColorChange(e){
        handleChangeColor(e.target.value)
      }

      function handleThiccnessChange(e){
        handleChangeThickness(e.target.value)
      }

      function clear(){
        canvasContext.save();
        canvasContext.globalCompositeOperation = "destination-out";
        canvasContext.stroke();
        canvasContext.closePath();
        canvasContext.clearRect(0,0,canvasRef.width,canvasRef.height);
        canvasContext.restore();
      }


  return (
    <div className="canvas-controlls-wrapper">
      <div className="canvas-controlls-container">
        <div id="eraser" onClick={()=>{clear()}}><p id="eraser-label">Clear</p></div>
        <label  id="brush-color" htmlFor="change-color">
          <div><p id="color-label" style={{color:activeColor}}>Change color</p></div>
        </label>
        <input id="brush-color" type="color" name="brush-color" id="change-color" value={activeColor} onChange={handleChangeColor}/>
        <BrushThicknessInput onChange={handleChangeThickness} value={thickness}/>
        <div id="save-button" onClick={downloadImage}><p id="save-label">Download</p></div>
      </div>
    </div>
  )
}

export default CanvasControlls;
