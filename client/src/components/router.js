import React from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./pages/Products";
import Basket from "./pages/Basket";
import Auth from "./pages/Auth";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/basket" component={Basket} />
        <Route path="/products" component={Products} />
        <Route path="/" component={Auth} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" component={Auth} />
    </Switch>
  );
};
