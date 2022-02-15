import { useState, React } from 'react';
import './skillcontainer.css'

function SkillContainer({ children, skills, isActive, index, changeActive }) {

  const [hoveredSkill, setHoveredSkill] = useState(-1);

  const [full, setFull] = useState(false);

  function handleChange(){
      changeActive(isActive?-1:index)
  }

  let gtc="";
  let gtr="75px 75px 75px";
  if (hoveredSkill==-1) {
    gtc="25% 25% 25%";
    gtr="75px 75px 75px";
  }else {
    switch (hoveredSkill%3) {
      case 0:
          gtc="35% 25% 25%";
        break;
      case 1:
          gtc="25% 35% 25%";
        break;
      case 2:
          gtc="25% 25% 35%";
        break;

    }
    switch (Math.floor(hoveredSkill/3)) {
      case 0:
        gtr="125px 75px 75px";
        break;
      case 1:
        gtr="75px 125px 75px";
        break;
      case 2:
        gtr="75px 75px 125px";
        break;

    }
  }


  return(
    <>
    <div className="skill-group-container" id={isActive?"skill-group-container-selected":null} onClick={handleChange}>
      <p className="skill-title">{skills.title}</p>
      <div className="wrapper" className={full?"wrapper wrapper-full":"wrapper"} style={{gridTemplateColumns:gtc, gridTemplateRows:gtr}}>
        {
          isActive
          ?
          skills.skills.map((skill,id) =>
            <div className="skill-container" key={id} id={id==hoveredSkill?"hovered-skill-container":null} onMouseEnter={()=> {setHoveredSkill(id)}} onMouseLeave={()=> {setHoveredSkill(-1)}}>
              <p className="skill-name">{skill.name}</p>
              {
                id==hoveredSkill
                ?
                <div className="meter">
                  <span style={{width:skill.level}}></span>
                </div>
                :
                null
              }

            </div>
          )
          :
          null
        }
      </div>
    </div>
    </>
  )
};

export default SkillContainer;
