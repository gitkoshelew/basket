import {
  put,
  call,
  takeLatest,
  all,
  delay,
  fork,
  take,
  cancel,
  cancelled,
  spawn,
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import constants from "../constants";
import apiService from "../../services/api";

const {
  PRODUCTS_SYNC_START,
  PRODUCTS_SYNC_STOP,
  PRODUCTS_FETCH,
  PRODUCTS_SUCCESS,
  PRODUCTS_SYNC_SUCCESS,
} = constants;

export const retryExp = function* (saga) {
  const baseTimeout = 10;
  for (let i = 1; i < 5; i++) {
    try {
      console.log("---", "attempt ", i);
      return yield call(saga);
    } catch (error) {
      console.log(error, "timeout", baseTimeout ** i);
      yield delay(baseTimeout ** i);
    }
  }
};

export const fetchProductsWithRetrySaga = function* () {
  yield call(retryExp, fetchProductsSaga);
};

export const fetchProductsSaga = function* () {
  console.log("fetchproducts");
  const products = yield call(apiService.fetchProducts);

  yield put({
    type: PRODUCTS_SUCCESS,
    payload: { products },
  });
};

// export const syncProductsPolling = function* () {
//   while (true) {
//     yield fork(fetchProductsSaga);
//     yield delay(5000);
//   }
// };

const fetchProductChanel = () => eventChannel(apiService.onProductsChange);

export const syncProducts = function* () {
  const chanel = yield call(fetchProductChanel);

  try {
    while (true) {
      const products = yield take(chanel);

      yield put({
        type: PRODUCTS_SYNC_SUCCESS,
        payload: { products },
      });
    }
  } finally {
    if (yield cancelled()) {
      console.log("cancelled");
    }
  }
};

const cancelableSync = function* () {
  while (true) {
    yield take(PRODUCTS_SYNC_START);
    const process = yield fork(syncProducts);
    yield take(PRODUCTS_SYNC_STOP);
    yield cancel(process);
  }
};

export const saga = function* () {
  yield spawn(cancelableSync);
  yield all([takeLatest(PRODUCTS_FETCH, fetchProductsSaga)]);
};
