const express = require("express");
const orderRoute = express.Router();
const protect = require("../middleware/Auth");
const Order = require("../models/Order");

//creating new order
orderRoute.post("/", protect, async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethods,
    shippingPrice,
    taxPrice,
    totalPrice,
    price,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({
      message: "No order items found",
    });
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethods,
      shippingPrice,
      taxPrice,
      totalPrice,
      price,
      user: req.user._id,
    });
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});
//order payment, update payment
orderRoute.put("/:id/payment", protect, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      updated_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});
module.exports = orderRoute;
