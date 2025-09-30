const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  createGroup,
  getAllGroups,
  addMember,
  getGroup,
  getGroupBalances,
  getGroupSettlements,
} = require("../controllers/groupController");

// Protected routes
router.post("/", authMiddleware, createGroup);                  // POST /api/groups
router.get("/", authMiddleware, getAllGroups);                  // GET /api/groups
router.post("/:id/members", authMiddleware, addMember);         // POST /api/groups/:id/members
router.get("/:id", authMiddleware, getGroup);                   // GET /api/groups/:id
router.get("/:id/balances", authMiddleware, getGroupBalances);  // GET /api/groups/:id/balances
router.get("/:id/settlements", authMiddleware, getGroupSettlements); // GET /api/groups/:id/settlements

module.exports = router;
