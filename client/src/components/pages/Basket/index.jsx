import React, { useCallback, useEffect, useMemo, memo } from "react";
import { connect } from "react-redux";

import {
  userBasketRemove,
  userBasketClean,
  userBasketSyncStart,
  userBasketSyncStop,
} from "../../../redux/actions";

import {
  basketSelector,
  priceSelector,
} from "../../../redux/reducers/user/basket";

import Button from "../../atoms/Button";
import styles from "./style.module.scss";

const BasketProduct = ({ product, removeHandler }) => {
  const removeFromBasketHandler = useCallback(() => {
    removeHandler(product.id);
  }, [removeHandler, product]);

  return (
    <div className={styles.basket__cards__product}>
      {product.title}
      <p>count {product.number}</p>
      <Button clickHandler={removeFromBasketHandler}>Remove</Button>
    </div>
  );
};

const Basket = ({
  basket,
  price,
  dispatchBasketClean,
  dispatchBasketRemove,
  dispatchBasketSyncStart,
  dispatchBasketSyncStop,
}) => {
  useEffect(() => {
    dispatchBasketSyncStart();
    return () => dispatchBasketSyncStop();
  }, [dispatchBasketSyncStart, dispatchBasketSyncStop]);

  return (
    <section className={styles.basket}>
      <div className="container">
        <h1>Basket</h1>

        <div className={styles.basket__cards}>
          {basket.map((product, idx) => (
            <BasketProduct
              product={product}
              removeHandler={dispatchBasketRemove}
              key={idx}
            ></BasketProduct>
          ))}
        </div>
        {basket.length !== 0 && (
          <Button clickHandler={dispatchBasketClean}>Clean Basket</Button>
        )}
        <div>Price: {price}</div>
      </div>
    </section>
  );
};

function mapStateToProps(state) {
  return {
    basket: basketSelector(state),
    price: priceSelector(state),
  };
}

const mapDispatchToProps = {
  dispatchBasketClean: userBasketClean,
  dispatchBasketRemove: userBasketRemove,
  dispatchBasketSyncStart: userBasketSyncStart,
  dispatchBasketSyncStop: userBasketSyncStop,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Basket));
