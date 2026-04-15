import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";
import thunk from "redux-thunk";

import { cartReducer } from "./reducers/CartReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMineListReducer,
  orderPayReducer,
} from "./reducers/OrderReducer";

import {
  productListReducer,          // ✅ FIXED
  productDetailsReducer,       // ✅ FIXED
} from "./reducers/ProductReducer";

import {
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
} from "./reducers/UserReducer";


// 🔥 INITIAL STATE
const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},

    paymentMethod: "PayPal",
  },

  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};


// 🔥 COMBINE REDUCERS
const reducer = combineReducers({
  productList: productListReducer,       // ✅ FIXED
  productDetails: productDetailsReducer, // ✅ FIXED
  cart: cartReducer,
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});


// 🔥 REDUX DEVTOOLS
const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// 🔥 STORE
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;