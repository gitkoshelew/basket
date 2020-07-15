import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "../config";

class ApiService {
  constructor(firebaseConfig) {
    this.fb = firebase.initializeApp(firebaseConfig);
  }

  getCurrentUser = () => this.fb.auth().currentUser;

  fetchProducts = () =>
    this.fb.firestore().collection("products").get().then(processFbCollection);

  addToBasket = async (product) => {
    try {
      const userId = this.getCurrentUser().uid;
      const basket = await this.fb
        .firestore()
        .collection("/users/" + userId + "/basket")
        .add({ ...product, number: 1 });
    } catch (e) {
      console.log(e);
    }
  };

  addToBasketIncrease = async (payload) => {
    const { id, number } = payload;
    try {
      const userId = this.getCurrentUser().uid;
      const basket = await this.updateDoc(
        "/users/" + userId + "/basket/",
        { number },
        id
      );
    } catch (e) {
      console.log(e);
    }
  };

  removeFromBasket = async (id) => {
    console.log(id, "removeproduct");
    try {
      const userId = this.getCurrentUser().uid;
      const basket = await this.removeDoc("/users/" + userId + "/basket", id);
    } catch (e) {
      console.log(e);
    }
  };

  removeAllFromBasket = async (product) => {
    console.log(product, "product");
    try {
      const userId = this.getCurrentUser().uid;
      const basket = await this.removeCollection(
        "/users/" + userId + "/basket"
      );
    } catch (e) {
      console.log(e);
    }
  };

  onBasketChange = (callback) => {
    const user = this.getCurrentUser();

    const userId = user.uid;
    return this.fb
      .firestore()
      .collection("users/" + userId + "/basket")
      .onSnapshot((data) => callback(processFbCollection(data)));
  };

  onProductsChange = (callback) =>
    this.fb
      .firestore()
      .collection("products")
      .onSnapshot((data) => callback(processFbCollection(data)));

  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password);

  updateUser = (userData) => {
    const user = this.getCurrentUser();
    user.updateProfile({
      ...userData,
    });
  };

  updateDoc = async (path, data, doc) => {
    await this.fb.firestore().collection(path).doc(doc).update(data);
  };

  removeDoc = async (path, doc) => {
    await this.fb.firestore().collection(path).doc(doc).delete();
  };

  removeCollection = async (path) => {
    const collection = await this.fb.firestore().collection(path).get();
    const deleteMap = collection.docs.map(async (element) => {
      await element.ref.delete();
    });
    await Promise.all([...deleteMap]);
  };

  onAuthChange = (callback) => this.fb.auth().onAuthStateChanged(callback);
}

function processFbCollection(collection) {
  return collection.docs.map((snapshot) => {
    return {
      ...snapshot.data(),
      id: snapshot.id,
    };
  });
}

export default new ApiService(firebaseConfig);
