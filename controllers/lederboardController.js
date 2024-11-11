const userModel = require("../models/userModel");

exports.leaderboard = async (req, res) => {
  try {
    const leaderboard = await userModel.findAll({
      attributes: ["id" , "totalexpense" , "name"], 
      order: [["totalexpense", "DESC"]],
    })
    res.status(200).json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
