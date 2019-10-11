import React, { useState } from "react";

import Grid from "./Containers/Grid/Grid";

import "./App.css";

const App: React.FC = () => {
  const [rows, setRows] = useState(5);
  const [columns, setColumns] = useState(5);

  return (
    <div className="App">
      <div style={{ width: "90vh", margin: "auto" }}>
        <Grid rows={rows} columns={columns} />
        <div className="rc__container">
          <label htmlFor="rows">Rows:</label>
          <input
            id="rows"
            className="rc__input"
            type="number"
            min={0}
            value={rows}
            onChange={e => setRows(parseInt(e.target.value))}
          />
          <label htmlFor="columns">Columns:</label>
          <input
            id="rows"
            className="rc__input"
            type="number"
            min={0}
            value={columns}
            onChange={e => setColumns(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
