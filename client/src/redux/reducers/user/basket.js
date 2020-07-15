import { Record, List } from "immutable";
import { createSelector } from "reselect";

import constants from "../../constants";
const {
  USER_BASKET_ADD_START,
  USER_BASKET_ADD,
  USER_BASKET_REMOVE,
  USER_BASKET_CLEAN,
  USER_BASKET_ERROR,
  USER_BASKET_CLEAN_ERRORS,
  USER_SIGN_UP_SUCCESS,
  USER_BASKET_SYNC_SUCCESS,
} = constants;

export const calculatePrice = (arr) => {
  console.log(arr);
  if (!arr || !Array.isArray(arr)) return 0;
  return arr.reduce((acc, el) => {
    const { discount, price, number } = el;
    if (!number) return acc;
    if (!discount) {
      return acc + price * number;
    }
    if (discount.type === "percent") {
      return acc + (price * number * discount.percent) / 100;
    }
    if (discount.type === "freeEveryNth") {
      if (!discount.number) {
        return acc + price * number;
      }
      const freeNumber =
        (number - (number % discount.number)) / discount.number;
      return acc + price * (number - freeNumber);
    }
    if (discount.type === "freeOverPay") {
      const allPrice = price * number;
      return acc + (allPrice > 100 ? 100 : allPrice);
    }
    if (discount.type === "bundle") {
      if (!discount.match.lenght) return acc + price * number;
      const matched = arr.reduce((mathedAcc, el) => {
        if (discount.match.includes(el.id)) {
          return { ...mathedAcc, [el.id]: el.number };
        }
        return mathedAcc;
      }, {});
      const matchedKeys = Object.keys(matched);

      if (!matchedKeys.length || matchedKeys.length < discount.match)
        return acc + price * number;
      const bundlesCount = Math.min(
        ...matchedKeys.map((el) => matched[el].number)
      );
      return acc + price * number - bundlesCount * discount.reductionPerBundle;
    }
    if (discount.type === "bulk") {
      if (number > discount.count) {
        return acc + (price - discount.reductionToEvery) * number;
      }
      return acc + price * number;
    }
  }, 0);
};

export const basketSelector = (state) => {
  const basket = state.user.basket.data.valueSeq().toArray();
  return basket;
};

export const priceSelector = createSelector([basketSelector], (basket) =>
  calculatePrice(basket)
);

const ReducerRecord = Record({
  data: List([]),
  loading: false,
  error: null,
  price: null,
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action;

  switch (type) {
    case USER_SIGN_UP_SUCCESS:
      return state.updateIn(["data"], (list) => List(payload.user.basket));

    case USER_BASKET_ADD_START:
      return state.set("loading", true);

    case USER_BASKET_SYNC_SUCCESS:
      return (
        state
          // .updateIn(["data"], (list) => {
          //   const index = list.findIndex((el) => el.id === payload._id);
          //   if (index)
          //     return list.updateIn([index], (value) => {
          //       console.log("index", index, value);
          //       return payload;
          //     });
          //   return list.push(payload);
          // })
          .updateIn(["data"], (list) => List(payload))
          .set("loading", false)
          .set("error", null)
          .set("price", (price) => price + payload.price)
      );

    // case USER_BASKET_REMOVE:
    //   return state
    //     .updateIn(["data"], (list) => {
    //       const index = list.findIndex((el) => el.id === payload.id);
    //       if (list[index].count === 1) {
    //         return list.delete(index);
    //       }
    //       return list.updateIn([index], (value) => ({
    //         ...value,
    //         count: value.count - 1,
    //       }));
    //     })
    //     .set("price", (price) => price - payload.price);

    // case USER_BASKET_CLEAN:
    //   return state.updateIn(["data"], (list) => list.clear());

    case USER_BASKET_CLEAN_ERRORS:
      return state.set("error", error);

    case USER_BASKET_ERROR:
      return state.set("error", null);

    default:
      return state;
  }
}
