import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../Redux/Actions/Product";
import { Link } from "react-router-dom";
const Products = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products = [] } = productList;

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);
  return (
    <>
      <section>
        {loading ? (
          <h1>loading</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <div>
            <h1>Flash Sale</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10  max-w-[80rem] m-auto">
              {products.map((item, index) => (
                <div className="rounded-2xl" key={index}>
                  <Link to={`/products/${item._id}`}>
                    <div className="">
                      <img
                        className="object-cover rounded-xl"
                        src={item.image}
                        alt="img"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-lg font-semibold cursor-pointer">
                        {item.name}
                      </p>

                      <p className="text-green-600 font-bold">${item.price}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Products;
{
  /* <div>
  <h1>Flash Sale</h1>
  <div></div>
</div>; */
}
