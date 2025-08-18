"use strict";
// ORDER_REQ,
// ORDER_RESET,
// ORDER_SUCCESS,
// ORDER_FAIL,

// ORDER_DETAIL_REQ,
// ORDER_DETAIL_REQ_FAIL,
// ORDER_DETAIL_REQ_SUCCESS,

// ORDER_PAYMENT_REQ,
// ORDER_PAYMENT_REQ_FAIL,
// ORDER_PAYMENT_REQ_SUCCESS,

// ORDER_LIST_REQ,
// ORDER_LIST_REQ_FAIL,
// ORDER_LIST_REQ_SUCCESS
import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  order: {},
  loading: false,
  error: null,
  success: null,
  orders: [],
  shippingAddress: {},
  orderItems: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderRequest: (state, action) => {
      state.loading = true;
    },
    orderSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    orderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    orderReset: (state) => {
      state = {};
    },
    //
    orderDetailRequest: (state) => {
      state.loading = true;
    },
    orderDetailRequestSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    orderDetailRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //
    orderPaymentRequest: (state) => {
      state.loading = true;
    },
    orderPaymentRequestSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    orderPaymentRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //
    orderListRequest: (state) => {
      state.loading = true;
    },
    orderListRequestSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.orders = action.payload;
    },
    orderListRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  orderRequest,
  orderSuccess,
  orderFail,
  orderReset,
  orderDetailRequest,
  orderDetailRequestSuccess,
  orderDetailRequestFail,
  orderPaymentRequest,
  orderPaymentRequestSuccess,
  orderPaymentRequestFail,
  orderListRequest,
  orderListRequestSuccess,
  orderListRequestFail,
} = orderSlice.actions;

export default orderSlice.reducer;
