import express from "express";
import expressAsyncHandler from "express-async-handler";

import Product from "../models/productModel.js";
import { products } from "../products.js";

const productRouter = express.Router();


// 📦 Get all products
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.findAll();
    res.send({products});
  })
);


// 🌱 Seed products (insert initial data)
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // Optional: clear table first
    //await Product.destroy({ where: {}, truncate: true });

    const createdProducts = await Product.bulkCreate(products);

    res.send({ createdProducts });
  })
);


// 🔍 Get product by ID
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id);

    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found." });
    }
  })
);


export default productRouter;