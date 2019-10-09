import React, { ChangeEvent } from "react";

import GridItem from "../../Components/GridItem/GridItem";
import { GRID_ITEM_STATUS, PATH_ALGORITHM } from "../../Constants/enums";

import "./Grid.css";
import { Pathfinder } from "../../Classes/Pathfinder";

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
      dragEndIndex: 0
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

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
        let status = GRID_ITEM_STATUS.OPEN;
        if (this.state.path.includes(y * columns + x)) {
          status = GRID_ITEM_STATUS.PATH;
        }
        if (x === 0 && y === 0) {
          status = GRID_ITEM_STATUS.START;
        }
        if (x === columns - 1 && y === rows - 1) {
          status = GRID_ITEM_STATUS.END;
        }
        if (nodes[y * columns + x] === 0) {
          status = GRID_ITEM_STATUS.WALL;
        }
        gridItems.push(
          <GridItem
            status={status}
            key={"gi_" + x + "_" + y}
            row={y}
            column={x}
            weight={nodes[y * columns + x]}
            index={y * columns + x}
            onChange={this.onChangeNodeWeight}
            onMouseEnterGridItem={this.onMouseEnterGridItem}
            onMouseDownGridItem={this.onMouseDownGridItem}
            onMouseUpGridItem={this.onMouseUpGridItem}
            onTouchMove={this.onTouchMoveGridItem}
            onTouchEnd={this.onTouchEndGridItem}
          />
        );
      }
    }
    return gridItems;
  };

  /**
   * Determines whether change node weight on
   * @param index index of element in nodes array
   */
  onChangeNodeWeight = (row: number, column: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let { columns } = this.props;
    let newNodes = [...this.state.nodes];
    newNodes[row * columns + column] = parseInt(e.target.value);
    this.setState({ nodes: newNodes });
  };

  /**
   * Gets grid styles
   * @param rows number of rows
   * @param columns number of columns
   * @returns  React.CSSProperties { width, height, gridTemplateColumns, gridTemplateRows }
   */
  getGridStyles = (rows: number, columns: number) => {
    let style = this.getGridTemplate(rows, columns);
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
   * @param rows numbers of rows
   * @param columns number of columns
   * @returns React.CSSProperties { gridTemplateColumns: value, gridTemplateRows: value }
   */
  getGridTemplate = (rows: number, columns: number) => {
    let templateColumns = "";
    for (let i = 0; i < columns; i++) {
      templateColumns += 100 / columns + "% ";
    }
    let templateRows = "";
    for (let i = 0; i < rows; i++) {
      templateRows += 100 / rows + "% ";
    }
    let gridTemplate: React.CSSProperties = {
      gridTemplateColumns: templateColumns,
      gridTemplateRows: templateRows
    };
    return gridTemplate;
  };

  /**
   * Uses pathfinder.js and the state of the grid to
   * calculate a path and display it.
   */
  onCalculatePath = () => {
    let pathfinder = new Pathfinder(
      this.state.nodes,
      this.props.rows,
      this.props.columns,
      0,
      this.state.nodes.length - 1
    );
    let path = pathfinder.calcPath(this.state.algorithm);
    this.setState({ path: path });
  };

  /**
   * Changes the algorithm state based on select elements value.
   */
  onChangeAlgorithm = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ algorithm: parseInt(e.target.value) });
  };

  /**
   * Updates state of isDragging to true, dragStartIndex to index,
   * dragStartInitialWeight to node at index's weight,
   * sets isCreatingWalls state based on node at index's weight
   * @param index index in node array that mousedown was called on.
   */
  onMouseDownGridItem = (index: number) => (e: React.MouseEvent) => {
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
   * Sets is dragging to false, and the dragEndIndex to index.
   * Changes the node at index to a wall or open if that nodes weight wasn't
   * changed between MouseDown & MouseUp.
   * @param index index of node array that mouseup event was called on.
   */
  onMouseUpGridItem = (index: number) => (e: React.MouseEvent) => {
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
      this.setState(state => {
        return { isDragging: false, dragEndIndex: index };
      });
    }
  };

  /**
   * If user is dragging, changes node weight to 0 or 1
   * depending on if they started dragging on a wall or open node,
   * and updates the node state.
   * @param index index in node array that mouse entered
   */
  onMouseEnterGridItem = (index: number) => (e: React.MouseEvent) => {
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
   * Sets state of dragging to false
   */
  onMouseExitGrid = (e: React.MouseEvent) => {
    this.setState(state => {
      return { isDragging: false };
    });
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
          // set state to dragging if its not & start index / creating walls.
          this.setState(state => {
            return {
              isDragging: true,
              dragStartIndex: index,
              dragStartInitialWeight: this.state.nodes[index],
              isCreatingWalls: this.state.nodes[index] === 0 ? false : true
            };
          });
        } else {
          // update the node list.
          let nodes = [...this.state.nodes];
          nodes[index] = this.state.isCreatingWalls ? 0 : 1;
          nodes[this.state.dragStartIndex] = nodes[index];
          this.setState(state => {
            return { nodes: nodes };
          });
        }
      }
    }
  };

  /**
   * Sets is dragging state to false.
   */
  onTouchEndGridItem = (e: React.TouchEvent) => {
    this.setState(state => {
      return { isDragging: false };
    });
  };

  render() {
    const { rows, columns } = this.props;
    const { nodes } = this.state;
    return (
      <>
        <div
          className="grid__container"
          style={this.getGridStyles(rows, columns)}
          onMouseLeave={this.onMouseExitGrid}
        >
          {this.generateGridItems(rows, columns, nodes)}
        </div>
        <button id="calc_path" onClick={this.onCalculatePath}>
          Calculate Path
        </button>
        <select id="select_algorithm" onChange={this.onChangeAlgorithm}>
          <option value={PATH_ALGORITHM.DIJKSTRA}>Dijkstra</option>
          <option value={PATH_ALGORITHM.ASTAR}>A*</option>
          <option value={PATH_ALGORITHM.ASTAR_GREEDY}>A* Greedy</option>
        </select>
      </>
    );
  }
}

export default Grid;
