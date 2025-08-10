const express = require("express");
const productRoute = express.Router();
const Product = require("../models/product");

productRoute.get("/", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//get product by id
productRoute.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

module.exports = productRoute;
