const db = require("../util/db");

// create new expenses
exports.createExpense = async (expenseData) => {
  const { amount, description, category } = expenseData;
  try {
    const response = await db.query(
      "INSERT INTO expense (amount, description, category) VALUES (?, ?, ?)",
      [amount, description, category]
    );
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

// get all expenses
exports.getExpenses = async () => {
  try {
    const [result, fields] = await db.query(
      "select id, amount, description, category from expense"
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

// delete  expense
exports.deleteExpense = async (id) => {
  try {
    const response = await db.query("DELETE FROM expense WHERE id = ?", [id]);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

// update expense
exports.updateExpense = async (id, expenseData) => {
  const { amount, description, category } = expenseData;
  try {
    const [result, fields] = await db.query(
      "UPDATE expense SET amount = ?, description = ?, category = ? WHERE id = ?",
      [amount, description, category, id]
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
};
