const sequelize = require("../util/db");

exports.leaderboard = async (req, res) => {
  try {
    const leaderboard = await sequelize.query(
      `
      SELECT users.name, 
             SUM(expenses.amount) AS totalExpense
      FROM expenses
      JOIN users ON expenses.UserId = users.id
      GROUP BY users.id, users.name
      ORDER BY totalExpense DESC
    `,
      { type: sequelize.QueryTypes.SELECT }
    );

    res.status(200).json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
