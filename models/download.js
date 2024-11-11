const { DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const Download = sequelize.define(
  "downloads",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Download;
