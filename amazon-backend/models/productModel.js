import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";


const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.TEXT, // better for long URLs
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    brand: {
      type: DataTypes.STRING,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    numReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);
export default Product;