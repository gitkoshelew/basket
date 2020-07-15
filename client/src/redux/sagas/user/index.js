import { all } from "redux-saga/effects";
import { syncAuthState, signUpSaga } from "./auth";
import { saga as basketSaga } from "./basket";

export const saga = function* () {
  yield all([signUpSaga(), syncAuthState(), basketSaga()]);
};
