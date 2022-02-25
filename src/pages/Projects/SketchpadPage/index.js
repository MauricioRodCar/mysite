import {useState, useEffect} from 'react';
import ProjectContainer from '../../../components/ProjectContainer';
import './sketchpadpage.css';
import SketchCanvas from './SketchCanvas';
import CanvasControlls from './CanvasControlls';


const SketchpadPage = () => {

  const [activeColor, setActiveColor] = useState("black");
  const [thickness, setThickness] = useState(1);
  const [canvasRef, setCanvasRef] = useState()
  const [canvasContext, setCanvasContext] = useState()

  function changeColor(e){
    setActiveColor(e.target.value)
  }

  function changeThickness(e){
    setThickness(e)
  }

  return (
    <ProjectContainer title="Canvas sketchpad">
      <div className="sketchpad-wrapper">
        <SketchCanvas activeColor={activeColor} thickness={thickness} handleCanvasRef={(e) => {setCanvasRef(e)} } handleCanvasContext={(e) => {setCanvasContext(e)} } />
        <CanvasControlls activeColor={activeColor} thickness={thickness} canvasRef={canvasRef} canvasContext={canvasContext} handleChangeColor={changeColor} handleChangeThickness={changeThickness}/>
      </div>
    </ProjectContainer>
  )
}

export default SketchpadPage;
