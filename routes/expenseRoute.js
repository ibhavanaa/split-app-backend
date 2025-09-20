const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  addExpense,
  getExpenses
} = require("../controllers/expenseController");

// Protected routes
router.post("/:groupId/expenses", authMiddleware, addExpense);  // POST /api/groups/:groupId/expenses
router.get("/:groupId/expenses", authMiddleware, getExpenses);  // GET /api/groups/:groupId/expenses

module.exports = router;
