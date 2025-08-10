import axios from "axios";

// import {
//   USER_LOGIN_REQ,
//   USER_LOGIN_REQ_SUCCESS,
//   USER_LOGIN_REQ_FAIL,
//   USER_LOGOUT,
//   USER_REGISTER_REQ,
//   USER_REGISTER_REQ_SUCCESS,
//   USER_REGISTER_REQ_FAIL,
// } from "../Constants/User";
import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
} from "../Reducers/User";
import { BASE_URL } from "../Constants/BASE_URL";

//user login action

export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginRequest());
    const config = {
      headers: {
        "Content-Type": "application/json", //sending JSON data in the request body. When sending data with axios.post(), we have to specify the content type
      },
    };
    const { data } = await axios.post(
      `${BASE_URL}/api/users/login`,
      { email, password },
      config
    );

    dispatch(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data)); // save to localstorage
  } catch (error) {
    dispatch(userLoginFail(error.response.data.message));
  }
};

//user logout action
export const userLogoutAction = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLogout());
  document.location.href = "/login"; //after used register, we will return the user to login page
};

//register

export const userRegisterAction =
  (name, email, password) => async (dispatch) => {
    try {
      dispatch(userRegisterRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/users/reg`,
        { name, email, password },
        config
      );
      dispatch(userRegisterSuccess(data));
      dispatch(userLoginSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(userRegisterFail(error.response.data.message));
    }
  };
