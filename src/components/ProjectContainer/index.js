import React from 'react';
import { useHistory } from "react-router-dom";

import './projectcontainer.css';

const ProjectContainer = ({ children, title }) => {
  const history = useHistory();

  function returnToPortfolio(){
    history.push('/portfolio');
  }


  return(
    <div className="project-container">
    <div className="back-to-portfolio" onClick={()=>{returnToPortfolio()}}/>

      <h1 className="project-container-title">{title}</h1>

      {children}
    </div>)
  }

export default ProjectContainer;
