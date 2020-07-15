import { combineReducers } from "redux";

import products from "./products";
import user from "./user";
import loader from "./loader";

export default combineReducers({
  user,
  products,
  loader,
});
