const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const User = sequelize.define(
    "User",
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        isPremiumUser: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        totalexpense: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        totalincome: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        }
    },
    {
        timestamps:true
    }
);
module.exports = User;
    