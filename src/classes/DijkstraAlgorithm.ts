import { PathAlgorithm, pathNode } from "./PathAlgorithm";

export class DijkstraAlgorithm extends PathAlgorithm {
  /**
   * Calculates path using Dijkstra's Algorithm
   * @returns path from start to end in an array.
   */
  calcPath() {
    let { start, end, rows, columns, nodes } = this;
    let pathNodes: pathNode[] = this.createNodeArray(nodes);
    // Dijkstra's Algorithm
    // Create a set of unvisited nodes called the unvisited set.
    let unvisited = new Set<number>();
    pathNodes.forEach((item, index) => {
      // assign to every node a tentative distance value
      // 0 for the start node, infinity for all other nodes.
      if (start === index) {
        item.distance = 0;
      } else {
        item.distance = Infinity;
      }
      unvisited.add(index);
    });
    // Set the initial node as the current node
    let cNode = pathNodes[start];
    while (true) {
      // For the current node, go through all of it's neighbors.
      let neighbours = this.getNodeNeighbours(cNode.i, rows, columns);
      neighbours.forEach(index => {
        // consider only unvisited neighbours. (that also aren't walls)
        if (unvisited.has(index) && pathNodes[index].weight !== 0) {
          // Calculate tentative distance through the current node
          let distance = pathNodes[index].weight + cNode.distance;
          // Compare the tentative distance to the current assigned distance
          // and assign the smaller one, and set the prevNode index so we can keep the path as well.
          if (pathNodes[index].distance > distance) {
            pathNodes[index].distance = distance;
            pathNodes[index].prevNode = cNode.i;
          }
        }
      });
      // Mark the current node as visited by removing it from the unvisited set.
      unvisited.delete(cNode.i);
      // If destination node has been visited, then stop.
      if (!unvisited.has(end)) {
        let path = [];
        let pathNode = pathNodes[end];
        while (pathNode.prevNode !== undefined) {
          path.push(pathNode.i);
          pathNode = pathNodes[pathNode.prevNode];
        }
        path.push(pathNode.i);
        path.reverse();
        this.path = path;
        return path;
      }
      // end will be infinity if it hasn't been found yet,
      // so we can use it to find the next lowest distance node.
      cNode = pathNodes[end];
      unvisited.forEach(index => {
        // select unvisited node with the smallest distance as current node.
        if (pathNodes[index].distance < cNode.distance) {
          cNode = pathNodes[index];
        }
      });
      // if the smallest distance is infinity still, there is no path, so end.
      if (cNode.distance === Infinity) {
        return [];
      }
    }
  }
}
