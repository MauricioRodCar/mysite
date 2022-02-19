import React from 'react';
import './customimageinput.css';

const CustomImageInput = ({ children, label, loadImage, image, handleDelete }) => {

  return(
    <div className="custom-image-container">
      <p className="input-label">
        {label}
      </p>
      <input type="file" accept="image/png, image/jpeg" name="photo" id="upload-photo" onChange={(e)=>{loadImage(e.target.files)}}/>
      <label htmlFor="upload-photo" style={{display:"inline-block"}}>
        <p className="customButton">{image?"Update image":"Upload image"}</p>
      </label>
      <p className="customButton" style={{display:"inline-block", marginLeft:"25px"}} onClick={()=>{handleDelete()}}>Delete image</p>
    </div>
  )
};

export default CustomImageInput;
