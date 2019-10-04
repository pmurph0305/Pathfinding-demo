import { PATH_ALGORITHM } from "../Constants/enums";
import { DijkstraAlgorithm } from "./DijkstraAlgorithm";
import { AStarAlgorithm } from "./AStarAlgorithm";

type pathNode = {
  i: number;
  distance: number;
  weight: number;
  prevNode?: number;
};

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
   * Creates the array of pathNode's
   * @param nodes array of nodes with weights
   * @returns array of pathNode's
   */
  private createNodeArray(nodes: number[]) {
    let nodeArray = nodes.map((value, i) => {
      return { i, distance: 0, weight: value };
    });
    return nodeArray;
  }

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
      case PATH_ALGORITHM.ASTAR:
        alg = new AStarAlgorithm(data);
        return alg.calcPath();
      default:
        alg = new DijkstraAlgorithm(data);
        return alg.calcPath();
    }
  }
}
