import { useState, React } from 'react';
import './portfoliocontainer.css'

function PortfolioContainer({index, title, endpoint, description, tags }) {
  return(
    <div>
      <p>{title}</p>
    </div>
  )
};

export default PortfolioContainer;
