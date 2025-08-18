import axios from "axios";
import { BASE_URL } from "../Constants/BASE_URL";
import {
  orderRequest,
  orderSuccess,
  orderPaymentRequest,
  orderPaymentRequestSuccess,
  orderPaymentRequestFail,
  orderDetailRequest,
  orderDetailRequestSuccess,
  orderDetailRequestFail,
  orderListRequest,
  orderListRequestSuccess,
  orderListRequestFail,
} from "../Reducers/Order";

import { cartItemClear } from "../Reducers/Cart";
import { userLogoutAction } from "./User";
//order action
export const orderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderRequest());
    const userInfo = getState().auth.userInfo;
    const config = {
      headers: {
        "Content-Type": "application/json",//telling backend the body is JSON
        Authorization: `Bearer ${userInfo.token}`,//sending the user's JWT token
      },
    };
    const { data } = await axios.post(`${BASE_URL}/api/orders`, order, config);

    dispatch(orderSuccess(data));
    dispatch(cartItemClear(data));
  } catch (error) {
    console.log(error);
  }
};

//order payment

export const orderPaymentAction =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch(orderPaymentRequest());
      const userInfo = getState().auth.userInfo;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/api/orders/${orderId}/payment`,
        paymentResult,
        config
      );
      dispatch(orderPaymentRequestSuccess(data));
      dispatch(orderDetailAction(orderId));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authroized!") {
        dispatch(userLogoutAction());
      }
      dispatch(orderPaymentRequestFail(message));
    }
  };

// detail req

export const orderDetailAction = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderDetailRequest);
    const userInfo = getState().auth.userInfo;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/api/orders/${id}`, config);
    dispatch(orderDetailRequestSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized!") {
      dispatch(userLogoutAction());
    }
    dispatch(orderDetailRequestFail(message));
  }
};

//order list action
export const orderListAction = () => async (dispatch, getState) => {
  try {
    dispatch(orderListRequest());
    const userInfo = getState().auth.userInfo;
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/api/orders`, config);
    dispatch(orderListRequestSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.message.data.message
        : error.message;
    if (message === "Not Authorized!") {
      dispatch(userLogoutAction());
    }
    dispatch(orderListRequestFail(message));
  }
};
