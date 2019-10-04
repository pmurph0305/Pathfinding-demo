import { Pathfinder } from "./Pathfinder";
import { PATH_ALGORITHM } from "../Constants/enums";

it("Returns a path when calcpath is called for each algorithm type", () => {
  let testNodes = [1, 1, 1, 1, 1, 1];
  let pathFinder = new Pathfinder(testNodes, 1, 6, 0, 5);
  let path = pathFinder.calcPath();
  expect(path).toEqual(expect.arrayContaining([0, 1, 2, 3, 4, 5]));
  expect(path.length).toEqual(6);
  expect(pathFinder.nodes).toEqual(testNodes);

  let pathFinderAS = new Pathfinder(testNodes, 1, 6, 0, 5);
  let pathAS = pathFinderAS.calcPath(PATH_ALGORITHM.ASTAR);
  expect(pathAS).toEqual(expect.arrayContaining([0, 1, 2, 3, 4, 5]));
  expect(pathAS.length).toEqual(6);
  expect(pathFinderAS.nodes).toEqual(testNodes);

  let pathFinderASG = new Pathfinder(testNodes, 1, 6, 0, 5);
  let pathASG = pathFinderASG.calcPath(PATH_ALGORITHM.ASTAR_GREEDY);
  expect(pathASG).toEqual(expect.arrayContaining([0, 1, 2, 3, 4, 5]));
  expect(pathASG.length).toEqual(6);
  expect(pathFinderASG.nodes).toEqual(testNodes);
});
