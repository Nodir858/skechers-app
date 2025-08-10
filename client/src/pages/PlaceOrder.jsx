import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { addToCartAction } from "../Redux/Actions/Cart";
import { useState } from "react";
import { removeFromCartAction } from "../Redux/Actions/Cart";
const PlaceOrder = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const productRed = useSelector((state) => state.productRed);
  //const { loading, error, product = {} } = productRed;

  const removeFromCart = (id) => {
    dispatch(removeFromCartAction(id));
  };
  //shipping fee
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  //subtotal price
  const subtotal = addDecimal(
    cartItems.reduce((total, item) => total + item.qty * item.price, 0)
  );
  const taxPrice = addDecimal(Number(0.15 * subtotal).toFixed(2));
  const shippingPrice = addDecimal(subtotal > 100 ? 0 : 20);

  //total
  const total = (
    Number(subtotal) +
    Number(taxPrice) +
    Number(shippingPrice)
  ).toFixed(2);
  return (
    <article className="h-screen flex justify-center items-center space-x-[10rem]">
      <section className=" min-w-[40rem]">
        <div>
          <div className="mb-5">
            <h1>Order summary</h1>
          </div>
          <div className="w-full">
            {cartItems.map((item, key) => (
              <div
                key={key}
                className="flex justify-around mb-2 font-medium shadow-md p-1"
              >
                <div className="">
                  <img
                    src={item.image}
                    alt="item"
                    height={128}
                    width={128}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex items-center">
                  <p>{item.name}</p>
                </div>
                <div className="flex items-center">
                  <p>${item.price}</p>
                </div>
                <div className="flex items-center">
                  <p>Qty: {item.qty}</p>
                </div>
                <div
                  className="flex items-end"
                  onClick={(e) => removeFromCart(item.product)}
                >
                  <p>Remove</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <div className="flex justify-between border-b-1 border-zinc-400">
              <h2>Subtotal</h2>
              <p>${subtotal}</p>
            </div>
            <div className="flex justify-between border-b-1 border-zinc-400">
              <h2>Tax</h2>
              <p>${taxPrice}</p>
            </div>
            <div className="flex justify-between border-b-1 border-zinc-400">
              <h2>Shipping Price</h2>
              <p>${shippingPrice}</p>
            </div>
            <p>${total}</p>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div className="mb-5 font-bold text-xl">
            <h1>Shipping Address</h1>
          </div>

          <form action="" className="space-y-6">
            <div className="flex flex-col ">
              <label htmlFor="email" className="font-medium">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                className="border-1 px-3 py-1 rounded-md w-80"
                placeholder="address"
                onChange={(input) => {
                  setEmail(input.target.value);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="border-1 px-3 py-1 rounded-md w-80"
                placeholder="city"
                onChange={(input) => {
                  setEmail(input.target.value);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium">
                PostalCode
              </label>
              <input
                type="text"
                name="postalcode"
                id="postalcode"
                className="border-1 px-3 py-1 rounded-md w-80"
                placeholder="postalcode"
                onChange={(input) => {
                  setEmail(input.target.value);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium">
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                className="border-1 px-3 py-1 rounded-md w-80"
                placeholder="country"
                onChange={(input) => {
                  setEmail(input.target.value);
                }}
              />
            </div>
            <div className="">
              <button
                type="submit"
                className="border-1 px-4 py-1 rounded-lg bg-blue-600 text-white w-80"
              >
                Save Shipping Address
              </button>
            </div>
          </form>
        </div>
      </section>
    </article>
  );
};

export default PlaceOrder;
