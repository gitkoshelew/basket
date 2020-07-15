import constants from "../constants";
const {
  PRODUCTS_SUCCESS,
  PRODUCTS_FAIL,
  PRODUCTS_CLEAN_ERRORS,
  PRODUCTS_SYNC_SUCCESS,
} = constants;

const initialState = { data: [], errors: [] };

export default (state = initialState, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case PRODUCTS_CLEAN_ERRORS:
      return { ...state, errors: [] };
    case PRODUCTS_SUCCESS:
    case PRODUCTS_SYNC_SUCCESS:
      return {
        ...state,
        errors: [],
        data: payload.products,
      };
    case PRODUCTS_FAIL:
      return { ...state, errors: [...state.errors, error] };
    default:
      return state;
  }
};
