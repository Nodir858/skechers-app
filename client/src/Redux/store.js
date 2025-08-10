import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { productListReducer, productReducer } from "./Reducers/Product";
import authReducer from "./Reducers/User";
import cartReducer from "./Reducers/Cart";
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

//combine two reducers into in rootReducer
const rootReducer = combineReducers({
  productList: productListReducer,
  productRed: productReducer,
  auth: authReducer,
  cart: cartReducer,
});

//enhance the reducer with redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export let persistor = persistStore(store);

//why we using redux-persist. To save redux state(cart, products or etc) to localStorage or sessionStorage, we will not lose and lost state after on page refresh
//middlewares = runs between a dispatched action and the moment it reaches the reducer
//redux-thunk, thunk = a piece of code that does some delay work, we can write code that can be used to perform the work later
//redux-thunk, we can fetch the data and after we can store that into the redux store
//redux only accepts plain objects
//the only way to change data in the state is dispatching an action which is a plain object as well
