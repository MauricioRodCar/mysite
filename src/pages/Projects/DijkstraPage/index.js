import {useState, useEffect} from 'react';
import ProjectContainer from '../../../components/ProjectContainer';
import './sketchpadpage.css';
import DijkstraCanvas from './DijkstraCanvas';
import DijkstraInfo from './DijkstraInfo';

const DijkstraPage = () => {

  const [activeColor, setActiveColor] = useState("black");
  const [thickness, setThickness] = useState(1);
  const [canvasRef, setCanvasRef] = useState()
  const [canvasContext, setCanvasContext] = useState()
  const [coordinates, setCoordinates] = useState([])
  const [coord1, setCoord1] = useState(-1);
  const [coord2, setCoord2] = useState(-1);
  const [lines, setLines] = useState([])


  function addCoordinate(e){
    let newCoodinates = [...coordinates];
    newCoodinates.push(e);
    setCoordinates(newCoodinates)
  }

  function addLine(e){
    let newLines = [...lines];
    newLines.push(e);
    setLines(newLines)
  }

  return (
    <ProjectContainer title="Canvas sketchpad">
      <div className="sketchpad-wrapper">
        <DijkstraCanvas activeColor={activeColor} thickness={thickness} handleCanvasRef={(e) => {setCanvasRef(e)} } handleCanvasContext={(e) => {setCanvasContext(e)} }
         coordinates={coordinates} lines={lines} handleAddCoordinate={(e)=>{addCoordinate(e)}} coord1={coord1} coord2={coord2}
         handleChangeCoord1={(e)=>{setCoord1(e)}} handleChangeCoord2={(e)=>{setCoord2(e)}}/>
        <DijkstraInfo coordinates={coordinates} handleAddLine={addLine}  lines={lines} handleChangeLines={(e)=> {setLines(e)}} coord1={coord1}
         coord2={coord2} handleChangeCoord1={(e)=>{setCoord1(e)}} handleChangeCoord2={(e)=>{setCoord2(e)}}/>
      </div>
    </ProjectContainer>
  )
}

export default DijkstraPage;
