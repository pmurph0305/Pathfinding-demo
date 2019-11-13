import { PathAlgorithm, pathNode, pathData } from "./PathAlgorithm";
import { BinaryMinHeapKV } from "./BinaryMinHeapKV";
import { GRID_ITEM_STATUS } from "../Constants/enums";

export class DualAStarAlgorithm extends PathAlgorithm {
  endX: number;
  endY: number;
  startX: number;
  startY: number;

  constructor(data: pathData) {
    super(data);
    let endXY = this.getXYForIndex(data.end);
    this.endX = endXY.x;
    this.endY = endXY.y;
    let startXY = this.getXYForIndex(data.start);
    this.startX = startXY.x;
    this.startY = startXY.y;
  }

  /**
   * Get end's x,y position for use in algorithm.
   * @returns object with endX and endY properties
   */
  getXYForIndex = (index: number) => {
    let y = Math.floor(index / this.columns);
    let x = index - y * this.columns;
    return { x, y };
  };

  /**
   * Get heuristic of dual astar algorithm
   * @param toStart get Heuristic from index to start? (true) index to end? (false):
   * @returns Manhattan distance from index to end point.
   */
  getHeuristic = (index: number, toStart: boolean) => {
    let y = Math.floor(index / this.columns);
    let x = index - y * this.columns;
    if (toStart) {
      return Math.abs(this.startY - y) + Math.abs(this.startX - x);
    } else {
      return Math.abs(this.endY - y) + Math.abs(this.endX - x);
    }
  };

  /**
   * Calculates path using the A* algorithm.
   * @param greedy Should path calculation use the greedy algorithm
   * @returns Array of numbers representing index's of path in order.
   */
  calcPath() {
    let { start, end, nodes } = this;
    let pathStartNodes = this.createNodeArray(nodes);
    let pathEndNodes = this.createNodeArray(nodes);
    let closedStart = new Set<number>();
    let closedEnd = new Set<number>();

    let gScore: number[] = new Array(pathStartNodes.length).fill(Infinity);
    gScore[start] = 0;
    gScore[end] = 0;
    let gEnd: number[] = new Array(pathEndNodes.length).fill(Infinity);
    gEnd[end] = 0;

    let fScore = [...gScore];
    fScore[start] = this.getHeuristic(start, false);
    fScore[end] = this.getHeuristic(end, true);
    let fEnd = [...gEnd];
    fEnd[end] = this.getHeuristic(end, true);

    let minheapEnd = new BinaryMinHeapKV();
    let minheapStart = new BinaryMinHeapKV();

    minheapStart.insert(fScore[start], start);
    minheapEnd.insert(fScore[end], end);

    while (!minheapEnd.isEmpty() && !minheapStart.isEmpty()) {
      let startNodeIndex = minheapStart.extractMin().value;
      let endNodeIndex = minheapEnd.extractMin().value;

      let startNode = pathStartNodes[startNodeIndex];

      // should also check if closedStart has endNode as well, but good enough for now.
      if (closedEnd.has(startNode.i)) {
        // paths have met.
        // need to add end path to start path
        let prev: number | undefined = pathEndNodes[startNode.i].prevNode;
        let cur = startNode.i;
        while (prev !== undefined && prev >= 0) {
          // set start[prev]'s prev node to start[cur]
          pathStartNodes[prev].prevNode = cur;
          cur = prev;
          prev = pathEndNodes[prev].prevNode;
        }
        this.pathNodeArray = pathStartNodes;
        return this.buildPathArray(pathStartNodes);
      }

      closedEnd.add(endNodeIndex);
      closedStart.add(startNodeIndex);

      let neighboursStart = this.getNodeNeighbours(startNodeIndex);
      let nieghboursEnd = this.getNodeNeighbours(endNodeIndex);

      neighboursStart.forEach(neighbourIndex =>
        this.doNeighbourCalculations(
          startNodeIndex,
          neighbourIndex,
          closedStart,
          pathStartNodes,
          gScore,
          fScore,
          minheapStart,
          false,
          false
        )
      );

      nieghboursEnd.forEach(neighbourIndex =>
        this.doNeighbourCalculations(
          endNodeIndex,
          neighbourIndex,
          closedEnd,
          pathEndNodes,
          gEnd,
          fEnd,
          minheapEnd,
          false,
          true
        )
      );

      this.buildCurrentStep(
        closedStart,
        pathStartNodes,
        closedEnd,
        pathEndNodes
      );
    }
    return [];
  }

  doNeighbourCalculations = (
    currentNodeIndex: number,
    neighbourIndex: number,
    closedNodes: Set<number>,
    pathNodes: pathNode[],
    gScore: number[],
    fScore: number[],
    minHeap: BinaryMinHeapKV,
    greedy: boolean,
    toStart: boolean
  ) => {
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
            newGScore + this.getHeuristic(neighbourIndex, toStart);
        } else {
          // greedy only cares about the heuristic, and its weight
          fScore[neighbourIndex] = this.getHeuristic(neighbourIndex, toStart);
        }
        // Don't need to check if minheap already contains the neighbour
        // can just re-insert it instead of updating key / re-heapifying
        // as it will be added to closedNodes if it's the lowest, and never added again.
        minHeap.insert(fScore[neighbourIndex], neighbourIndex);
      }
    }
  };

  buildCurrentStep(
    closedNodes: Set<number>,
    pathNodes: pathNode[],
    closedEnd: Set<number>,
    pathEnd: pathNode[]
  ) {
    let stepNodes: GRID_ITEM_STATUS[] = pathNodes.map((node, index) => {
      if (node.weight === 0) {
        return GRID_ITEM_STATUS.WALL;
      }
      if (node.prevNode !== undefined && closedNodes.has(index)) {
        return GRID_ITEM_STATUS.EXPLORED;
      } else if (node.prevNode !== undefined) {
        return GRID_ITEM_STATUS.EXPLORING;
      }
      return GRID_ITEM_STATUS.OPEN;
    });
    // add path end nodes as well, overwriting other ones as needed?
    pathEnd.forEach((node, index) => {
      if (
        node.prevNode !== undefined &&
        closedEnd.has(index) &&
        stepNodes[index] === GRID_ITEM_STATUS.OPEN
      ) {
        stepNodes[index] = GRID_ITEM_STATUS.EXPLORED;
      } else if (
        node.prevNode !== undefined &&
        stepNodes[index] === GRID_ITEM_STATUS.OPEN
      ) {
        stepNodes[index] = GRID_ITEM_STATUS.EXPLORING;
      }
    });

    this.pathStepArray.push(stepNodes);
  }
}
