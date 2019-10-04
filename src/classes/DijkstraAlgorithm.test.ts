import { DijkstraAlgorithm } from "./DijkstraAlgorithm";

it("calculates the path correctly with dijkstra", () => {
  let testData = {
    nodes: [1, 1, 1, 1, 1, 1],
    rows: 1,
    columns: 6,
    start: 0,
    end: 5,
    path: []
  };
  let djikstra = new DijkstraAlgorithm(testData);
  let path = djikstra.calcPath();
  expect(path).toEqual(expect.arrayContaining([0, 1, 2, 3, 4, 5]));
  expect(path.length).toEqual(6);
  expect(djikstra.nodes).toEqual(testData.nodes);

  let testData2 = {
    nodes: [1, 1, 1, 1, 1, 1],
    rows: 2,
    columns: 3,
    start: 5,
    end: 0,
    path: []
  };
  let djikstra2 = new DijkstraAlgorithm(testData2);
  let path2 = djikstra2.calcPath();
  expect(path2.length).toEqual(4);
  expect(path2).toEqual(expect.arrayContaining([0, 1, 2, 5]));
  expect(djikstra2.path).toEqual(expect.arrayContaining([0, 1, 2, 5]));

  let testData3 = {
    nodes: [1, 1, 0, 1, 1, 1],
    rows: 1,
    columns: 6,
    start: 0,
    end: 5,
    path: []
  };
  let testNodes3 = [1, 1, 0, 1, 1, 1];
  let djikstra3 = new DijkstraAlgorithm(testData3);
  let path3 = djikstra3.calcPath();
  expect(path3).toEqual([]);
  expect(path3.length).toEqual(0);
  expect(djikstra3.nodes).toEqual(testData3.nodes);
});
