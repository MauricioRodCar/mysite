import { useState, React } from 'react';
import './sidebar.css';


function Sidebar({ children }) {
  const [hovering, setHovering] = useState(false)

  console.log(hovering);

  return(
    <div id="sidebar" onMouseEnter={()=> {setHovering(true)}} onMouseLeave={()=> {setHovering(false)}}>
      {
        hovering
        ?
        (<p></p>)
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
