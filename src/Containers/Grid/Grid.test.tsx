import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";

import Grid from "./Grid";
import GridItem from "../../Components/GridItem/GridItem";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Grid rows={5} columns={5} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Shallow testing", () => {
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

  it("Correctly generates default values for nodes", () => {
    let wrapper = shallow<Grid>(<Grid rows={1} columns={2} />);
    expect(wrapper.state().nodes.length).toEqual(2);
  });

  it("Generates the correct # of GridItems", () => {
    let wrapper = shallow<Grid>(<Grid rows={3} columns={5} />);
    let gridItems = wrapper.instance().generateGridItems(3, 5);
    expect(gridItems.length).toEqual(15);
  });
});

describe("Mounted tests", () => {
  it("Correctly updates nodes state", () => {
    let wrapper = mount<Grid>(<Grid rows={3} columns={5} />);
    let gridItems = wrapper.find(GridItem);
    expect(gridItems.length).toEqual(15);
    let input = gridItems.first().find("input");
    expect(input.length).toEqual(1);
    input.simulate("change", { target: { value: 2 } });
    expect(wrapper.state().nodes[0]).toEqual(2);
  });
});
