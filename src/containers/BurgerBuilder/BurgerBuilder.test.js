import React from "react";

// containers are tested in a way that we strip out the component part and get rid of the connection to redux

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
  });

  it("Should render build controls when receiving ingredients", () => {
    wrapper.setProps({ ings: { cheese: 0, meat: 0, bacon: 0, salad: 0 } });
    // wrapper.setProps({ ings: null });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
