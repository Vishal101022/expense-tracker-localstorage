const express = require("express");
const router = express.Router();
const userIncomeController = require("../controllers/userIncomeController");
const auth = require("../middleware/authMiddleware");

router.post("/income", auth.authMiddleware, userIncomeController.postIncome);
router.get("/income", auth.authMiddleware, userIncomeController.getIncome);
router.patch("/income", auth.authMiddleware, userIncomeController.updateIncome);

module.exports = router;