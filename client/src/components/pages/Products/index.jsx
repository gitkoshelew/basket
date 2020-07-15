import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";

import ProductCard from "../../molecules/ProductCard";
import styles from "./style.module.scss";

import {
  productsFetch,
  userBasketSyncStart,
  userBasketSyncStop,
} from "../../../redux/actions";

const Products = ({
  products,
  dispatchProductsFetch,
  dispatchBasketSyncStart,
  dispatchBasketSyncStop,
}) => {
  const fetchProducts = useCallback(() => {
    dispatchProductsFetch();
  }, [dispatchProductsFetch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    dispatchBasketSyncStart();
    return () => dispatchBasketSyncStop();
  }, [dispatchBasketSyncStart, dispatchBasketSyncStop]);

  return (
    <section className={styles.products}>
      <div className="container">
        <h1 className={styles.products__heading}>Products</h1>

        <div className={`${styles.products__cards}`}>
          {products &&
            products
              .filter((product) => !!product.count)
              .map((product) => (
                <ProductCard key={product.id} product={product}></ProductCard>
              ))}
        </div>
      </div>
    </section>
  );
};

function mapStateToProps({ products }) {
  return {
    products: products.data,
  };
}

const mapDispatchToProps = {
  dispatchProductsFetch: productsFetch,
  dispatchBasketSyncStart: userBasketSyncStart,
  dispatchBasketSyncStop: userBasketSyncStop,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
