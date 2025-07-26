const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const mongoose = require("mongoose");
const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
app.use(express.json());

//connect db
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("database connected"))
  .catch((error) => {
    console.log(error);
  });

//database seeder routes
app.use("/api/seed", databaseSeeder);
app.use("/api/users", userRoute); //routes for user
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
