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

  let neighbours = pathAlgorithm.getNodeNeighbours(4, 3, 3);
  expect(neighbours).toEqual(expect.arrayContaining([1, 3, 5, 7]));
  expect(neighbours.length).toEqual(4);

  let neighbours2 = pathAlgorithm.getNodeNeighbours(8, 3, 3);
  expect(neighbours2).toEqual(expect.arrayContaining([7, 5]));
  expect(neighbours2.length).toEqual(2);

  let neighbours3 = pathAlgorithm.getNodeNeighbours(5, 4, 2);
  expect(neighbours3).toEqual(expect.arrayContaining([3, 4, 7]));
  expect(neighbours3.length).toEqual(3);

  let neighbours4 = pathAlgorithm.getNodeNeighbours(0, 2, 4);
  expect(neighbours4).toEqual(expect.arrayContaining([1, 4]));
  expect(neighbours4.length).toEqual(2);

  let neighbours5 = pathAlgorithm.getNodeNeighbours(0, 1, 9);
  expect(neighbours5).toEqual([1]);
  expect(neighbours5.length).toEqual(1);
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
