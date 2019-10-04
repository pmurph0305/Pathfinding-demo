export type pathNode = {
  i: number;
  distance: number;
  weight: number;
  prevNode?: number;
};

export type pathData = {
  nodes: number[];
  start: number;
  end: number;
  rows: number;
  columns: number;
  path: number[];
};

export class PathAlgorithm {
  nodes: number[];
  start: number;
  end: number;
  rows: number;
  columns: number;
  path: number[];
  constructor(data: pathData) {
    this.nodes = data.nodes;
    this.rows = data.rows;
    this.columns = data.columns;
    this.start = data.start;
    this.end = data.end;
    this.path = [];
  }

  /**
   * Creates the array of pathNode's
   * @param nodes array of nodes with weights
   * @returns array of pathNode's
   */
  createNodeArray(nodes: number[]) {
    let nodeArray: pathNode[] = nodes.map((value, i) => {
      return { i, distance: 0, weight: value, prevNode: undefined };
    });
    return nodeArray;
  }

  /**
   * Gets the indexes of the nodes neighbours.
   * @param index index of node to get neighbours for.
   * @returns array of neighbours by index
   */
  getNodeNeighbours(index: number) {
    let { rows, columns } = this;
    let neighbours = [];
    // x & y values:
    let y = Math.floor(index / columns);
    let x = index - y * columns;
    // right & left neighbors
    if (x - 1 >= 0) {
      neighbours.push(index - 1);
    }
    if (x + 1 < columns) {
      neighbours.push(index + 1);
    }
    // up / down neighbors
    if (y - 1 >= 0) {
      neighbours.push(index - columns);
    }
    if (y + 1 < rows) {
      neighbours.push(index + columns);
    }
    return neighbours;
  }

  /**
   * Builds the array of the path taken to reach the end node.
   * @param pathNodes array containing the calculated path data
   * @returns Array of numbers representing index's of path in order.
   */
  buildPathArray(pathNodes: pathNode[]) {
    let path = [];
    let pathNode = pathNodes[this.end];
    while (pathNode.prevNode !== undefined) {
      path.push(pathNode.i);
      pathNode = pathNodes[pathNode.prevNode];
    }
    path.push(pathNode.i);
    path.reverse();
    this.path = path;
    return path;
  }
}
