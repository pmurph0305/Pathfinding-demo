import { AStarAlgorithm } from "./AStarAlgorithm";

const testData = {
  nodes: [1, 1, 1, 1, 1, 1],
  start: 0,
  end: 5,
  rows: 1,
  columns: 6,
  path: []
};

const testData2 = {
  nodes: [1, 1, 1, 1, 1, 1],
  rows: 2,
  columns: 3,
  start: 5,
  end: 0,
  path: []
};

it("Calculates heuristic properly", () => {
  let astar = new AStarAlgorithm(testData);
  let h1 = astar.getHeuristic(0);
  expect(h1).toEqual(5);

  let astar2 = new AStarAlgorithm(testData2);
  let h2 = astar2.getHeuristic(2);
  expect(h2).toEqual(2);
});

it("Calculates end XY properly", () => {
  let astar = new AStarAlgorithm(testData);
  var { endX, endY } = astar.getEndXY();
  expect(endX).toEqual(5);
  expect(endY).toEqual(0);

  let astar2 = new AStarAlgorithm(testData2);
  var { endX, endY } = astar2.getEndXY();
  expect(endX).toEqual(0);
  expect(endY).toEqual(0);
});

it("Calculates a path properly", () => {
  let astar = new AStarAlgorithm(testData);
  let path = astar.calcPath();
  expect([0, 1, 2, 3, 4, 5]).toEqual(expect.arrayContaining(path));

  let astar2 = new AStarAlgorithm(testData2);
  let path2 = astar2.calcPath();
  expect([5, 4, 3, 0]).toEqual(expect.arrayContaining(path2));
});
