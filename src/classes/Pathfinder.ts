import { PATH_ALGORITHM } from "../Constants/enums";
import { DijkstraAlgorithm } from "./DijkstraAlgorithm";
import { AStarAlgorithm } from "./AStarAlgorithm";
import { PathAlgorithm } from "./PathAlgorithm";

export class Pathfinder {
  nodes: number[];
  start: number;
  end: number;
  rows: number;
  columns: number;
  path: number[];
  pathAlgorithm: PathAlgorithm;
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
    this.pathAlgorithm = new PathAlgorithm(this.getDataObject());
  }

  private getDataObject = () => {
    return {
      nodes: this.nodes,
      rows: this.rows,
      columns: this.columns,
      start: this.start,
      end: this.end,
      path: []
    };
  };

  /**
   * Calculates and returns the path for the specified algorithm
   * @param [algorithm] Type of algorithm to use
   * @returns Array of numbers representing index's of path in order.
   */
  calcPath(algorithm?: PATH_ALGORITHM) {
    let data = this.getDataObject();
    let alg;
    switch (algorithm) {
      case PATH_ALGORITHM.ASTAR_GREEDY:
        alg = new AStarAlgorithm(data);
        this.path = alg.calcPath(true);
        break;
      case PATH_ALGORITHM.ASTAR:
        alg = new AStarAlgorithm(data);
        this.path = alg.calcPath();
        break;
      default:
        alg = new DijkstraAlgorithm(data);
        this.path = alg.calcPath();
        break;
    }
    this.pathAlgorithm = alg;
    return this.path;
  }

  getPathNodes() {
    return this.pathAlgorithm.pathNodeArray;
  }

  getPathSteps() {
    return this.pathAlgorithm.pathStepArray;
  }

  getPathStepsLength() {
    return this.pathAlgorithm.pathStepArray.length;
  }

  getNextPathStep() {
    return this.pathAlgorithm.getNextPathStep();
  }
}
