const router = require("express").Router();
const User = require("./models/user");
const users = require("./data/Users");
const Product = require("./models/product");
const products = require("./data/products");

router.post("/users", async (req, res) => {
  await User.deleteMany({}); // if user exist under the collection, we need to delete a all data
  const UserSeeder = await User.insertMany(users);
  res.send({
    UserSeeder,
  });
});

router.get("/products", async (req, res) => {
  await Product.deleteMany({}); // if user exist under the collection, we need to delete a all data
  const ProductSeeder = await Product.insertMany(products);
  res.send({
    ProductSeeder,
  });
});

module.exports = router;
