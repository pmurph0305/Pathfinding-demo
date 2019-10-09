import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";

import Grid from "./Grid";
import GridItem from "../../Components/GridItem/GridItem";
import { PATH_ALGORITHM } from "../../Constants/enums";

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

  it("Changes the algorithm state correctly", () => {
    let wrapper = shallow<Grid>(<Grid rows={3} columns={5} />);
    let select = wrapper.find("#select_algorithm");
    expect(select.length).toEqual(1);
    select.simulate("change", {
      target: { value: PATH_ALGORITHM.ASTAR_GREEDY }
    });
    expect(wrapper.state().algorithm).toEqual(PATH_ALGORITHM.ASTAR_GREEDY);
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
    expect(wrapper.find(".grid__item--wall").length).toEqual(0);
    input.simulate("change", { target: { value: 0 } });
    expect(wrapper.state().nodes[0]).toEqual(0);
    expect(wrapper.find(".grid__item--wall").length).toEqual(1);
  });

  it("Calculates the path", () => {
    let wrapper = mount<Grid>(<Grid rows={3} columns={3} />);
    let btn = wrapper.find("#calc_path");
    expect(btn.length).toEqual(1);
    btn.simulate("click");
    expect(wrapper.state().path.length).toEqual(5);
    expect([0, 1, 2, 5, 8]).toEqual(
      expect.arrayContaining(wrapper.state().path)
    );
  });

  it("Updates grid state correctly on mouse events", () => {
    let wrapper = mount<Grid>(<Grid rows={3} columns={3} />);
    let gridItems = wrapper.find(".grid__item");
    expect(gridItems.length).toEqual(9);
    gridItems.at(1).simulate("mousedown");
    expect(wrapper.state().isDragging).toEqual(true);
    expect(wrapper.state().dragStartIndex).toEqual(1);
    expect(wrapper.state().dragStartInitialWeight).toEqual(1);
    expect(wrapper.state().isCreatingWalls).toEqual(true);
    gridItems.at(4).simulate("mouseenter");
    expect(wrapper.state().nodes[1]).toEqual(0);
    expect(wrapper.state().nodes[4]).toEqual(0);
    gridItems.at(4).simulate("mouseup");
    expect(wrapper.state().nodes[4]).toEqual(0);
    expect(wrapper.state().isDragging).toEqual(false);
    expect(wrapper.state().dragEndIndex).toEqual(4);
    gridItems.at(6).simulate("mousedown");
    gridItems.at(6).simulate("mouseup");
    expect(wrapper.state().nodes[6]).toEqual(0);
    expect(wrapper.state().isDragging).toEqual(false);
    gridItems.at(4).simulate("mousedown");
    gridItems.at(4).simulate("mouseup");
    expect(wrapper.state().nodes[4]).toEqual(1);
  });
});
