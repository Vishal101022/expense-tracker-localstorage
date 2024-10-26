const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize("expenses", process.env.DB_USER, process.env.DB_PASS,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;
