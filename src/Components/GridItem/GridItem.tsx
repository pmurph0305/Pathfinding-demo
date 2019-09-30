import React from "react";

import "./GridItem.css";
import { GRID_ITEM_STATUS } from "../../Constants/enums";

type GridItemProps = {
  row: number;
  column: number;
  weight: number;
  onChange: (
    row: number,
    column: number
  ) => React.ChangeEventHandler<HTMLInputElement>;
  index: number;
  status: GRID_ITEM_STATUS;
};

const GridItem = ({
  row,
  column,
  weight,
  onChange,
  index,
  status
}: GridItemProps) => {
  const getClassNameFromStatus = (status: GRID_ITEM_STATUS, weight: number) => {
    let className = "grid__item";
    if (weight === 0) {
      className += " grid__item--wall";
    }
    switch (status) {
      case GRID_ITEM_STATUS.START:
        return (className += " grid__item--start");
      case GRID_ITEM_STATUS.END:
        return (className += " grid__item--end");
      case GRID_ITEM_STATUS.EXPLORED:
        return (className += " grid__item--explored");
      case GRID_ITEM_STATUS.EXPLORING:
        return (className += " grid__item--exploring");
      default:
        return className;
    }
  };

  return (
    <div className={getClassNameFromStatus(status, weight)}>
      <p className="item__index">i:{index}</p>
      <div className="item__data">
        <label htmlFor="weight-input">W:</label>
        <input
          id="weight-input"
          className="item__input"
          type="number"
          value={weight}
          onChange={onChange(row, column)}
          min={0}
        />
      </div>
      <p className="item__coords">({column + "," + row})</p>
    </div>
  );
};

export default GridItem;
