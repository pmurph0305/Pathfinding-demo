import { AStarAlgorithm } from "./AStarAlgorithm";

const testDataBasic = {
  nodes: [1, 1, 1],
  start: 0,
  end: 2,
  rows: 1,
  columns: 3,
  path: []
};

const testDataNoPath = {
  nodes: [1, 0, 1],
  start: 0,
  end: 2,
  rows: 1,
  columns: 3,
  path: []
};

const testDataGreedy = {
  nodes: Array(25).fill(1),
  start: 0,
  end: 24,
  rows: 5,
  columns: 5,
  path: []
};
testDataGreedy.nodes[19] = 0;

it("Calculates heuristic properly", () => {
  let astar = new AStarAlgorithm(testDataBasic);
  let h1 = astar.getHeuristic(0);
  expect(h1).toEqual(2);

  let astar2 = new AStarAlgorithm(testDataBasic);
  let h2 = astar2.getHeuristic(2);
  expect(h2).toEqual(0);
});

it("Calculates end XY properly", () => {
  let astar = new AStarAlgorithm(testDataBasic);
  var { endX, endY } = astar.getEndXY();
  expect(endX).toEqual(2);
  expect(endY).toEqual(0);

  let astar2 = new AStarAlgorithm(testDataGreedy);
  var { endX, endY } = astar2.getEndXY();
  expect(endX).toEqual(4);
  expect(endY).toEqual(4);
});

it("Calculates a non-greedy path properly", () => {
  let aStarBasic = new AStarAlgorithm(testDataBasic);
  expect(aStarBasic.calcPath().length).toEqual(3);

  let astarNoPath = new AStarAlgorithm(testDataNoPath);
  expect(astarNoPath.calcPath().length).toEqual(0);

  let aStarNotGreedy = new AStarAlgorithm(testDataGreedy);
  expect(aStarNotGreedy.calcPath().length).toEqual(9);
});

it("Calculates a greedy path properly", () => {
  let aStarBasic = new AStarAlgorithm(testDataBasic);
  expect(aStarBasic.calcPath().length).toEqual(3);

  let astarNoPath = new AStarAlgorithm(testDataNoPath);
  expect(astarNoPath.calcPath(true).length).toEqual(0);

  let aStarGreedy = new AStarAlgorithm(testDataGreedy);
  let nonGreedyPath = aStarGreedy.calcPath();
  let greedyPath = aStarGreedy.calcPath(true);
  expect(greedyPath.length).toBeGreaterThan(nonGreedyPath.length);
  expect(greedyPath.length).toEqual(11);
});
