export function calculateRoute(init, last, totalCoords, lines){
  if (init == last) {
    return [init]
  }
  let adjacentNodes = [];
  let adjacents = [];
  let nextNode = -1;
  for (var j = 0; j < totalCoords; j++) {
    adjacentNodes.push({
      adjacents: [],
      accumulated: 9999999,
      completed: false
    })
  }
  for (var i = 0; i < lines.length; i++) {
      adjacentNodes[lines[i].coord1.id-1].adjacents.push({
        node: lines[i].coord2.id,
        distance: lines[i].distance
      })
      adjacentNodes[lines[i].coord2.id-1].adjacents.push({
        node: lines[i].coord1.id,
        distance: lines[i].distance
      })
      lines.splice(i,1);
      i--;
  }
  adjacentNodes[init-1].accumulated=0;
  adjacentNodes[init-1].completed=true;
  nextNode = init-1;
  let emergency=0;
  do {
    emergency++

    for (var i = 0; i < adjacentNodes[nextNode].adjacents.length; i++) {
      adjacentNodes[nextNode].adjacents[i].distance += adjacentNodes[nextNode].accumulated;
      if ( adjacentNodes[nextNode].adjacents[i].distance < adjacentNodes[adjacentNodes[nextNode].adjacents[i].node-1].accumulated) {
        adjacentNodes[adjacentNodes[nextNode].adjacents[i].node-1].accumulated =  adjacentNodes[nextNode].adjacents[i].distance;
      }
    }
    nextNode = findNext(adjacentNodes)
    try{
      adjacentNodes[nextNode].completed=true;
    }catch(e){
      return [-1]
    }

  } while (!isFinished(adjacentNodes));
  return (findRoute(adjacentNodes, init, last, [last]).reverse())

}

export function isFinished(adjacents){
  let complete = true;
  for (var i = 0; i < adjacents.length; i++) {
    if (!adjacents[i].completed) {
      complete = false
    }
  }
  return complete;
}

export function findNext(adjacentNodes){
  let lowest = 9999999;
  let next = -1;
  for (var i = 0; i < adjacentNodes.length; i++) {
    if (adjacentNodes[i].completed) {
      for (var j = 0; j < adjacentNodes[i].adjacents.length; j++) {
        if (!adjacentNodes[adjacentNodes[i].adjacents[j].node-1].completed) {
          if (adjacentNodes[i].adjacents[j].distance < lowest) {
            lowest = adjacentNodes[i].adjacents[j].distance;
            next = adjacentNodes[i].adjacents[j].node-1;
          }
        }
      }
    }
  }
  return next;
}

export function findRoute(adjacentNodes, init, last, currentRoute){
  let nextToFind = last;
  for (var i = 0; i < adjacentNodes.length; i++) {
    for (var j = 0; j < adjacentNodes[i].adjacents.length; j++) {
      if ( adjacentNodes[i].adjacents[j].node == nextToFind && adjacentNodes[i].adjacents[j].distance == adjacentNodes[nextToFind-1].accumulated) {
        nextToFind = i+1;
        currentRoute.push(nextToFind);

        if (nextToFind == init) {
          return currentRoute
        }else{
          return findRoute(adjacentNodes, init, nextToFind, currentRoute)
        }
      }
    }
  }
}



export default calculateRoute;
