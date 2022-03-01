import {useState, useEffect} from 'react';

const DijkstraInfo = ({coordinates, handleAddLine, lines, handleChangeLines, coord1, coord2, handleChangeCoord1, handleChangeCoord2}) => {

  const [options, setOptions] = useState([])

  useEffect(() => {
        setOptions(coordinates)
      },[coordinates])

  function handleCreateLine(){
    if (coord1!=-1 && coord2!=-1) {
      let distance = Math.sqrt(Math.pow((coord1.x-coord2.x), 2)+Math.pow((coord1.y-coord2.y), 2))
      handleAddLine({coord1:coord1, coord2: coord2, distance: Math.round(distance * 100) / 100})
    }else {
      alert("Please make sure to select both coords before trying to connect them");
    }
  }

  function handleDelete(e){
    let newLines = [...lines];
    newLines.splice(e,1);
    handleChangeLines(newLines)
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

  return (
    <div className="dijkstra-info-container">
      <div className="add-line-container">
      <table className="config-table">
        <thead>
          <tr>
          <td>
            Coord 1
          </td>
          <td>
            Coord 2
          </td>
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
        <div id="connect-button" className="customButton" onClick={()=>{handleCreateLine()}}>
          Connect
        </div>
      </div>
      <table>
        <thead className="coord-table-header">
        <tr>
          <th>
            Coord 1
          </th>
          <th>
            Coord 2
          </th>
          <th>
            Distance
          </th>
          <th>
            Delete
          </th>
        </tr>
        </thead>
        <tbody>
          {
            lines.map((line,index)=> (
              <tr>
                <td>
                  {line.coord1.id}
                </td>
                <td>
                  {line.coord2.id}
                </td>
                <td>
                  {line.distance}
                </td>
                <td className="table-element-delete" onClick={() => handleDelete(index)}>
                  X
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default DijkstraInfo;
