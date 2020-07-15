import React, { memo, useCallback } from "react";
import { connect } from "react-redux";

import Button from "../../atoms/Button";
import styles from "./style.module.scss";

import {
  userBasketAddStart,
  userBasketIncreaseStart,
} from "../../../redux/actions";

import { basketSelector } from "../../../redux/reducers/user/basket";

const ProductCard = memo(
  ({
    product,
    basket,
    dispatchBasketAddStart,
    dispatchBasketIncreaseStart,
  }) => {
    const addToBasket = useCallback(() => {
      const productInBasket = basket.find(
        (basketProduct) => basketProduct._id === product._id
      );
      if (!productInBasket) {
        dispatchBasketAddStart(product);
        return;
      }
      dispatchBasketIncreaseStart({
        id: productInBasket.id,
        number: productInBasket.number + 1,
      });
    }, [dispatchBasketAddStart, dispatchBasketIncreaseStart, product, basket]);

    return (
      <div className={styles.card}>
        {product.title && <h3>{product.title}</h3>}
        {product.description && <p>{product.description}</p>}
        {product.count && <p>Amount: {product.count}</p>}
        <Button clickHandler={addToBasket}>Add to Basket</Button>
      </div>
    );
  }
);

function mapStateToProps(state) {
  return {
    basket: basketSelector(state),
  };
}

const mapDispatchToProps = {
  dispatchBasketAddStart: userBasketAddStart,
  dispatchBasketIncreaseStart: userBasketIncreaseStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
