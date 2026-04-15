import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "amazon_clone",   // DB_NAME
  "root",           // DB_USER
  "12345",          // DB_PASSWORD
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;