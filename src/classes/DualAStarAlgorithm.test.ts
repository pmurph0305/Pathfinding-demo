import { DualAStarAlgorithm } from "./DualAStarAlgorithm";

const testData = {
  nodes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
  start: 0,
  end: 8,
  rows: 3,
  columns: 3,
  path: []
};

it("Calculates start & end coordinates correctly", () => {
  let dual = new DualAStarAlgorithm(testData);

  var { x, y } = dual.getXYForIndex(8);
  expect(y).toEqual(2);
  expect(x).toEqual(2);

  var { x, y } = dual.getXYForIndex(0);
  expect(y).toEqual(0);
  expect(x).toEqual(0);

  var { x, y } = dual.getXYForIndex(4);
  expect(x).toEqual(1);
  expect(y).toEqual(1);
});

it("Calculates heurstic correctly", () => {
  let dual = new DualAStarAlgorithm(testData);
  let h1 = dual.getHeuristic(1, false);
  expect(h1).toEqual(3);

  let h2 = dual.getHeuristic(1, true);
  expect(h2).toEqual(1);

  let h3 = dual.getHeuristic(8, true);
  expect(h3).toEqual(4);
});

it("Calculates a path correctly", () => {
  let dual = new DualAStarAlgorithm(testData);
  expect(dual.calcPath().length).toEqual(5);
});
