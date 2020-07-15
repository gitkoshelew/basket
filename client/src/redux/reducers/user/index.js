import { combineReducers } from "redux";

import basket from "./basket";
import auth from "./auth";

export default combineReducers({
  auth,
  basket,
});
