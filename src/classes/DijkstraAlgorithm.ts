import { PathAlgorithm, pathNode } from "./PathAlgorithm";

export class DijkstraAlgorithm extends PathAlgorithm {
  /**
   * Calculates path using Dijkstra's Algorithm
   * @returns Array of numbers representing index's of path in order.
   */
  calcPath() {
    let { start, end, nodes } = this;
    let pathNodes: pathNode[] = this.createNodeArray(nodes);
    // Dijkstra's Algorithm
    // Create a set of unvisited nodes called the unvisited set.
    //let unvisited = new Set<number>();
    let unvisited: number[] = [];
    pathNodes.forEach((item, index) => {
      // assign to every node a tentative distance value
      // 0 for the start node, infinity for all other nodes.
      if (start === index) {
        item.distance = 0;
      } else {
        item.distance = Infinity;
      }
      unvisited.push(index);
    });
    // Set the initial node as the current node
    let cNode = pathNodes[start];
    while (true) {
      // For the current node, go through all of it's neighbors.
      let neighbours = this.getNodeNeighbours(cNode.i);
      // These also prevent the esLint no-loop-func error.
      let cDistance = cNode.distance;
      let cIndex = cNode.i;
      neighbours.forEach(index => {
        // consider only unvisited neighbours. (that also aren't walls)
        if (unvisited.includes(index) && pathNodes[index].weight !== 0) {
          // Calculate tentative distance through the current node
          let distance = pathNodes[index].weight + cDistance;
          // Compare the tentative distance to the current assigned distance
          // and assign the smaller one, and set the prevNode index so we can keep the path as well.
          if (pathNodes[index].distance > distance) {
            pathNodes[index].distance = distance;
            pathNodes[index].prevNode = cIndex;
          }
        }
      });

      // Mark the current node as visited by removing it from the unvisited set.
      unvisited.splice(unvisited.indexOf(cNode.i), 1);
      // If destination node has been visited, then stop.
      if (!unvisited.includes(end)) {
        return this.buildPathArray(pathNodes);
      }
      // end will be infinity if it hasn't been found yet,
      // so we can use it to find the next lowest distance node.
      let smallestDistIndex = end; // prevents no-loop-func EsLint error that occurs if you directly use cNode.
      unvisited.forEach(index => {
        // select unvisited node with the smallest distance as current node.
        if (pathNodes[index].distance < pathNodes[smallestDistIndex].distance) {
          smallestDistIndex = index;
        }
      });
      cNode = pathNodes[smallestDistIndex];
      // if the smallest distance is infinity still, there is no path, so end.
      if (cNode.distance === Infinity) {
        return [];
      }
    }
  }
}
