import {useState, useEffect} from 'react';
import { saveAs } from 'file-saver';

import './sketchcanvas.css'

const SketchCanvas = ({clicks, handleClick, handleCanvasContext, handleCanvasRef, handleChangeColor, handleChangeThickness, thickness, activeColor}) => {

  const [canvasRef,setCanvasRef] = useState();
  const [canvasContext,setCanvasContext] = useState();
  const [rect,setRect] = useState();
  const [isPainting,setIsPainting] = useState(false);
  const [lastDrawingPoint, setLastDrawingPoint] = useState({x: undefined, y: undefined})


  useEffect(() => {
      const canvas = document.getElementById("sketchpad-board");
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect()

      document.body.addEventListener("touchmove", function (e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      }, false);

      canvas.addEventListener("touchstart", function (e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousedown");
        canvas.dispatchEvent(mouseEvent);
      }, false);

      canvas.addEventListener("touchmove", function (e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove");
        canvas.dispatchEvent(mouseEvent);
      }, false);

      canvas.addEventListener("touchend", function (e) {
        setIsPainting(false)
      }, false);

      setRect(rect);
      setCanvasRef(canvas)
      setCanvasContext(ctx)
      handleCanvasRef(canvas)
      handleCanvasContext(ctx)
      },[])

      function downloadImage(){
          canvasRef.toBlob(function(blob) {
              saveAs(blob, "Canvas.png");
          })
      }

      function drawCircle(x, y, radius) {
          canvasContext.save();
          canvasContext.beginPath();
          canvasContext.arc(x, y, radius, 0, Math.PI * 2);
          canvasContext.fill();
      }

      function drawLine(x1, y1, x2, y2) {
          canvasContext.lineWidth = thickness*5;
          canvasContext.lineCap = "round";
          canvasContext.lineJoin = "round";
          canvasContext.moveTo(x1, y1);
          canvasContext.lineTo(x2, y2);
          canvasContext.stroke();
          canvasContext.closePath();
      }

      function handleMove(e){
        let lastPoint =  lastDrawingPoint;
        if (isPainting) {
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            let newPoint = {"x": x, "y": y};
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            setLastDrawingPoint(newPoint);
        }
      }

      function handleClick(e){
          setIsPainting(true)
          let x = e.clientX - rect.left;
          let y = e.clientY - rect.top;
          setLastDrawingPoint({"x": x, "y": y})
          canvasContext.strokeStyle = activeColor;
          drawCircle(x, y, thickness);
      }

      function handleUp(e){
        if (!isTouchDevice()) {
          setIsPainting(false)
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

      function isTouchDevice() {
        return (415 > window.innerWidth);
      }

  return (
    <div className="canvas-component-container">
      <canvas id="sketchpad-board" width="400px" height="400px" onMouseDown={handleClick}  onMouseMove={handleMove}  onMouseUp={handleUp}/>
    </div>
  )
}

export default SketchCanvas;
