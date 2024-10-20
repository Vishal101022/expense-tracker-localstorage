const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.post("/expense", expenseController.createExpense);
router.get("/expenses", expenseController.getExpenses);  
router.delete("/expense/:id", expenseController.deleteExpense);
router.patch("/expense/:id", expenseController.updateExpense);

module.exports = router;