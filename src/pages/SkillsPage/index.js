import {useState} from 'react';
import Container from '../../components/Container';
import SkillContainer from '../../components/SkillContainer'

const GraphsPage = () => {

  const [activeId, setActiveId] = useState(-1);
  const [skills, setSkills] = useState([
    {
      title: "Areas",
      skills: [
        {
          name: "Front-End Development",
          level: "100%",
          description: ""
        },
        {
          name: "Single-page Web Application",
          level: "100%",
          description: ""
        },
        {
          name: "Debugging",
          level: "80%",
          description: ""
        },
        {
          name: "Troubleshooting",
          level: "89%",
          description: ""
        },
        {
          name: "Documenting",
          level: "60%",
          description: ""
        },
        {
          name: "Back-End Development",
          level: "60%",
          description: ""
        },
        {
          name: "Testing",
          level: "60%",
          description: ""
        },

      ]
    },
    {
      title: "Languages and frameworks",
      skills: [
        {
          name: "Html/css/Javascript",
          level: "100%",
          description: ""
        },
        {
          name: "ReactJs",
          level: "100%",
          description: ""
        },
        {
          name: "React Hooks",
          level: "85%",
          description: ""
        },
        {
          name: "JQuery",
          level: "80%",
          description: ""
        },
        {
          name: "SQL",
          level: "70%",
          description: ""
        },
        {
          name: "TypeScript",
          level: "70%",
          description: ""
        },
        {
          name: "Java",
          level: "70%",
          description: ""
        },
        {
          name: "Angular",
          level: "60%",
          description: ""
        },
        {
          name: "Jest",
          level: "40%",
          description: ""
        },

      ]
    },
    {
      title: "Miscellaneous",
      skills: [
        {
          name: "Npm",
          level: "100%",
          description: ""
        },
        {
          name: "Git",
          level: "90%",
          description: ""
        },
        {
          name: "Socket.io",
          level: "80%",
          description: ""
        },
        {
          name: "JWT",
          level: "60%",
          description: ""
        },
        {
          name: "Redux",
          level: "50%",
          description: ""
        },
        {
          name: "sass",
          level: "50%",
          description: ""
        },
        {
          name: "D3",
          level: "40%",
          description: ""
        },
        {
          name: "Babel",
          level: "30%",
          description: ""
        },
        {
          name: "Webpack",
          level: "30%",
          description: ""
        },
      ]
    },
  ])


  return (
    <Container title="Skills">
      {
        skills.map((skill,index) =>
          <SkillContainer skills={skill} key={index} index={index} isActive={activeId == index} changeActive={(e) => {setActiveId(e)}}/>
        )
      }
    </Container>
  )
}

export default GraphsPage;
