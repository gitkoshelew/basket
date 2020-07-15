import { all } from "redux-saga/effects";

import { saga as userSaga } from "./user";
import { saga as productsSaga } from "./products";

export default function* rootSaga() {
  yield all([userSaga(), productsSaga()]);
}
