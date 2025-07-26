const mongoose = require("mongoose");

// const reviewSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   rating: { type: Number, required: true },
//   comment: { type: String, required: true },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "User",
//   },
// });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: {
    type: String,
    required: true,
  },
  price: { type: Number, require: true },
  countInStock: { type: Number, require: true },
  rating: { type: Number, required: true },
  // reviews: [reviewSchema],
});

module.exports = mongoose.model("Product", productSchema);
