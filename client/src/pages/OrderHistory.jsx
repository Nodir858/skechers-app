import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderListAction } from "../Redux/Actions/Order";
import dayjs from "dayjs";
const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(orderListAction());
  }, [dispatch]);
  return (
    <section className=" w-full">
      <div className=" lg:w-2/3 m-auto ">
        <div>
          <h2>My Orders</h2>
        </div>
        <div className="">
          {orders &&
            orders.map((order) => (
              <div
                key={order._id}
                className="flex-col sm:flex sm:flex-row flex-wrap sm:items-center border-2"
              >
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    Order ID:
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900">
                    <a href="#" className="hover:underline">
                      #{order._id}
                    </a>
                  </dd>
                </dl>
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    Date:
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900">
                    {dayjs(order.createdAt).format("MMM D YY")}
                  </dd>
                </dl>
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    Price:
                  </dt>
                  <dd>${order.totalPrice}</dd>
                </dl>
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    Status:
                  </dt>
                  <dd className="me-2 mt-1.5 inline-flex items-center rounded  bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    Paid
                  </dd>
                </dl>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default OrderHistory;
