const express = require("express");
const productRoute = express.Router();
const Product = require("../models/product");

productRoute.get("/pro", async (req, res) => {
  const products = await Product.find({});
  res.json({ products });
});

//get product by id
productRoute.get("/:id", async (req, res) => {
  const getProductById = await Product.findById(req.params.id);
  if (getProductById) {
    res.json({
      _id: getProductById._id,
      name: getProductById.name,
      image: getProductById.image,
      description: getProductById.description,
      price: getProductById.price,
      countInStock: getProductById.countInStock,
      rating: getProductById.rating,
      __v: getProductById.__v,
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

module.exports = productRoute;
