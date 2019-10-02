import { Pathfinder } from "./Pathfinder";

it("Gets neighbors correctly", () => {
  let testNodes = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  let pathFinder = new Pathfinder(testNodes, 3, 3, 0, 8);
  let neighbours = pathFinder.getNodeNeighbours(4, 3, 3);
  expect(neighbours).toEqual(expect.arrayContaining([1, 3, 5, 7]));
  expect(neighbours.length).toEqual(4);

  let neighbours2 = pathFinder.getNodeNeighbours(8, 3, 3);
  expect(neighbours2).toEqual(expect.arrayContaining([7, 5]));
  expect(neighbours2.length).toEqual(2);

  let neighbours3 = pathFinder.getNodeNeighbours(5, 4, 2);
  expect(neighbours3).toEqual(expect.arrayContaining([3, 4, 7]));
  expect(neighbours3.length).toEqual(3);

  let neighbours4 = pathFinder.getNodeNeighbours(0, 2, 4);
  expect(neighbours4).toEqual(expect.arrayContaining([1, 4]));
  expect(neighbours4.length).toEqual(2);

  let neighbours5 = pathFinder.getNodeNeighbours(0, 1, 9);
  expect(neighbours5).toEqual([1]);
  expect(neighbours5.length).toEqual(1);
});

it("Calculates the path", () => {
  let testNodes = [1, 1, 1, 1, 1, 1];
  let pathFinder = new Pathfinder(testNodes, 1, 6, 0, 5);
  let path = pathFinder.calcPath();
  expect(path).toEqual(expect.arrayContaining([0, 1, 2, 3, 4, 5]));
  expect(path.length).toEqual(6);
  expect(pathFinder.nodes).toEqual(testNodes);

  let pathFinder2 = new Pathfinder(testNodes, 2, 3, 5, 0);
  let path2 = pathFinder2.calcPath();
  expect(path2.length).toEqual(4);
  expect(path2).toEqual(expect.arrayContaining([0, 1, 2, 5]));
  expect(pathFinder2.path).toEqual(expect.arrayContaining([0, 1, 2, 5]));

  let testNodes2 = [1, 1, 0, 1, 1, 1];
  let pathFinder3 = new Pathfinder(testNodes2, 1, 6, 0, 5);
  let path3 = pathFinder3.calcPath();
  expect(path3).toEqual([]);
  expect(path3.length).toEqual(0);
  expect(pathFinder3.nodes).toEqual(testNodes2);
});
