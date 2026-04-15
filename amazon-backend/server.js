import express from "express";
import cors from "cors";

import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";

import sequelize from "./config/db.js";
import "./models/index.js";

const app = express();
const port = 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("E-commerce backend running 🚀");
});

// 🔥 Start Server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected");

    // 🔥 TEMP FIX: force recreate tables (VERY IMPORTANT)
    await sequelize.sync({ force: true });
    console.log("🔥 Tables recreated (schema fixed)");

    // 👉 AFTER FIRST RUN, change back to:
    // await sequelize.sync();

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });

  } catch (error) {
    console.error("❌ DB Connection Error:", error);
  }
};

startServer();