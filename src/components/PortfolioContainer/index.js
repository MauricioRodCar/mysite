import { React } from 'react';
import { useHistory } from "react-router-dom";
import './portfoliocontainer.css'

function PortfolioContainer({index, title, endpoint, description, tags, listOfTags, customClass }) {
  const history = useHistory();

  function redirect(){
    if (endpoint.split("**")[0]!="ex") {
      history.push(endpoint);
    }
  }


  let itemTags = [];
  for (var i = 0; i < tags.length; i++) {
    itemTags.push(listOfTags[tags[i]-1]);
  }

  return(

      <div className={"portfolio-container "+customClass} style={endpoint?null:{filter: "grayscale(100%)", cursor:"auto"}} onClick={()=>{
        if (endpoint) {
          redirect()
        }
      }}>
          <a className="portfolio-external-link" href={endpoint.split("**")[0]=="ex"?endpoint.split("**")[1]:"#"} onClick={(e)=>{
            if (endpoint.split("**")[0]!="ex") {
              e.preventDefault();
            }
        }} target="_blank">
        <p className="portfolio-title">{title}</p>
        <p className="portfolio-description">{description}</p>
        <div className="portfolio-tag-container">
        {
          itemTags.map( (itemTag,index) =>
            <div className="portfolio-tag" key={index} style={{backgroundColor:itemTag.color}}>
              <p className="portfolio-tag-name">{itemTag.name}</p>
            </div>
           )
        }
        </div>
            </a>
      </div>

  )
};

export default PortfolioContainer;
