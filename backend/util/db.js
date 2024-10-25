const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("expenses", "root", "101022", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
