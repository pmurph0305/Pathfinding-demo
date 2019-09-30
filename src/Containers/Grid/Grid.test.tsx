import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import Grid from "./Grid";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Grid rows={5} columns={5} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Shallow testing", () => {
  it("Renders the correct number of grid items", () => {
    let wrapper = shallow<Grid>(<Grid rows={5} columns={5} />);
    expect(wrapper.find(".grid__item").length).toEqual(25);
  });

  it("Calculates grid-template-rows and grid-template-columns correctly", () => {
    let wrapper = shallow<Grid>(<Grid rows={4} columns={2} />);
    let template = wrapper.instance().getGridTemplate(4, 2);
    expect(template).toEqual({
      gridTemplateColumns: "50% 50% ",
      gridTemplateRows: "25% 25% 25% 25% "
    });
  });

  it("Calculates width to make a square grid", () => {
    let wrapper = shallow<Grid>(<Grid rows={8} columns={2} />);
    let wh = wrapper.instance().calcGridHeightAndWidth(8, 2);
    expect(wh).toEqual({
      width: "25%",
      height: "100%"
    });
  });

  it("Correctly gets styles", () => {
    let wrapper = shallow<Grid>(<Grid rows={1} columns={2} />);
    let styles = wrapper.instance().getGridStyles(1, 2);
    expect(styles).toEqual({
      width: "100%",
      height: "50%",
      gridTemplateColumns: "50% 50% ",
      gridTemplateRows: "100% "
    });
  });
});
