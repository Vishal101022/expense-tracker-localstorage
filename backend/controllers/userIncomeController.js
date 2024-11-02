const userIncomeModel = require("../models/userIncomeModel");

exports.postIncome = async (req, res) => {
  try {
    const userId = req.user;
    const { amount } = req.body;
    console.log(amount, userId);
    const response = await userIncomeModel.create({
      amount,
      UserId: userId,
    });

    res.status(201).json({ message: "Income created successfully", response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getIncome = async (req, res) => {
  try {
    const userId = req.user;
    const response = await userIncomeModel.findOne({ where: { UserId: userId } });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateIncome = async (req, res) => {
  try {
    const userId = req.user;
    const { amount } = req.body;
    const response = await userIncomeModel.update(
      { amount },
      { where: { UserId: userId } }
    );
    res.status(200).json({ message: "Income updated successfully", response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}