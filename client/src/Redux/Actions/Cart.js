//   ADD_ITEM_TO_CART,
//   REMOVE_ITEM_FROM_CART,
//   CART_ITEM_CLEAR,
//   CART_SAVE_SHIPPING_ADDRESS,
//   SAVE_PAYMENT_METHOD;
import {
  addItemToCart,
  removeItemFromCart,
  cartSaveShippingAddress,
  savePaymentMethod,
} from "../Reducers/Cart";
import { BASE_URL } from "../Constants/BASE_URL";
import axios from "axios";

//getState() is a method of the Redux store that allow you retrieve the current state of your application

export const addToCartAction = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
    dispatch(
      addItemToCart({
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      })
    );

    const cartItems = getState().cart.cartItems; // getState() without is we have risk to saving the outdated or incomplete data
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); //we need to retrieve updates and save to localstorage
  } catch (error) {
    console.log(error);
  }
};

//getState() read the current Redux store state
export const removeFromCartAction = (id) => (dispatch, getState) => {
  try {
    dispatch(removeItemFromCart(id));
    const updatedCart = getState().cart.cartItems;
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  } catch (error) {
    console.log(error);
  }
};

export const cartSaveShippingAddressAction = (data) => (dispatch) => {
  dispatch(cartSaveShippingAddress(data));
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethodAction = (data) => (dispatch) => {
  dispatch(savePaymentMethod(data));
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
