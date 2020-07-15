import constants from "../constants";
const { LOADER_MAIN_CHANGE, LOADER_MAIN_INITIAL } = constants;

const initialState = false;

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADER_MAIN_CHANGE:
      return action.payload;
    case LOADER_MAIN_INITIAL:
      return initialState;
    default:
      return state;
  }
}
