import { PATH_ALGORITHM } from "../Constants/enums";
import { DijkstraAlgorithm } from "./DijkstraAlgorithm";
import { AStarAlgorithm } from "./AStarAlgorithm";

export class Pathfinder {
  nodes: number[];
  start: number;
  end: number;
  rows: number;
  columns: number;
  path: number[];
  constructor(
    nodes: number[],
    rows: number,
    columns: number,
    start: number,
    end: number
  ) {
    this.nodes = nodes;
    this.rows = rows;
    this.columns = columns;
    this.start = start;
    this.end = end;
    this.path = [];
  }

  /**
   * Calculates and returns the path for the specified algorithm
   * @param [algorithm] Type of algorithm to use
   * @returns Array of numbers representing index's of path in order.
   */
  calcPath(algorithm?: PATH_ALGORITHM) {
    let data = {
      nodes: this.nodes,
      rows: this.rows,
      columns: this.columns,
      start: this.start,
      end: this.end,
      path: []
    };
    let alg;
    switch (algorithm) {
      case PATH_ALGORITHM.ASTAR_GREEDY:
        alg = new AStarAlgorithm(data);
        return alg.calcPath(true);
      case PATH_ALGORITHM.ASTAR:
        alg = new AStarAlgorithm(data);
        return alg.calcPath();
      default:
        alg = new DijkstraAlgorithm(data);
        return alg.calcPath();
    }
  }
}
