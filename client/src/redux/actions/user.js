import constants from "../constants";
const {
  USER_SIGN_UP_REQUEST,
  USER_SIGN_CLEAN_ERRORS,
  USER_BASKET_CLEAN_ERRORS,
  USER_BASKET_ADD_START,
  USER_BASKET_INCREASE_START,
  USER_BASKET_REMOVE,
  USER_BASKET_CLEAN,
  USER_BASKET_SYNC_START,
  USER_BASKET_SYNC_STOP,
} = constants;

export const userSignUpRequest = ({ email, password }) => ({
  type: USER_SIGN_UP_REQUEST,
  payload: { email, password },
});

export const userAuthCleanErrors = () => ({
  type: USER_SIGN_CLEAN_ERRORS,
});

export const userBasketAddStart = (payload) => ({
  type: USER_BASKET_ADD_START,
  payload,
});

export const userBasketIncreaseStart = (payload) => ({
  type: USER_BASKET_INCREASE_START,
  payload,
});

export const userBasketRemove = (id) => ({
  type: USER_BASKET_REMOVE,
  payload: id,
});

export const userBasketClean = () => ({
  type: USER_BASKET_CLEAN,
});

export const userBasketCleanErrors = () => ({
  type: USER_BASKET_CLEAN_ERRORS,
});

export const userBasketSyncStart = () => ({
  type: USER_BASKET_SYNC_START,
});

export const userBasketSyncStop = () => ({
  type: USER_BASKET_SYNC_STOP,
});
