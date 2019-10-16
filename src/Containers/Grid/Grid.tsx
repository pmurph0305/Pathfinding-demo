import React, { ChangeEvent } from "react";

import GridItem from "../../Components/GridItem/GridItem";
import { GRID_ITEM_STATUS, PATH_ALGORITHM } from "../../Constants/enums";

import "./Grid.css";
import { Pathfinder } from "../../Classes/Pathfinder";
import { pathNode } from "../../Classes/PathAlgorithm";

type GridProps = {
  rows: number;
  columns: number;
};

/**
 * @param nodes Nodes of the grid, 0 is not-walkable (ie a wall), all other values are the weight of going to that node.
 */
type GridState = {
  nodes: number[];
  path: number[];
  algorithm: PATH_ALGORITHM;
  isDragging: boolean;
  isCreatingWalls: boolean;
  dragStartIndex: number;
  dragStartInitialWeight: number;
  dragEndIndex: number;
  pathNodes: pathNode[];
  pathStep: GRID_ITEM_STATUS[];
  waitTime: number;
};

class Grid extends React.Component<GridProps, GridState> {
  constructor(props: GridProps) {
    super(props);

    this.state = {
      /** Nodes of the grid, 0 is not-walkable (ie a wall), all other values are the weight of going to that node. */
      nodes: new Array(props.rows * props.columns).fill(1),
      path: [],
      algorithm: PATH_ALGORITHM.DIJKSTRA,
      isDragging: false,
      isCreatingWalls: false,
      dragStartInitialWeight: 0,
      dragStartIndex: 0,
      dragEndIndex: 0,
      pathNodes: [],
      pathStep: new Array(props.rows * props.columns).fill(
        GRID_ITEM_STATUS.OPEN
      ),
      waitTime: 5
    };
    this.state.pathStep[0] = GRID_ITEM_STATUS.START;
    this.state.pathStep[this.state.pathStep.length - 1] = GRID_ITEM_STATUS.END;
  }

  componentDidUpdate(prevProps: GridProps) {
    if (
      this.props.columns !== prevProps.columns ||
      this.props.rows !== prevProps.rows
    ) {
      this.resetPathState(true);
    }
  }

  resetPathState = (resetNodes = false) => {
    this.setState({
      nodes: resetNodes
        ? new Array(this.props.rows * this.props.columns).fill(1)
        : this.state.nodes,
      path: [],
      pathNodes: [],
      pathStep: []
    });
  };

  /**
   * Generates grid items
   * @param rows Number of rows to create
   * @param columns Number of columns to create
   * @returns array of grid__item 's
   */
  generateGridItems = (
    rows: number,
    columns: number,
    nodes = this.state.nodes
  ) => {
    let gridItems = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        let i = y * columns + x;
        let status = this.state.pathStep[i];
        if (this.state.path.includes(i)) {
          status = GRID_ITEM_STATUS.PATH;
        }
        if (nodes[i] === 0) {
          status = GRID_ITEM_STATUS.WALL;
        }
        if (x === 0 && y === 0) {
          status = GRID_ITEM_STATUS.START;
        }
        if (x === columns - 1 && y === rows - 1) {
          status = GRID_ITEM_STATUS.END;
        }
        gridItems.push(
          <div className="item__container--square" key={"ics" + x + "_" + y}>
            <GridItem
              status={status}
              key={"gi_" + x + "_" + y}
              row={y}
              column={x}
              weight={nodes[y * columns + x] ? nodes[y * columns + x] : 0}
              index={y * columns + x}
              displayWeight={columns > 7 && rows > 7 ? false : true}
              onChange={this.onChangeNodeWeight}
              onMouseEnterGridItem={this.onMouseEnterGridItem}
              onMouseDownGridItem={this.onMouseDownGridItem}
              onMouseUpGridItem={this.onMouseUpGridItem}
              onTouchMove={this.onTouchMoveGridItem}
              onTouchEnd={this.onTouchEndGridItem}
            />
          </div>
        );
      }
    }
    return gridItems;
  };

  /**
   * Changes node at index to e.target.value
   * @param index index of element in nodes array
   */
  onChangeNodeWeight = (index: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newNodes = [...this.state.nodes];
    newNodes[index] = parseInt(e.target.value);
    this.setState({ nodes: newNodes });
  };

  /**
   * Set waitTime state of grid
   * @param val Value to set waitTime to
   */
  setWaitTime = (val: number) => {
    this.setState(state => {
      return { waitTime: val };
    });
  };

  /**
   * Gets grid styles
   * @param rows number of rows
   * @param columns number of columns
   * @returns  React.CSSProperties { width, height, gridTemplateColumns, gridTemplateRows }
   */
  getGridStyles = (rows: number, columns: number) => {
    let style = this.getGridTemplate(columns);
    Object.assign(style, this.calcGridHeightAndWidth(rows, columns));
    return style;
  };

  /**
   * Calcs grid height and width
   * @param rows numbers of rows
   * @param columns number of columns
   * @returns React.CSSProperties { width: value, height: value } as % of it's container to keep each grid item a square.
   */
  calcGridHeightAndWidth = (rows: number, columns: number) => {
    let width = 100;
    let height = 100;
    if (rows > columns) {
      width = (columns / rows) * 100;
    } else {
      height = (rows / columns) * 100;
    }
    let gridWidth: React.CSSProperties = {
      width: width + "%",
      height: height + "%"
    };
    return gridWidth;
  };

  /**
   * Gets grid template
   * @param columns number of columns
   * @returns React.CSSProperties { gridTemplateColumns: value, gridTemplateRows: value }
   */
  getGridTemplate = (columns: number) => {
    let templateColumns = "";
    for (let i = 0; i < columns; i++) {
      templateColumns += "1fr ";
    }
    let gridTemplate: React.CSSProperties = {
      gridTemplateColumns: templateColumns
    };
    return gridTemplate;
  };

  /**
   * Uses pathfinder.js and the state of the grid to
   * calculate a path and display it.
   */
  onCalculatePath = () => {
    this.resetPathState();
    let pathfinder = new Pathfinder(
      this.state.nodes,
      this.props.rows,
      this.props.columns,
      0,
      this.state.nodes.length - 1
    );
    let path = pathfinder.calcPath(this.state.algorithm);
    let pathNodes = pathfinder.getPathNodes();
    this.setState({ path: path, pathNodes: pathNodes });
  };

  onCalculatePathSteps = () => {
    this.resetPathState();
    let pathfinder = new Pathfinder(
      this.state.nodes,
      this.props.rows,
      this.props.columns,
      0,
      this.state.nodes.length - 1
    );
    pathfinder.calcPath(this.state.algorithm);
    this.DisplayPathSteps(pathfinder);
  };

  async DisplayPathSteps(pathfinder: Pathfinder) {
    let steps = pathfinder.getPathStepsLength();
    let path = pathfinder.path;
    for (let i = 0; i < steps; i++) {
      this.setState({ pathStep: pathfinder.getNextPathStep() });
      await this.wait(this.state.waitTime);
    }
    this.setState({ path: path });
  }

  wait = (ms: number) => new Promise(res => setTimeout(res, ms));

  /**
   * Changes the algorithm state based on select elements value.
   */
  onChangeAlgorithm = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ algorithm: parseInt(e.target.value) });
  };

  /**
   * Sets is dragging to false, and the dragEndIndex to index.
   * Changes the node at index to a wall or open if that nodes weight wasn't
   * changed between MouseDown & MouseUp.
   * @param index index of node array that mouseup event was called on.
   */
  stopDragAt = (index: number) => {
    // it was a mouse click
    if (
      this.state.dragStartIndex === index &&
      this.state.dragStartInitialWeight === this.state.nodes[index]
    ) {
      let nodes = [...this.state.nodes];
      nodes[index] = this.state.isCreatingWalls ? 0 : 1;
      this.setState(state => {
        return {
          isDragging: false,
          dragEndIndex: index,
          nodes: nodes
        };
      });
    } else {
      // it was actually a drag.
      this.setState(state => {
        return { isDragging: false, dragEndIndex: index };
      });
    }
  };

  /**
   * Sets isdragging state to false
   * Used for when mouse exits grid area on drag,
   * or if touch event ends.
   */
  stopDrag = () => {
    // Would need an index to call stopDragAt, which would need a
    // last updated index state.
    this.setState(state => {
      return { isDragging: false };
    });
  };

  /**
   * Updates state of isDragging to true, dragStartIndex to index,
   * dragStartInitialWeight to node at index's weight,
   * sets isCreatingWalls state based on node at index's weight
   * @param index index in node array that mousedown was called on.
   */
  startDragAt = (index: number) => {
    this.resetPathState();
    this.setState(state => {
      return {
        isDragging: true,
        dragStartIndex: index,
        dragStartInitialWeight: this.state.nodes[index],
        isCreatingWalls: this.state.nodes[index] === 0 ? false : true
      };
    });
  };

  /**
   * If user is dragging, changes node weight to 0 or 1
   * depending on if they started dragging on a wall or open node,
   * and updates the node state.
   * @param index index in node array that mouse entered
   */
  continueDragAt = (index: number) => {
    if (this.state.isDragging) {
      if (index !== this.state.dragStartIndex) {
        // User is dragging, so switch between walls & open tiles.
        let nodes = [...this.state.nodes];
        nodes[index] = this.state.isCreatingWalls ? 0 : 1;
        nodes[this.state.dragStartIndex] = nodes[index];
        this.setState(state => {
          return { nodes: nodes };
        });
      }
    }
  };

  /**
   * Update drag state variables on mouse down.
   * @param index index in node array that mousedown was called on.
   */
  onMouseDownGridItem = (index: number) => (e: React.MouseEvent) => {
    this.startDragAt(index);
  };

  /**
   * Update drag state on mouse up.
   * @param index index of node array that mouseup event was called on.
   */
  onMouseUpGridItem = (index: number) => (e: React.MouseEvent) => {
    this.stopDragAt(index);
  };

  /**
   * Upgrade node state on mouse enter
   * @param index index in node array that mouse entered
   */
  onMouseEnterGridItem = (index: number) => (e: React.MouseEvent) => {
    this.continueDragAt(index);
  };

  /**
   * Sets state of dragging to false
   */
  onMouseExitGrid = (e: React.MouseEvent) => {
    this.stopDrag();
  };

  /**
   * Updates state for nodes & dragging based on element touch is over.
   */
  onTouchMoveGridItem = (e: React.TouchEvent) => {
    let el = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );
    // need to make sure we have a valid element & valid data.
    if (el !== null) {
      let data = el.getAttribute("data-index");
      if (data !== null) {
        let index = parseInt(data);
        if (this.state.isDragging === false) {
          this.startDragAt(index);
        } else {
          this.continueDragAt(index);
        }
      }
    }
  };

  /**
   * Sets is dragging state to false.
   */
  onTouchEndGridItem = (e: React.TouchEvent) => {
    this.stopDrag();
  };

  render() {
    const { rows, columns } = this.props;
    const { nodes, waitTime } = this.state;
    return (
      <>
        <div
          className="grid__container"
          style={this.getGridStyles(rows, columns)}
          onMouseLeave={this.onMouseExitGrid}
        >
          {this.generateGridItems(rows, columns, nodes)}
        </div>
        <div className="grid__flexContainer">
          <div className="flex__innerContainer">
            <button
              id="calc_path"
              className="flex__button"
              onClick={this.onCalculatePath}
            >
              Calculate Path
            </button>
            <button
              id="calc_path_steps"
              className="flex__button"
              onClick={this.onCalculatePathSteps}
            >
              Show Path Steps
            </button>
          </div>
          <div className="flex__innerContainer">
            <div className="input__container">
              <label htmlFor="select_algorithm">Algorithm:</label>
              <select
                id="select_algorithm"
                className="input__item"
                onChange={this.onChangeAlgorithm}
              >
                <option value={PATH_ALGORITHM.DIJKSTRA}>Dijkstra</option>
                <option value={PATH_ALGORITHM.ASTAR}>A*</option>
                <option value={PATH_ALGORITHM.ASTAR_GREEDY}>A* Greedy</option>
              </select>
            </div>
            <div className="input__container">
              <label htmlFor="waitTime">Step Delay Time:</label>
              <input
                id="waitTime"
                className="input__item"
                type="number"
                min={3}
                value={waitTime}
                onChange={e => this.setWaitTime(parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Grid;
