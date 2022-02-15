import { useState, React } from 'react';
import LinkSpinner from './components/LinkSpinner';
import './sidebar.css';


function Sidebar({ children }) {
  const [hovering, setHovering] = useState(false)
  const [links, setLinks] = useState([
    {label: "Who am i?" , endpoint: "/"},
    {label: "Skillset", endpoint: "/skills"},
    {label: "Portfolio", endpoint: "/portfolio"}
  ])

  return(
    <div id="sidebar" onMouseEnter={()=> {setHovering(true)}} onMouseLeave={()=> {setHovering(false)}}>
      {
        hovering
        ?
        (<LinkSpinner links={links} redirect={(e)=>{setLinks(e)}}/>)
        :
        (<div className="hover-container">
          <span id="hover-me">Hover me ;)</span>
        </div>
        )
      }
    </div>
  )
};

export default Sidebar;
