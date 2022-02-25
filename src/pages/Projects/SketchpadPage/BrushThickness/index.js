
const BrushThicknessInput = ({value, onChange}) => {

  function handleThicknessChange(e){
    onChange(e.target.className.split(" ")[1]);
  }

  function renderThickness(){
    let thicknessLevels = []
    for (var i = 1; i < 6; i++) {

      let newElement =   (<div className={"thickness-level " + i} id={value==i?"thickness-active":null} onClick={(e)=>handleThicknessChange(e)}>
          <div className={"thickness-dot "+i} style={{width:i+"px",height:i+"px", backgroundColor:"black"}}/>
        </div>)

      thicknessLevels.push(newElement)
    }
    return thicknessLevels
  }

  return (
    <div id="brush-thickness">
      {renderThickness()}
    </div>
  )
}

export default BrushThicknessInput;
