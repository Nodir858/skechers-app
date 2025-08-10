import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCartAction } from "../Redux/Actions/Cart";

const Checkout = ({ isSidebarOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const total = cartItems
    .reduce((total, item) => total + item.qty * item.price, 0)
    .toFixed(2);
  const removeFromCart = (id) => {
    dispatch(removeFromCartAction(id));
  };

  return (
    <div
      style={{
        transform: `translateX(${isSidebarOpen ? "0%" : "100%"})`,
      }}
      className="fixed top-0 right-0 h-full w-[25%] bg-white duration-300 transition-transform ease-in-out"
    >
      <div className="relative h-full">
        <div className="mb-5">
          <h1 className="px-5 py-5 text-xl">Shopping cart</h1>
        </div>
        <div className="absolute top-5 right-5 text-2xl">
          <span onClick={toggleSidebar}>
            <FaTimes />
          </span>
        </div>
        {cartItems.length === 0 ? (
          <div>
            <h1>Your Product has NO Product</h1>
          </div>
        ) : (
          <div className="">
            {cartItems.map((item, key) => (
              <div
                key={key}
                className=" flex justify-around mb-2 font-medium shadow-md"
              >
                <div>
                  <span>
                    <FaTimes
                      onClick={() => removeFromCart(item.product)}
                    ></FaTimes>
                  </span>
                  <img src={item.image} alt="item" height={128} width={128} />
                  {/* <span>FaTimes</span> */}
                </div>
                <div className="flex items-center">
                  <p>{item.name}</p>
                </div>
                <div className="flex items-center">
                  <p>${item.price}</p>
                </div>
                <div className=" flex items-center">
                  <p>Qty: {item.qty}</p>
                </div>
              </div>
            ))}
            <div className="border-t-1 block space-y-2 mt-10 border-zinc-400 p-3">
              <h2 className="flex justify-between font-medium">
                Sub Total: <span>${total}</span>
              </h2>
              <p className="text-sm text-shadow-slate-500">
                Shipping and taxes calculated at checkout
              </p>
              <button className="py-2 w-full rounded-md bg-indigo-500 text-white text-sm cursor-pointer">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
