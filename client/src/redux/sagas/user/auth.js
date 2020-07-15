import { call, put, take, delay } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import apiService from "../../../services/api";

import constants from "../../constants";
const {
  USER_SIGN_UP_START,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_ERROR,
  USER_SIGN_OUT_SUCCESS,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_UP_TIMEOUT_LIMIT,
  USER_SIGN_UP_HARD_LIMIT,
  USER_SIGN_UP_REQUEST,
} = constants;

export const signUpSaga = function* () {
  let errorCount = 0;

  while (true) {
    if (errorCount === 3) {
      yield put({
        type: USER_SIGN_UP_TIMEOUT_LIMIT,
      });

      yield delay(1000);
    } else if (errorCount >= 5) {
      yield put({
        type: USER_SIGN_UP_HARD_LIMIT,
      });

      return;
    }

    const {
      payload: { email, password },
    } = yield take(USER_SIGN_UP_REQUEST);

    yield put({
      type: USER_SIGN_UP_START,
    });

    try {
      const user = yield call(apiService.signUp, email, password);

      yield put({
        type: USER_SIGN_UP_SUCCESS,
        payload: { user },
      });
    } catch (error) {
      errorCount++;

      yield put({
        type: USER_SIGN_UP_ERROR,
        error,
      });
    }
  }
};

export const createAuthChanel = () =>
  eventChannel((emit) => apiService.onAuthChange((user) => emit({ user })));

export const syncAuthState = function* () {
  const chanel = yield call(createAuthChanel);

  while (true) {
    const { user } = yield take(chanel);

    if (user) {
      yield put({
        type: USER_SIGN_IN_SUCCESS,
        payload: { user },
      });
    } else {
      yield put({
        type: USER_SIGN_OUT_SUCCESS,
      });
    }
  }
};
