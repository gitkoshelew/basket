import React, { useCallback } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { userBasketCleanErrors, userAuthCleanErrors } from "./redux/actions";
import { useRoutes } from "./components/router";
import { useAuthorized } from "./redux/reducers/user/auth";

import Loader from "./components/atoms/Loader";
import Tip from "./components/molecules/Tip";
import styles from "./App.module.scss";

function App({
  loader,
  errors,
  dispatchBasketClearErrors,
  dispatchAuthClearErrors,
}) {
  const isAuthorized = useAuthorized();
  const router = useRoutes(isAuthorized);

  const cleanErrors = useCallback(() => {
    dispatchBasketClearErrors();
    dispatchAuthClearErrors();
  }, [dispatchBasketClearErrors, dispatchAuthClearErrors]);
  return (
    <>
      {loader && <Loader />}
      {errors.length !== 0 && (
        <Tip messages={errors} clickHandler={cleanErrors} />
      )}

      <div className="App">
        <header>
          <div className="container">
            <nav>
              <ul className={styles.nav__list}>
                <NavLink
                  activeClassName={styles.nav__list__item_active}
                  className={styles.nav__list__item}
                  to="products"
                >
                  Products
                </NavLink>
                <NavLink
                  activeClassName={styles.nav__list__item_active}
                  className={styles.nav__list__item}
                  exact
                  to="/basket"
                >
                  Basket
                </NavLink>
                <NavLink
                  activeClassName={styles.nav__list__item_active}
                  className={styles.nav__list__item}
                  exact
                  to="/"
                >
                  Auth
                </NavLink>
              </ul>
            </nav>
          </div>
        </header>
        {router}
      </div>
    </>
  );
}

function mapStateToProps({ loader, user }) {
  const { basket, auth } = user;
  return {
    loader,
    errors: [basket.error, auth.errors].filter(Boolean),
  };
}

const mapDispatchToProps = {
  dispatchBasketClearErrors: userBasketCleanErrors,
  dispatchAuthClearErrors: userAuthCleanErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
