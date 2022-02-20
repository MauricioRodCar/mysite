import { useState, React } from 'react';
import LinkSpinner from './components/LinkSpinner';
import './navbar.css';


function Sidebar({ children }) {
  const [showContent, setShowContent] = useState(false)
  const [links, setLinks] = useState([
    {label: "Who am i?" , endpoint: "/"},
    {label: "Skillset", endpoint: "/skills"},
    {label: "Portfolio", endpoint: "/portfolio"}
  ])

  return(
    <div className={showContent?"nav-bar nav-active":"nav-bar"} onClick={()=> {setShowContent(!showContent)}}>
      {
        showContent?
        (<LinkSpinner links={links} redirect={(e)=>{setLinks(e)}}/>)
        :
        <div className="click-container">
          <span id="click-me">Click me ;)</span>
        </div>
      }
    </div>
  )
};

export default Sidebar;
