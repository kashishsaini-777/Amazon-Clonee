import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";

import sequelize from "./config/db.js";
import "./models/index.js";

dotenv.config();

const app = express();

// ✅ Use dynamic PORT (IMPORTANT)
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "*"
}));

// Routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("E-commerce backend running 🚀");
});

// 🚀 Start Server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected");

    // ✅ SAFE sync (no data loss)
    await sequelize.sync();
    console.log("✅ Tables synced");

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });

  } catch (error) {
    console.error("❌ DB Connection Error:", error);
  }
};

startServer();