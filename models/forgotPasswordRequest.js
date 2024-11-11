const { DataTypes } = require('sequelize');
const sequelize = require("../util/db");

const ForgotPasswordRequests = sequelize.define("forgotpassrequests", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  isActive: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = ForgotPasswordRequests;