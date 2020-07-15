import constants from "../constants";
const {
  PRODUCTS_SUCCESS,
  PRODUCTS_FAIL,
  PRODUCTS_FETCH,
  PRODUCTS_CLEAN_ERRORS,
} = constants;

export const productsFetch = () => ({
  type: PRODUCTS_FETCH,
});

export const productsSuccess = (payload) => {
  return {
    type: PRODUCTS_SUCCESS,
    payload,
  };
};

export const productsFail = (payload) => ({
  type: PRODUCTS_FAIL,
  payload,
});

export const productsClearErrors = () => ({
  type: PRODUCTS_CLEAN_ERRORS,
});
