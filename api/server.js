const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const mongoose = require("mongoose");
const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoutes");
const cors = require("cors");
app.use(express.json());

//allow all origins by default
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8000"],
    credentials: true,
  })
);
//connect db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("database connected"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

//database seeder routes
app.use("/api/seed", databaseSeeder);
app.use("/api/users", userRoute); //routes for user
app.use("/api/products", productRoute); //routes for products
app.use("/api/orders", orderRoute);

app.use("/", (req, res) => {
  res.send("Hello World");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
