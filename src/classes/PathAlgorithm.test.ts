import { PathAlgorithm } from "./PathAlgorithm";

it("Gets neighbors correctly", () => {
  let testData = {
    nodes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    start: 0,
    end: 8,
    rows: 3,
    columns: 3,
    path: []
  };
  let pathAlgorithm = new PathAlgorithm(testData);

  let neighbours = pathAlgorithm.getNodeNeighbours(4);
  expect(neighbours).toEqual(expect.arrayContaining([1, 3, 5, 7]));
  expect(neighbours.length).toEqual(4);

  let neighbours2 = pathAlgorithm.getNodeNeighbours(0);
  expect(neighbours2).toEqual(expect.arrayContaining([1, 3]));
  expect(neighbours2.length).toEqual(2);

  let testData2 = {
    nodes: [1, 1, 1, 1, 1, 1, 1, 1],
    start: 0,
    end: 8,
    rows: 4,
    columns: 2,
    path: []
  };
  let pathAlgorithm2 = new PathAlgorithm(testData2);
  let neighbours3 = pathAlgorithm2.getNodeNeighbours(5);
  expect(neighbours3).toEqual(expect.arrayContaining([3, 4, 7]));
  expect(neighbours3.length).toEqual(3);

  let neighbours4 = pathAlgorithm2.getNodeNeighbours(7);
  expect(neighbours4).toEqual(expect.arrayContaining([5, 6]));
  expect(neighbours4.length).toEqual(2);

  let bigTest = {
    nodes: new Array(121).fill(1),
    start: 0,
    end: 120,
    rows: 11,
    columns: 11,
    path: []
  };
  let pathAlgorithm3 = new PathAlgorithm(bigTest);
  let neighbours1 = pathAlgorithm3.getNodeNeighbours(1);
  expect(neighbours3.length).toEqual(3);
});

it("creates the node array correctly", () => {
  let testData = {
    nodes: [1, 3],
    start: 0,
    end: 1,
    rows: 1,
    columns: 2,
    path: []
  };
  let pathAlgorithm = new PathAlgorithm(testData);
  let nodeArray = pathAlgorithm.createNodeArray(testData.nodes);
  expect([
    { distance: 0, i: 0, weight: 1 },
    { distance: 0, i: 1, weight: 3 }
  ]).toEqual(expect.arrayContaining(nodeArray));
});

it("builds path array correctly", () => {
  let testData = {
    nodes: [1, 3, 3],
    start: 0,
    end: 1,
    rows: 1,
    columns: 2,
    path: []
  };
  let pathAlgorithm = new PathAlgorithm(testData);
  let nodeArray = pathAlgorithm.createNodeArray(testData.nodes);
  nodeArray[1].prevNode = 0;
  let path = pathAlgorithm.buildPathArray(nodeArray);
  expect([0, 1]).toEqual(expect.arrayContaining(path));
});
