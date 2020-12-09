import * as actionTypes from "./actions";

const initialState = {
  ingredients: null,
  totalPrice: 4,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case "ADD_INGREDIENT":
      return {};

    case "REMOVE_INGREDIENT":
      return {};

    default:
      return state;
  }
};

export default reducer;
