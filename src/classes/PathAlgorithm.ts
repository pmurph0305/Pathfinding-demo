export type pathNode = {
  i: number;
  distance: number;
  weight: number;
  prevNode?: number;
};

type pathData = {
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
   * @param rows numbers of rows in grid
   * @param columns number of columns in grid
   * @returns array of neighbours by index
   */
  getNodeNeighbours(index: number, rows: number, columns: number) {
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
