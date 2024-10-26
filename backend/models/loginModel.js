const {Sequlize, DataTypes} = require("sequelize");
const sequelize = require("../util/db");

const users = sequelize.define(
    "users",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "users",
        timestamps: false
    }
);

module.exports = users; 
    