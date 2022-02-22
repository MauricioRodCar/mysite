import {useState, useEffect} from 'react';
import ProjectContainer from '../../../components/ProjectContainer';
import ClickableComponent from "./ClickableComponent";
import ChartComponent from "../../../components/ChartComponent";
import { saveAs } from 'file-saver';
import html2canvas from "html2canvas";
import './chartspage.css'

var JSZip = require("jszip");


const ChartsPage = () => {

  const [clicks, setClicks] = useState([
    {
      id:1,
      label: "Dark green",
      color: "#8aae92",
      amount: 0
    },
    {
      id:2,
      label: "Brown",
      color: "#616161",
      amount: 0
    },
    {
      id:3,
      label: "Light green",
      color: "#cce6d4",
      amount: 0
    },
    {
      id:4,
      label: "Gray",
      color: "#e2e6ef",
      amount: 0
    },
  ])

  function handleClick(e){
    let newClicks = [... clicks];
    for (var i = 0; i < newClicks.length; i++) {
      if (newClicks[i].id == e.id) {
        newClicks[i].amount++
      }
    }
    setClicks(newClicks)
  }

  function downloadZip(){
      var zip = new JSZip();
      let input = window.document.getElementsByClassName("chart-container");
      zipAll(zip, input, 0, input.length)
  }

  async function zipAll(zipFile, ref, actual, stop){
    if (actual == stop-1) {
      html2canvas(ref[actual]).then(canvas =>{

        canvas.toBlob(function(blob1) {
          zipFile.file(actual+".png", blob1);
          zipFile.generateAsync({type:"blob"})
          .then(function(content) {
              saveAs(content, "Graphs.zip");
          });
        })


      })

    }else{

      html2canvas(ref[actual]).then(canvas =>{
        canvas.toBlob(function(blob) {
          zipFile.file(actual+".png", blob);
            zipAll(zipFile,ref,actual+1,stop)
        })
      })

    }
  }


  return (
    <ProjectContainer title="Click counter">
    <div id="click-counter-wrapper">
      <div className="clickable-wrapper">
        <div className="clickable-container">
          <div id="label-clickable">
              <p id="click-instruction">Click a color</p>
              <ClickableComponent handleClick={handleClick} clicks={clicks}/>
          </div>
          <div id="graph-download-button" onClick={()=>{downloadZip()}}>Download as zipfile</div>
          </div>
      </div>
      <div className="wrapper-wrapper">
        <div className="charts-wrapper">
          <ChartComponent chartData={clicks} type="pie"/>
          <ChartComponent chartData={clicks} type="bar"/>
          <ChartComponent chartData={clicks} type="polar"/>
          <ChartComponent chartData={clicks} type="radar"/>
      </div>
    </div>
  </div>

    </ProjectContainer>
  )
}

export default ChartsPage;
