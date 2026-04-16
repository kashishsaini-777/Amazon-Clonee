import dotenv from "dotenv";
dotenv.config();

import sequelize from "./config/db.js";
import Product from "./models/productModel.js";
import { products } from "./products.js";

const seedData = async () => {
  try {
    await sequelize.sync();

    await Product.bulkCreate(products);

    console.log("✅ Products inserted");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
