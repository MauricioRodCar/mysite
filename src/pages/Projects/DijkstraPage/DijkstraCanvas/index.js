import {useState, useEffect, useLayoutEffect} from 'react';
import { saveAs } from 'file-saver';
import MapImage from'../resources/map.png';
import calculateRoute from './DijkstraLogic'


import './dijkstracanvas.css'

const DijkstraCanvas = ({handleCanvasContext, handleCanvasRef, coordinates, lines, handleAddCoordinate, coord1, coord2, handleChangeCoord1, handleChangeCoord2}) => {

  const [canvasRef,setCanvasRef] = useState();
  const [canvasContext,setCanvasContext] = useState();
  const [rect,setRect] = useState();
  const [image, setImage] = useState();
  const [routeFound, setRouteFound] = useState([]);
  const [activeColor] = useState("black")
  const [thickness] = useState(6)
  const [options, setOptions] = useState([])

  useEffect(() => {
        setOptions(coordinates)
      },[coordinates])

  useLayoutEffect(() => {
    function updateRect() {
      if (canvasRef) {
        setRect(canvasRef.getBoundingClientRect())
      }
    }
    window.addEventListener('resize', updateRect);
    updateRect();
    return () => window.removeEventListener('resize', updateRect);
  }, []);

  useEffect(() => {
      const canvas = document.getElementById("sketchpad-board");
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect()
      const image = new Image();
      image.src = "";

      canvas.addEventListener("touchstart", function (e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousedown");
        canvas.dispatchEvent(mouseEvent);
      }, false);


        setImage(image)
        setRect(rect);
        setCanvasRef(canvas)
        setCanvasContext(ctx)
        handleCanvasRef(canvas)
        handleCanvasContext(ctx)
      },[])

      useEffect(() => {
          renderCanvas()
      },[lines])



      function drawBackground(){

        canvasContext.drawImage(image, 0, 0, 400, 400);
      }

      function drawCoodinates(){
        for (var i = 0; i < coordinates.length; i++) {
            drawCircle(coordinates[i].x, coordinates[i].y, 10, i, activeColor)
        }
      }

      function clear(){
        canvasContext.save();
        canvasContext.globalCompositeOperation = "destination-out";
        canvasContext.stroke();
        canvasContext.closePath();
        canvasContext.clearRect(0,0,canvasRef.width,canvasRef.height);
        canvasContext.restore();
      }


      function drawCircle(x, y, radius, index, color, size) {
          canvasContext.save();
          canvasContext.beginPath();
          canvasContext.arc(x, y, radius, 0, Math.PI * 2);
          canvasContext.closePath();
          canvasContext.fillStyle = color;
          canvasContext.fill();
          canvasContext.font = "18px Arial";
          canvasContext.fillStyle = "white";
          canvasContext.textAlign = "center";
          canvasContext.fillText(index+1, x, y+5);
      }

      function drawLine(x1, y1, x2, y2, color) {
          canvasContext.lineWidth = thickness;
          canvasContext.lineCap = "round";
          canvasContext.lineJoin = "round";
          canvasContext.moveTo(x1, y1);
          canvasContext.lineTo(x2, y2);
          canvasContext.strokeStyle = color;
          canvasContext.stroke();
          canvasContext.closePath();
      }


      function handleClick(e){
          let x = e.clientX - rect.left;
          let y = e.clientY - rect.top + window.scrollY;
          canvasContext.strokeStyle = activeColor;
          handleAddCoordinate({x:x, y:y, id:coordinates.length+1})
      }


      function isTouchDevice() {
        return (415 > window.innerWidth);
      }

      function drawLines(){
        for (var i = 0; i < lines.length; i++) {
          drawLine(lines[i].coord1.x, lines[i].coord1.y, lines[i].coord2.x, lines[i].coord2.y, activeColor)
        }
      }

      function drawRoute(){
        canvasContext.beginPath();
        for (var i = 0; i < routeFound.length-1; i++) {
          drawLine(coordinates[routeFound[i]-1].x-1, coordinates[routeFound[i]-1].y, coordinates[routeFound[i+1]-1].x, coordinates[routeFound[i+1]-1].y, "blue")
        }
        canvasContext.closePath();
        for (var i = 0; i < routeFound.length; i++) {
          drawCircle(coordinates[routeFound[i]-1].x, coordinates[routeFound[i]-1].y, 12, routeFound[i]-1, "blue")
        }

      }

      function renderCanvas(){
        if (canvasContext) {
          clear()
          drawBackground()
          drawLines()
          drawCoodinates()
          drawRoute()
        }
      }

      function handleImage(e){
        try{
          let reader = new FileReader();
            reader.onload = function(event){
                let img = new Image();
                img.src = event.target.result;
                setImage(img);
            }
            reader.readAsDataURL(e.target.files[0]);
        }catch{}

      }

      function handleSelectChange(e){
        let coordCopy = [...coordinates]
        let pickedCoord = {};
        for (var i = 0; i < coordCopy.length; i++) {
          if (coordCopy[i].id == e.target.value) {
            pickedCoord = coordCopy[i]
          }
        }
        switch (e.target.name) {
          case "coord1":
            handleChangeCoord1(pickedCoord)
            break;
          case "coord2":
            handleChangeCoord2(pickedCoord)
            break;
        }
      }

      function calculate(){
        let newLines = [...lines]
        let result = calculateRoute(coord1.id,coord2.id,coordinates.length, newLines);
        if (result[0] != -1) {
          setRouteFound(result);
        }else{
          alert("Please make sure that there is at least one path that connects both nodes")
        }
      }

  return (
    <div className="canvas-component-container">
      {renderCanvas()}
      <canvas id="sketchpad-board" width="400px" height="400px" onClick={handleClick} />
      <div className="canvas-config-container">
        <div className="canvas-image-button-container">
          <input type="file" accept="image/png, image/jpeg" name="photo" id="upload-photo" onChange={handleImage} />
          <label htmlFor="upload-photo" id="canvas-image-button" style={{display:"inline-block"}}>
            <p className="customButton">Upload image</p>
          </label>
        </div>
        <div className="canvas-path-container">
          <table className="config-table">
            <thead>
            <tr>
              <th>
                From
              </th>
              <th>
                To
              </th>
            </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select name="coord1" value={coord1.id} onChange={handleSelectChange} className="add-coordinate-select">
                    {
                        options.length<1 || coord1 == -1 ?
                        (<option value={null}>
                          Select
                        </option>):null
                    }
                    {
                      options.map((option,index) =>
                        <option key={option.id} value={option.id}>
                          {option.id}
                        </option>
                      )
                    }
                  </select>
                </td>
                <td>
                  <select name="coord2" value={coord2.id} onChange={handleSelectChange} className="add-coordinate-select">
                    {
                        options.length<1 || coord2 == -1 ?
                        (<option value={null}>
                          Select
                        </option>):null
                    }
                    {
                      options.map((option,index) =>
                        <option key={option.id} value={option.id}>
                          {option.id}
                        </option>
                      )
                    }
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="customButton" onClick={calculate}>Calculate</div>
        </div>
      </div>
    </div>
  )
}

export default DijkstraCanvas;
