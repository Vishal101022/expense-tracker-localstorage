const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const auth = require("../middleware/authMiddleware");

router.post("/expense",auth.authMiddleware, expenseController.createExpense);
router.get("/expenses",auth.authMiddleware, expenseController.getExpenses);  
router.delete("/expense/:id", expenseController.deleteExpense);
router.patch("/expense/:id", expenseController.updateExpense);

module.exports = router;