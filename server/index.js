import express from "express";
import morgan from "morgan";
import connection from "./database/database.js";
import dotenv from "dotenv";
import userRoute from "./router/user.js";
import auhtRoute from "./router/auth.js";
import productRoute from "./router/product.js";
import cartRoute from "./router/cart.js";
import orderRoute from "./router/order.js";
import stripeRoute from "./router/stripe.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));
app.use("/api/auth", auhtRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

const MONGO_URI = process.env.MONGO_URI;
connection(MONGO_URI);
const Port = process.env.PORT;
app.listen(Port, () => {
  console.log(`Server is listening at ${Port}`);
});
