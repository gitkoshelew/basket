import {
  put,
  call,
  takeEvery,
  all,
  delay,
  fork,
  take,
  cancel,
  cancelled,
  spawn,
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import constants from "../../constants";
import apiService from "../../../services/api";

const {
  USER_BASKET_ADD_START,
  USER_BASKET_INCREASE_START,
  USER_BASKET_ADD,
  USER_BASKET_REMOVE_START,
  USER_BASKET_REMOVE,
  USER_BASKET_CLEAN,
  USER_BASKET_CLEAN_START,
  USER_BASKET_SYNC_SUCCESS,
  USER_BASKET_SYNC_START,
  USER_BASKET_SYNC_STOP,
} = constants;

export const addToBasketSaga = function* ({ payload }) {
  const basket = yield call(apiService.addToBasket, payload);
  //   yield put({
  //     type: USER_BASKET_ADD,
  //     payload: basket,
  //   });
};

export const increaseBasketSaga = function* ({ payload }) {
  const basket = yield call(apiService.addToBasketIncrease, payload);
  //   yield put({
  //     type: USER_BASKET_ADD,
  //     payload: basket,
  //   });
};

export const removeFromBasketSaga = function* ({ payload }) {
  yield call(apiService.removeFromBasket, payload);
  //   yield put({
  //     type: USER_BASKET_REMOVE,
  //   });
};

export const removeAllFromBasketSaga = function* () {
  yield call(apiService.removeAllFromBasket);
  //   yield put({
  //     type: USER_BASKET_CLEAN,
  //   });
};

export const addToBasketWithRetrySaga = function* () {
  yield call(retryExp, addToBasketSaga);
};

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

const changeBasketChanel = () => eventChannel(apiService.onBasketChange);
export const syncBasket = function* () {
  const chanel = yield call(changeBasketChanel);

  try {
    while (true) {
      const basket = yield take(chanel);
      yield put({
        type: USER_BASKET_SYNC_SUCCESS,
        payload: basket,
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
    yield take(USER_BASKET_SYNC_START);
    const process = yield fork(syncBasket);
    yield take(USER_BASKET_SYNC_STOP);
    yield cancel(process);
  }
};

export const saga = function* () {
  yield spawn(cancelableSync);
  yield all([
    takeEvery(USER_BASKET_ADD_START, addToBasketSaga),
    takeEvery(USER_BASKET_REMOVE, removeFromBasketSaga),
    takeEvery(USER_BASKET_CLEAN, removeAllFromBasketSaga),
    takeEvery(USER_BASKET_INCREASE_START, increaseBasketSaga),
  ]);
};
