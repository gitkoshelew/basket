import { Record } from "immutable";
import { useSelector } from "react-redux";

import constants from "../../constants";
const {
  USER_SIGN_UP_START,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_ERROR,
  USER_SIGN_OUT_SUCCESS,
  USER_SIGN_IN_SUCCESS,
} = constants;

export const userSelector = (state) => state.user.auth.data;
export const userErrors = (state) => state.user.auth.errors;

export const useAuthorized = () => {
  const user = useSelector(userSelector);

  return !!user;
};

const ReducerRecord = Record({
  data: null,
  loading: false,
  error: null,
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action;

  switch (type) {
    case USER_SIGN_UP_START:
      return state.set("loading", true);

    case USER_SIGN_IN_SUCCESS:
    case USER_SIGN_UP_SUCCESS:
      return state
        .set("loading", false)
        .set("data", payload.user)
        .set("error", null);

    case USER_SIGN_OUT_SUCCESS:
      return state.set("data", null);

    case USER_SIGN_UP_ERROR:
      return state.set("error", error).set("loading", false);

    default:
      return state;
  }
}
