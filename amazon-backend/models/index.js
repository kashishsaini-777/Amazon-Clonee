import User from "./userModel.js";
import Order from "./orderModel.js";
import OrderItem from "./orderItemModel.js";
import Product from "./productModel.js";

// User → Orders
User.hasMany(Order);
Order.belongsTo(User);

// Order → OrderItems
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

// Product → OrderItems
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);