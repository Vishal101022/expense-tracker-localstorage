const exModel = require("../models/expenseModel");

// create new expenses
exports.createExpense = async (req, res) => {
  try {
    const { amount, description, category} = req.body;
    const response = await exModel.create({amount, description, category});
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get all expenses
exports.getExpenses = async (req, res) => {
    try {
      const response = await exModel.findAll({
            attributes: ["id", "amount", "description", "category"],
        });
        res.status(200).json(response);
    } catch (err) { 
        res.status(500).json({ error: err.message });
    }
}

// delete  expense
exports.deleteExpense = async (req, res) => {
    try {
      const { id } = req.params;
      await exModel.destroy({ where: { id } });
    res.status(200).json({message: "Expense deleted successfully"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

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