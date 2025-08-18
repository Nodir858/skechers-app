import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../Redux/Actions/Product";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { addToCartAction } from "../Redux/Actions/Cart";
const ProductDetail = () => {
  const { id } = useParams(); //we can fetch the ID from url

  const dispatch = useDispatch();
  const productRed = useSelector((state) => state.productRed); //accept productRed from redux store
  const { loading, error, product = {} } = productRed; //receive data from productReducer
  useEffect(() => {
    dispatch(productAction(id));
  }, [dispatch, id]);

  const [qty, setQty] = useState(1);
  const addToCartHandler = () => {
    dispatch(addToCartAction(id, qty));
  };
  return (
    <>
      <section className="bg-white min-h-screen w-full flex">
        {loading ? (
          <h1>loading</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <article className="max-w-[60rem] h-auto m-auto lg:flex ">
            <div className="mr-3">
              <img
                className="m-auto w-[20rem] md:h-[25rem] md:w-[25rem] lg:h-[30rem] lg:w-[90rem] rounded-2xl"
                src={product.image}
                alt=""
              />
            </div>
            <div className="m-5">
              <div className="mb-5">
                <p>BRAND NAME</p>
                <h1 className="text-2xl font-bold">{product.name}</h1>
              </div>
              <div className="mb-5">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                  animi, magnam porro quo, eaque debitis officiis amet pariatur
                  cum tenetur magni autem aspernatur explicabo dignissimos sint
                  ratione mollitia! Exercitationem, quia.
                </p>
              </div>
              {/* Colors and Quantity */}
              <div className=" w-61 flex justify-between mb-5 font-sans">
                <div className=" flex  items-center">
                  <span className="text-base">Color</span>
                  <div className="w-20 flex justify-between">
                    <button className="bg-white rounded-full h-6 w-6 border-1 border-slate-500"></button>
                    <button className="bg-black rounded-full h-6 w-6 border-1 border-slate-500"></button>
                    <button className="bg-indigo-500 rounded-full h-6 w-6 border-1 border-slate-500"></button>
                  </div>
                </div>
                {product.countInStock > 0 ? (
                  <div className="flex items-center">
                    <span>Quantity</span>
                    <div className="flex border-1 justify-between">
                      {/* parseInt() parses a string and returns the first integer */}
                      <select
                        value={qty}
                        onChange={(e) => setQty(parseInt(e.target.value, 10))}
                        id=""
                        className="w-12 p-1"
                      >
                        {/* key() iterator 0,1,2,3, we need spread operator for turn that iterator into a real array*/}
                        {[...Array(product.countInStock).keys()].map(
                          (value) => (
                            <option key={value + 1}>{value + 1}</option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex justify-between items-center border-t-1 border-slate-500 py-2">
                <span className="font-bold text-xl">${product.price}</span>
                <div className="w-45  flex justify-between">
                  {product.countInStock > 0 ? (
                    <button
                      onClick={addToCartHandler}
                      className="bg-indigo-500 px-3 py-2 text-white rounded-lg font-semibold cursor-pointer"
                    >
                      Add To Cart
                    </button>
                  ) : (
                    <>
                      <h1 className="bg-indigo-500 px-3 py-2 text-white rounded-lg font-semibold cursor-not-allowed">
                        Unavailable
                      </h1>
                    </>
                  )}

                  <button className="w-10 flex justify-center px-3 py-2 items-center rounded-full bg-slate-300">
                    <FaHeart />
                  </button>
                </div>
              </div>
            </div>
          </article>
        )}
      </section>
    </>
  );
};

export default ProductDetail;
