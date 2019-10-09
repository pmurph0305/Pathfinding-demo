import React from "react";

import "./GridItem.css";
import { GRID_ITEM_STATUS } from "../../Constants/enums";

type GridItemProps = {
  row: number;
  column: number;
  weight: number;
  index: number;
  status: GRID_ITEM_STATUS;
  onChange: (
    row: number,
    column: number
  ) => React.ChangeEventHandler<HTMLInputElement>;
  onMouseEnterGridItem: (index: number) => React.MouseEventHandler;
  onMouseDownGridItem: (index: number) => React.MouseEventHandler;
  onMouseUpGridItem: (index: number) => React.MouseEventHandler;
  onTouchMove: React.TouchEventHandler;
  onTouchEnd: React.TouchEventHandler;
};

const GridItem = ({
  row,
  column,
  weight,
  index,
  status,
  onChange,
  onMouseEnterGridItem,
  onMouseDownGridItem,
  onMouseUpGridItem,
  onTouchMove,
  onTouchEnd
}: GridItemProps) => {
  const getClassNameFromStatus = (status: GRID_ITEM_STATUS, weight: number) => {
    let className = "grid__item";
    switch (status) {
      case GRID_ITEM_STATUS.START:
        return (className += " grid__item--start");
      case GRID_ITEM_STATUS.END:
        return (className += " grid__item--end");
      case GRID_ITEM_STATUS.EXPLORED:
        return (className += " grid__item--explored");
      case GRID_ITEM_STATUS.EXPLORING:
        return (className += " grid__item--exploring");
      case GRID_ITEM_STATUS.PATH:
        return (className += " grid__item--path");
      case GRID_ITEM_STATUS.WALL:
        return (className += " grid__item--wall");
      default:
        return className;
    }
  };

  return (
    <div
      className={getClassNameFromStatus(status, weight)}
      onMouseEnter={onMouseEnterGridItem(index)}
      onMouseDown={onMouseDownGridItem(index)}
      onMouseUp={onMouseUpGridItem(index)}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      data-index={index}
    >
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
