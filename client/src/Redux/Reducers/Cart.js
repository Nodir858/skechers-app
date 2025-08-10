import { createSlice } from "@reduxjs/toolkit";


//   ADD_ITEM_TO_CART,
//   REMOVE_ITEM_FROM_CART,
//   CART_ITEM_CLEAR,
//   CART_SAVE_SHIPPING_ADDRESS,
//   SAVE_PAYMENT_METHOD;

const initialState = {
  cartItems: [],
  shippingAddress: {},
};

const cartSlice = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((value) => {
            return value.product === existItem.product ? item : value;
          }),
        };
      } else {
        return {
          ...state, //shallow copy all state including shippingAddress
          cartItems: [...state.cartItems, item],
        };
      }
    },
    removeItemFromCart: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    },
    cartSaveShippingAddress: (state, action) => {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    },
    savePaymentMethod: (state, action) => {
      return {
        ...state,
        paymentMethod: action.payload,
      };
    },
    cartItemClear: (state, action) => {
      return {
        ...state,
        cartItems: [],
      };
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  cartSaveShippingAddress,
  savePaymentMethod,
  cartItemClear,
} = cartSlice.actions;

export default cartSlice.reducer;
