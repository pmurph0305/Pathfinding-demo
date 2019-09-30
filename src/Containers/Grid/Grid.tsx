import React from "react";

import "./Grid.css";

type GridProps = {
  rows: number;
  columns: number;
};

/**
 * @param nodes Nodes of the grid, 0 is not-walkable (ie a wall), all other values are the weight of going to that node.
 */
type GridState = {
  nodes: number[];
};

class Grid extends React.Component<GridProps, GridState> {
  constructor(props: GridProps) {
    super(props);

    this.state = {
      /** Nodes of the grid, 0 is not-walkable (ie a wall), all other values are the weight of going to that node. */
      nodes: new Array(props.rows * props.columns).fill(0)
    };
  }

  /**
   * Generates grid items
   * @param rows Number of rows to create
   * @param columns Number of columns to create
   * @returns array of grid__item 's
   */
  generateGridItems = (rows: number, columns: number) => {
    let gridItems = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        gridItems.push(
          <div className="grid__item" key={"gi_" + i + "_" + j}>
            {j + "," + (i - rows) * -1}
          </div>
        );
      }
    }
    return gridItems;
  };

  /**
   * Gets grid styles
   * @param rows # of rows
   * @param columns # of columns
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

  render() {
    const { rows, columns } = this.props;
    return (
      <div
        className="grid__container"
        style={this.getGridStyles(rows, columns)}
      >
        {this.generateGridItems(rows, columns)}
      </div>
    );
  }
}

export default Grid;
