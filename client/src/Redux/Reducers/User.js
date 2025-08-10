// import { act } from "react";
// import { createSlice } from "@reduxjs/toolkit";
// import {
//   USER_LOGIN_REQ,
//   USER_LOGIN_REQ_SUCCESS,
//   USER_LOGIN_REQ_FAIL,
//   USER_LOGOUT,
//   USER_REGISTER_REQ,
//   USER_REGISTER_REQ_SUCCESS,
//   USER_REGISTER_REQ_FAIL,
// } from "../Constants/User";

// //user login
// export const userLoginReducer = (state = {}, action) => {
//   switch (action.type) {
//     case USER_LOGIN_REQ:
//       return { loading: true };
//     case USER_LOGIN_REQ_SUCCESS:
//       return { loading: false, userInfo: action.payload };
//     case USER_LOGIN_REQ_FAIL:
//       return { loading: false, error: action.payload };
//     case USER_LOGOUT:
//       return {};
//     default:
//       return state;
//   }
// };

// //user REgister
// export const userRegisterReducer = (state = {}, action) => {
//   switch (action.type) {
//     case USER_REGISTER_REQ:
//       return { loading: true };
//     case USER_REGISTER_REQ_SUCCESS:
//       return { loading: false, userInfo: action.payload };
//     case USER_REGISTER_REQ_FAIL:
//       return { loading: false, error: action.payload };
//     case USER_LOGOUT:
//       return {};
//     default:
//       return state;
//   }
// };

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    userLoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userRegisterRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    userRegisterSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    userRegisterFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userLogout: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
    },
  },
});

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
  userLogout,
} = authSlice.actions;

export default authSlice.reducer;
