import { PathAlgorithm, pathNode, pathData } from "./PathAlgorithm";
import { BinaryMinHeapKV } from "./BinaryMinHeapKV";

export class AStarAlgorithm extends PathAlgorithm {
  endX: number;
  endY: number;

  constructor(data: pathData) {
    super(data);

    let { endX, endY } = this.getEndXY();
    this.endX = endX;
    this.endY = endY;
  }

  /**
   * Calculates path using the A* algorithm.
   * @param greedy Should path calculation use the greedy algorithm
   * @returns Array of numbers representing index's of path in order.
   */
  calcPath(greedy: boolean = false) {
    let { start, end, nodes } = this;
    let pathNodes: pathNode[] = this.createNodeArray(nodes);

    // nodes that have been explored
    let closedNodes = new Set<number>();

    // the cost of the cheapest path from start to n currently known
    let gScore = new Array(pathNodes.length).fill(Infinity);
    gScore[start] = 0;

    // fScore[n] = gScores[n] + heuristic(n)
    let fScore = [...gScore];
    fScore[start] = this.getHeuristic(start);

    // min heap of nodes that can still be explored
    let minHeap = new BinaryMinHeapKV();
    minHeap.insert(this.getHeuristic(start), start);

    while (!minHeap.isEmpty()) {
      // get lowest fscore node in minheap.
      let currentNodeIndex = minHeap.extractMin().value;
      let currentNode = pathNodes[currentNodeIndex];
      if (currentNode.i === end) {
        this.pathNodeArray = pathNodes;
        return this.buildPathArray(pathNodes);
      }

      closedNodes.add(currentNodeIndex);
      let neighbours = this.getNodeNeighbours(currentNode.i);
      neighbours.forEach(neighbourIndex => {
        if (closedNodes.has(neighbourIndex)) {
          return;
        }
        // if it's not a wall.
        if (pathNodes[neighbourIndex].weight !== 0) {
          // Calculate a new gScore.
          let newGScore =
            gScore[currentNodeIndex] + pathNodes[neighbourIndex].weight;
          if (newGScore < gScore[neighbourIndex]) {
            // Update gscore, fScore, prevNode, and add to the openNodes array.
            pathNodes[neighbourIndex].prevNode = currentNodeIndex;
            gScore[neighbourIndex] = newGScore;

            if (!greedy) {
              // non-greedy cares about the weight to the node as well.
              fScore[neighbourIndex] =
                newGScore + this.getHeuristic(neighbourIndex);
            } else {
              // greedy only cares about the heuristic, and its weight
              fScore[neighbourIndex] =
                pathNodes[neighbourIndex].weight +
                this.getHeuristic(neighbourIndex);
            }

            // Don't need to check if minheap already contains the neighbour
            // can just re-insert it instead of updating key / re-heapifying
            // as it will be added to closedNodes if it's the lowest, and never added again.
            minHeap.insert(fScore[neighbourIndex], neighbourIndex);
          }
        }
      });
    }
    return [];
  }

  /**
   * Get end's x,y position for use in algorithm.
   * @returns object with endX and endY properties
   */
  getEndXY = () => {
    let endY = Math.floor(this.end / this.columns);
    let endX = this.end - endY * this.columns;
    return { endX, endY };
  };

  /**
   * Calculates the heuristic for the current index in a* algorithm by manhattan distance
   * @returns Manhattan distance from index to end position.
   */
  getHeuristic = (index: number) => {
    let y = Math.floor(index / this.columns);
    let x = index - y * this.columns;
    return Math.abs(this.endY - y) + Math.abs(this.endX - x);
  };
}
