const Expense = require("../models/Expense");
const Group = require("../models/Groups");

// Add an expense
exports.addExpense = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { amount, description, paidBy, participants, splitType, splitValues } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ success: false, message: "Group not found" });

    // Calculate splits
    let splits = [];
    if (splitType === "equal") {
      const share = amount / participants.length;
      splits = participants.map(p => ({ user: p, amountOwed: share }));
    } else if (splitType === "exact") {
      splits = Object.entries(splitValues).map(([user, val]) => ({ user, amountOwed: val }));
    } else if (splitType === "percentage") {
      splits = Object.entries(splitValues).map(([user, val]) => ({ user, amountOwed: (val / 100) * amount }));
    }

    // Save expense
    const expense = await Expense.create({
      group: groupId,
      amount,
      description,
      paidBy,
      splits,
      splitType
    });

    // Update balances inside group
    splits.forEach(s => {
      if (s.user.toString() !== paidBy.toString()) {
        const key = `${s.user}_${paidBy}`;
        const prev = group.balances.get(key) || 0;
        group.balances.set(key, prev + s.amountOwed);
      }
    });

    await group.save();

    res.status(201).json({ success: true, message: "Expense added", data: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding expense", error: error.message });
  }
};

// Get all expenses in group
exports.getExpenses = async (req, res) => {
  try {
    const { groupId } = req.params;

    const expenses = await Expense.find({ group: groupId })
      .populate("paidBy", "name")
      .populate("splits.user", "name");

    res.json({ success: true, data: expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching expenses", error: error.message });
  }
};
