import React from "react";

import Grid from "./Containers/Grid/Grid";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <div style={{ width: "500px", height: "500px", margin: "auto" }}>
        <Grid rows={5} columns={5} />
      </div>
    </div>
  );
};

export default App;
