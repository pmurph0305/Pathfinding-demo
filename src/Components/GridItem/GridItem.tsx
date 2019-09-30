import React from "react";

import "./GridItem.css";

type GridItemProps = {
  row: number;
  column: number;
  weight: number;
  onChange: (
    row: number,
    column: number
  ) => React.ChangeEventHandler<HTMLInputElement>;
  index: number;
};

const GridItem = ({ row, column, weight, onChange, index }: GridItemProps) => {
  return (
    <div className="grid__item">
      <p className="item__weight">
        W:{" "}
        <input
          className="item__input"
          type="number"
          value={weight}
          onChange={onChange(row, column)}
          min={0}
        />
      </p>
      {index}
      <p className="item__coords">{column + "," + row}</p>
    </div>
  );
};

export default GridItem;
