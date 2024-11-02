const userModel = require("../models/userModel");
const exModel = require("../models/expenseModel");
const sequelize = require("../util/db");

// create new expenses
exports.createExpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { amount, description, category } = req.body;
    const UserId = req.user;
    // create new expense
    const response = await exModel.create(
      { amount, description, category, UserId },
      { transaction: t }
    );
    // update total expense
    const user = await userModel.findOne({ where: { id: UserId } });
    const totalExpense = parseFloat(user.totalexpense) + parseFloat(amount);
    await userModel.update(
      { totalexpense: totalExpense },
      { where: { id: UserId } },
      { transaction: t }
    );
    await t.commit();
    res.status(201).json(response);
  } catch (err) {
    await t.rollback();
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
// delete expense
exports.deleteExpense = async (req, res) => {
  const t = await sequelize.transaction();
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
    res.status(500).json({ error: err.message });
  }
};

// update expense
exports.updateExpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { amount, description, category } = req.body;
    const response = await exModel.update(
      { amount, description, category },
      { where: { id }, transaction: t }
    );
    await t.commit();
    res.status(200).json(response);
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

// update total income
exports.updateTotalIncome = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { amount } = req.body;
    const UserId = req.user;
    console.log("user id", UserId);
    const user = await userModel.findOne({ where: { id: UserId } });
    const totalIncome = parseFloat(user.totalincome) + parseFloat(amount);
    await userModel.update(
      { totalincome: totalIncome },
      { where: { id: UserId } },
      { transaction: t }
    );
    await t.commit();
    res.status(200).json({ message: "Total income updated successfully" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
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
