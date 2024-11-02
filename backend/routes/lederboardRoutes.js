const express = require("express");
const router = express.Router();
const lederboardController = require("../controllers/lederboardController");
const auth = require("../middleware/authMiddleware");

router.get("/lederboard",auth.isPremium, lederboardController.leaderboard);

module.exports = router