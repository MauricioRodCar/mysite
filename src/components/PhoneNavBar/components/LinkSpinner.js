import { useState,useEffect, React } from 'react';
import { useHistory } from "react-router-dom";
import './LinkSpinner.css';

function LinkSpinner({ children, links, redirect }) {
  const [sideLinks, setSideLinks] = useState(links)
  const history = useHistory();


  function rotateNLinks(n){
    let newLinks = [...sideLinks]
    if (n==1) {
      let rotated = newLinks.splice(0,n);
      newLinks = newLinks.concat(rotated);
    } else {
      let rotated = newLinks.splice(newLinks.length-1,1);
      newLinks = rotated.concat(newLinks);
    }
    history.push(newLinks[0].endpoint);
    redirect(newLinks)
    setSideLinks(newLinks)

  }

  function rotateContents (n) {
    setTimeout(function () {
      rotateNLinks(n);
      document.getElementById("wordbox").style.top = "0px";
      }, 300);
  }


function animate(n) {
  let element = document.getElementById("item-container");
  element.animate({top: "20px"}, 250, 'swing');
  rotateContents(n);

}

  return(
    <div id="spinner-container">
      <div id="prev-nav-button" onClick={(e)=>{e.stopPropagation();animate(-1)}}/>
      <div className="slottt-machine-recipe-phone">
        <div className="slottt-machine-recipe__mask-phone" id="wordbox">
            <div className="slottt-machine-recipe__items_container-phone recipe_if" id="item-container">
              {
                sideLinks.map((link, id) =>
                  <div className='slottt-machine-recipe__item-phone' key={id}>
                    {link.label}
                  </div>
                )
              }
            </div>
        </div>
      </div>
      <div id="next-nav-button"  onClick={(e)=>{e.stopPropagation();animate(1)}}/>
    </div>
  )
};

export default LinkSpinner;
