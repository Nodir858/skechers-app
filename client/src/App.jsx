import { Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./common/Navbar.jsx";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import { useSelector } from "react-redux";
import PlaceOrder from "./pages/PlaceOrder.jsx";
function App() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/products/:id"
          element={<ProductDetail></ProductDetail>}
        ></Route>
        <Route
          path="/login"
          element={userInfo ? <Navigate to="/"></Navigate> : <Login></Login>}
        ></Route>
        <Route
          path="/register"
          element={
            userInfo ? <Navigate to="/"></Navigate> : <Register></Register>
          }
        ></Route>
        <Route path="/placeorder" element={<PlaceOrder></PlaceOrder>}></Route>
      </Routes>
    </>
  );
}

export default App;
