const userModel = require("../models/userModel");
const downloadModel = require("../models/download");
const exModel = require("../models/expenseModel");
const s3Service = require("../services/S3Service");
const sequelize = require("../util/db");
const { json } = require("body-parser");


// create new expenses
exports.createExpense = async (req, res) => {
  const { amount, description, category } = req.body;
  const UserId = req.user;

  try {
    const user = await userModel.findOne({ where: { id: UserId } });
    const updatedTotalExpense =
      parseFloat(user.totalexpense) + parseFloat(amount);

    const t = await sequelize.transaction();
    try {
      const response = await exModel.create(
        { amount, description, category, UserId },
        { transaction: t }
      );

      await userModel.update(
        { totalexpense: updatedTotalExpense },
        { where: { id: UserId }, transaction: t }
      );

      await t.commit();
      res.status(201).json(response);
    } catch (err) {
      await t.rollback();
      throw err;
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const UserId = req.user;
    const response = await exModel.findAll({ where: { UserId } }, [
      "id",
      "amount",
      "description",
      "category",
    ]);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete  expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const UserId = req.user;

    const expense = await exModel.findOne({ where: { id, UserId } });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const user = await userModel.findOne({ where: { id: UserId } });
    const updatedTotalExpense =
      parseFloat(user.totalexpense) - parseFloat(expense.amount);
    try {
      const t = await sequelize.transaction();
      await userModel.update(
        { totalexpense: updatedTotalExpense },
        { where: { id: UserId } },
        { transaction: t }
      );

      await exModel.destroy({ where: { id, UserId } }, { transaction: t });

      res.status(200).json({ message: "Expense deleted successfully" });
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update expense and total expense from user table
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, category } = req.body;
    const oldAmountFromExpense = await exModel.findOne({ where: { id } });
    if (amount !== oldAmountFromExpense.amount) {
      const user = await userModel.findOne({ where: { id: req.user } });
      const oldexpense = await exModel.findOne({ where: { id } });
      const updatedTotalExpense =
        parseFloat(user.totalexpense) - parseFloat(oldexpense.amount);
      const newTotalExpense =
        parseFloat(updatedTotalExpense) + parseFloat(amount);
      await user.update({ totalexpense: newTotalExpense });
    }
    try {
      const t = await sequelize.transaction();
      const response = await exModel.update(
        { amount, description, category },
        { where: { id }, transaction: t }
      );
      await t.commit();
      res.status(200).json(response);
    } catch (err) {
      await t.rollback();
      throw err;
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update total income
exports.updateTotalIncome = async (req, res) => {
  try {
    const { amount } = req.body;
    const UserId = req.user;

    const user = await userModel.findOne({ where: { id: UserId } });
    const totalIncome = parseFloat(user.totalincome) + parseFloat(amount);
    try {
      const t = await sequelize.transaction();

      await userModel.update(
        { totalincome: totalIncome },
        { where: { id: UserId } },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json({ message: "Total income updated successfully" });
    } catch (error) {
      await t.rollback();
      throw error;
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get total expense & income
exports.getTotals = async (req, res) => {
  try {
    const UserId = req.user;
    const user = await userModel.findOne({ where: { id: UserId } });
    const totalIncome = parseFloat(user.totalincome);
    const totalExpense = parseFloat(user.totalexpense);
    res.status(200).json({ totalIncome, totalExpense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.postexpenseDownload = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const UserId = req.user;
    console.log("User id", UserId);
    const result = await exModel.findAll({ where: { UserId } });
    expenseData = JSON.stringify(result);

    const filename = `Expense${UserId}/${new Date().toISOString()}.txt`;
    const url= await s3Service.uploadFileToS3(expenseData, filename);
    await downloadModel.create({ url, UserId }, { transaction: t });
    await t.commit();
    res.status(200).json({ url });
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

exports.getexpenseDownload = async (req, res) => {
  try {
    const UserId = req.user;
    const result = await downloadModel.findAll({ where: { UserId } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}