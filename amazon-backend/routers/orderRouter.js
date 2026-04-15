import express from "express";
import expressAsyncHandler from "express-async-handler";

import Order from "../models/orderModel.js";
import OrderItem from "../models/orderItemModel.js";
import Product from "../models/productModel.js";

import { isAuth } from "../utils.js";

const orderRouter = express.Router();


// 🧾 Get logged-in user's orders
orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.findAll({
      where: { UserId: req.user.id },
      include: [OrderItem],
    });

    res.send(orders);
  })
);


// 🛒 Create Order
orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
      return;
    }

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    // ✅ Create Order
    const order = await Order.create({
      fullName: shippingAddress.fullName,
      address: shippingAddress.address,
      city: shippingAddress.city,
      postalcode: shippingAddress.postalcode,
      country: shippingAddress.country,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      UserId: req.user.id,
    });

    // ✅ Create Order Items
    for (const item of orderItems) {
      await OrderItem.create({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        OrderId: order.id,
        ProductId: item.product,
      });
    }

    res.status(201).send({
      message: "New order created.",
      order,
    });
  })
);


// 🔍 Get Order by ID
orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findByPk(req.params.id, {
      include: [OrderItem],
    });

    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order not found." });
    }
  })
);


// 💳 Mark Order as Paid
orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findByPk(req.params.id);

    if (order) {
      await order.update({
        isPaid: true,
        paidAt: new Date(),
        paymentId: req.body.id,
        paymentStatus: req.body.status,
        paymentUpdateTime: req.body.update_time,
        paymentEmail: req.body.email_address,
      });

      res.send({
        message: "Order paid.",
        order,
      });
    } else {
      res.status(404).send({ message: "Order not found." });
    }
  })
);


export default orderRouter;