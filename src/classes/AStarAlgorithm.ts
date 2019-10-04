import { PathAlgorithm, pathNode, pathData } from "./PathAlgorithm";

export class AStarAlgorithm extends PathAlgorithm {
  endX: number;
  endY: number;

  constructor(data: pathData) {
    super(data);

    let { endX, endY } = this.getEndXY();
    this.endX = endX;
    this.endY = endY;
  }

  calcPath() {
    let { start, end, nodes } = this;
    let pathNodes: pathNode[] = this.createNodeArray(nodes);

    // array of nodes that can still be explored
    let openNodes = [start];
    // nodes that have been explored
    let closedNodes = new Set<number>();

    // the cost of the cheapest path from start to n currently known
    let gScore = new Array(pathNodes.length).fill(Infinity);
    gScore[start] = 0;

    // fScore[n] = gScores[n] + heuristic(n)
    let fScore = [...gScore];
    fScore[start] = this.getHeuristic(start);

    while (openNodes.length > 0) {
      // get lowest fscore node in currently open nodes.
      let currentNodeIndex = openNodes.reduce((acc, cur) => {
        return fScore[cur] < fScore[acc] ? cur : acc;
      });
      let currentNode = pathNodes[currentNodeIndex];
      if (currentNode.i === end) {
        return this.buildPathArray(pathNodes);
      }
      // remove current node from open nodes
      openNodes.splice(openNodes.indexOf(currentNodeIndex), 1);
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
            fScore[neighbourIndex] =
              newGScore + this.getHeuristic(neighbourIndex);
            if (!openNodes.includes(neighbourIndex)) {
              openNodes.push(neighbourIndex);
            }
          }
        }
      });
    }
    return [];
  }

  getEndXY = () => {
    let endY = Math.floor(this.end / this.columns);
    let endX = this.end - endY * this.columns;
    return { endX, endY };
  };

  getHeuristic = (index: number) => {
    let y = Math.floor(index / this.columns);
    let x = index - y * this.columns;
    return Math.abs(this.endY - y) + Math.abs(this.endX - x);
  };
}
