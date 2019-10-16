import React, { useState } from "react";

import Grid from "./Containers/Grid/Grid";

import "./App.css";

const App: React.FC = () => {
  const [rows, setRows] = useState(8);
  const [columns, setColumns] = useState(8);
  return (
    <div className="App">
      <div className="app__container">
        <div className="app__inputContainer">
          <div className="input__container">
            <label htmlFor="rows">Rows:</label>
            <input
              id="rows"
              className="input__item"
              type="number"
              min={3}
              value={rows}
              onChange={e => setRows(parseInt(e.target.value))}
            />
          </div>
          <div className="input__container">
            <label htmlFor="columns">Columns:</label>
            <input
              id="rows"
              className="input__item"
              type="number"
              min={3}
              value={columns}
              onChange={e => setColumns(parseInt(e.target.value))}
            />
          </div>
        </div>
        <Grid rows={rows} columns={columns} />
      </div>
    </div>
  );
};

export default App;
