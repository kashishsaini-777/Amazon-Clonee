import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";

import sequelize from "./config/db.js";
import "./models/index.js"; // relationships

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Middlewares
app.use(express.json());
app.use(cors());

// ✅ Routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.get("/", (req, res) =>
  res.status(200).send("Hello Kashish here. My E-commerce project 🚀")
);


// ✅ Connect MySQL + Start Server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected");

    await sequelize.sync({ alter: true }); 
    console.log("✅ Tables synced");

    app.listen(port, () =>
      console.log(`🚀 Server running at http://localhost:${port}`)
    );
  } catch (error) {
    console.error("❌ DB Connection Error:", error);
  }
};

startServer();