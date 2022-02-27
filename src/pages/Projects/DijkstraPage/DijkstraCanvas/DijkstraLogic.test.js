import { isFinished, findNext, findRoute, calculateRoute} from './DijkstraLogic';

describe('IsFinished module', function () {

  test('Return finished test',() => {
    let data = [{
      adjacents: [],
      accumulated: 9999999,
      completed: true
    }]
    let value = isFinished(data)
    expect(value).toBeTruthy();
  })

  test('Return not finished test',() => {
    let data = [{
      adjacents: [],
      accumulated: 9999999,
      completed: false
    }]
    let value = isFinished(data)
    expect(value).toBeFalsy();
  })

  test('Return finished when void test',() => {
    let data = []
    let value = isFinished(data)
    expect(value).toBeTruthy();
  })

  test('Return not finished when at least one unfinished test',() => {
    let data = [{
      adjacents: [],
      accumulated: 9999999,
      completed: true
    },
    {
      adjacents: [],
      accumulated: 9999999,
      completed: false
    },
    {
      adjacents: [],
      accumulated: 9999999,
      completed: true
    }]
    let value = isFinished(data)
    expect(value).toBeFalsy();
  })

});

describe('findNext module', function () {

  test('Finds next test',() => {
    let data = [{
        adjacents: [{
          node:2,
          distance:1
        }],
        accumulated: 9999999,
        completed: true
      },
      {
        adjacents: [{
          node:1,
          distance:1
        }],
        accumulated: 9999999,
        completed: false
      }
    ]
    let value = findNext(data)
    expect(value).toBe(1);
  })

  test('All nodes completed test',() => {
    let data = [{
        adjacents: [{
          node:2,
          distance:1
        }],
        accumulated: 9999999,
        completed: true
      },
      {
        adjacents: [{
          node:1,
          distance:1
        }],
        accumulated: 9999999,
        completed: true
      }
    ]
    let value = findNext(data)
    expect(value).toBe(-1);
  })

});

describe('findRoute module', function () {

  test('Finds route test',() => {
    let data = [{
        adjacents: [{
                      node:2,
                      distance:1
                    }],
        accumulated: 0,
        completed: true
      },
      {
        adjacents: [{
                      node:1,
                      distance:2
                    },
                    {
                      node:3,
                      distance:2
                    }
                  ],
        accumulated: 1,
        completed: true
      },
      {
        adjacents: [{
                      node:2,
                      distance:3
                    }],
        accumulated: 2,
        completed: true
      }
    ]
    let value = findRoute(data,1,3,[3])
    expect(value).toStrictEqual([3,2,1]);
  })

  test('Route is disconnected test',() => {
    let data = [{
        adjacents: [{
                      node:2,
                      distance:1
                    }],
        accumulated: 0,
        completed: true
      },
      {
        adjacents: [{
                      node:1,
                      distance:2
                    },
                  ],
        accumulated: 1,
        completed: true
      },
      {
        adjacents: [{
                      node:4,
                      distance:1
                    }],
        accumulated: 0,
        completed: true
      },
      {
        adjacents: [{
                      node:3,
                      distance:2
                    }],
        accumulated: 1,
        completed: true
      }

    ]
    let value = findRoute(data,1,4,[4])
    expect(value).toStrictEqual(undefined);
  })

});

describe('Integration dijkstra', function () {

  test('Completes integration test',() => {
    let data = [
      {
        coord1:{
          x:0,
          y:0,
          id:1
        },
        coord2:{
          x:0,
          y:0,
          id:2
        },
        distance:1
      },
      {
        coord1:{
          x:0,
          y:0,
          id:2
        },
        coord2:{
          x:0,
          y:0,
          id:3
        },
        distance:1
      },
      {
        coord1:{
          x:0,
          y:0,
          id:3
        },
        coord2:{
          x:0,
          y:0,
          id:4
        },
        distance:1
      }
    ]
    let value = calculateRoute(1,3,4,data)
    expect(value).toStrictEqual([1,2,3]);
  })

  test('Node to itself test',() => {
    let data = [
      {
        coord1:{
          x:0,
          y:0,
          id:1
        },
        coord2:{
          x:0,
          y:0,
          id:2
        },
        distance:1
      },
      {
        coord1:{
          x:0,
          y:0,
          id:2
        },
        coord2:{
          x:0,
          y:0,
          id:3
        },
        distance:1
      },
      {
        coord1:{
          x:0,
          y:0,
          id:3
        },
        coord2:{
          x:0,
          y:0,
          id:4
        },
        distance:1
      }
    ]
    let value = calculateRoute(2,2,4,data)
    expect(value).toStrictEqual([2]);
  })

  test('Tries to find disconnected route test',() => {
    let data = [
      {
        coord1:{
          x:0,
          y:0,
          id:1
        },
        coord2:{
          x:0,
          y:0,
          id:2
        },
        distance:1
      },
      {
        coord1:{
          x:0,
          y:0,
          id:3
        },
        coord2:{
          x:0,
          y:0,
          id:4
        },
        distance:1
      }
    ]
    let value = calculateRoute(1,4,4,data)
    expect(value).toStrictEqual([-1]);
  })

});
