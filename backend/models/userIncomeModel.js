const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../util/db');
const User = require('./userModel');

const UserIncome = sequelize.define('userincome', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false
});

module.exports = UserIncome;
