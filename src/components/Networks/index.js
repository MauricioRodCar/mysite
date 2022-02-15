import { useState, React } from 'react';
import './networks.css';
import NetworksImage from'./resources/cuota.png';
import LinkedInImage from'./resources/linkedin.png';
import GithubImage from'./resources/github.png';

function Networks() {
  const [isHovered, setIsHovered] = useState(false);

  return(
    <div id="networks-corner" onMouseEnter={()=>{setIsHovered(true)}} onMouseLeave={()=>{setIsHovered(false)}}>
      <div id="networks-triangle"/>
      {
        isHovered
        ?
          <div id="social-container">
            <a  target="_blank" href="https://www.linkedin.com/in/mauricio-rodr%C3%ADguez-carballo-2a9268192/">
              <img className="social-icon" src={LinkedInImage}/>
            </a>
            <a  target="_blank" href="https://github.com/MauricioRodCar">
              <img className="social-icon" src={GithubImage}/>
            </a>
          </div>
        :
        <img id="networks-img" src={NetworksImage}/>
      }

    </div>
  )
};

export default Networks;
