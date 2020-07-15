import products from "./products";
import firebase from "firebase/app";
import "firebase/firestore";

export function saveProductsToFB() {
  const productsRef = firebase.firestore().collection("products");
  products.forEach((product) => productsRef.add(product));
}

window.saveProductsToFB = saveProductsToFB;
