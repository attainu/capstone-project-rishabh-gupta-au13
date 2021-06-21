import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productsDetailsReducer,
  newProductReducer,
  productReducer,
} from "./reducers/productReducers";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { newOrderReducer,myOrdersReducer,orderDetailsReducer} from "./reducers/orderReducers";

const reducer = combineReducers({
  products: productsReducer,
  productsDetails: productsDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPasswordReducer: forgotPasswordReducer,
  cart: cartReducer,
  newProduct:newProductReducer,
  product: productReducer,
  newOrder:newOrderReducer,
  myOrders:myOrdersReducer,
  orderDetails:orderDetailsReducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      shippingInfo:localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      :{}
      
  }
}

const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
