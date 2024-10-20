const exModel = require("../models/expenseModel");

// create new expenses
exports.createExpense = async (req, res) => {
  try {
    const expenseData = req.body;
    const response = await exModel.createExpense(expenseData);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get all expenses
exports.getExpenses = async (req, res) => {
    try {
        const response = await exModel.getExpenses();
        res.status(200).json(response);
    } catch (err) { 
        res.status(500).json({ error: err.message });
    }
}

// delete  expense
exports.deleteExpense = async (req, res) => {
    try {
      const { id } = req.params;
      await exModel.deleteExpense(id);
    res.status(200).json({message: "Expense deleted successfully"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// update expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expenseData = req.body;
    const response = await exModel.updateExpense(id, expenseData);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}