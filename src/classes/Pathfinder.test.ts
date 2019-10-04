import { Pathfinder } from "./Pathfinder";
import { PATH_ALGORITHM } from "../Constants/enums";

it("Returns a path when calcpath is called", () => {
  let testNodes = [1, 1, 1, 1, 1, 1];
  let pathFinder = new Pathfinder(testNodes, 1, 6, 0, 5);
  let path = pathFinder.calcPath();
  expect(path).toEqual(expect.arrayContaining([0, 1, 2, 3, 4, 5]));
  expect(path.length).toEqual(6);
  expect(pathFinder.nodes).toEqual(testNodes);
});
