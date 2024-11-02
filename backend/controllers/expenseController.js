const userModel = require("../models/userModel");
const exModel = require("../models/expenseModel");

// create new expenses
exports.createExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const UserId = req.user
    // create new expense
    const response = await exModel.create({ amount, description, category, UserId });
    // update total expense
    const user = await userModel.findOne({ where: { id: UserId } });
    const totalExpense = parseFloat(user.totalexpense) + parseFloat(amount);
    await userModel.update({ totalexpense: totalExpense }, { where: { id: UserId } });

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get all expenses
exports.getExpenses = async (req, res) => {
  try {
      const UserId = req.user
      const response = await exModel.findAll({where: {UserId}}, ["id", "amount", "description", "category"]);
        res.status(200).json(response);
    } catch (err) { 
        res.status(500).json({ error: err.message });
    }
}

// delete  expense
// delete expense
exports.deleteExpense = async (req, res) => {
  console.log("inside delete api");
  try {
    const { id } = req.params;
    const UserId = req.user;

    const expense = await exModel.findOne({ where: { id, UserId } });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const user = await userModel.findOne({ where: { id: UserId } });
    const updatedTotalExpense = parseFloat(user.totalexpense) - parseFloat(expense.amount);
    
    await userModel.update({ totalexpense: updatedTotalExpense }, { where: { id: UserId } });

    await exModel.destroy({ where: { id, UserId } });

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, category} = req.body;
    const response = await exModel.update({amount, description, category}, {where: {id}});
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// update total income 
exports.updateTotalIncome = async (req, res) => {
  try {
    const { amount } = req.body;
    const UserId = req.user
    console.log("user id", UserId);
    const user = await userModel.findOne({ where: { id: UserId } });
    const totalIncome = parseFloat(user.totalincome) + parseFloat(amount);
    await userModel.update({ totalincome: totalIncome }, { where: { id: UserId } });
    res.status(200).json({ message: "Total income updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
}

// get total expense & income
exports.getTotals = async (req, res) => {
  try {
    const UserId = req.user
    const user = await userModel.findOne({ where: { id: UserId } });
    const totalIncome = parseFloat(user.totalincome);
    const totalExpense = parseFloat(user.totalexpense);
    res.status(200).json({ totalIncome, totalExpense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}