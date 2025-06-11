const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find();
  res.json({ success: true, data: expenses });
};

exports.addExpense = async (req, res) => {
  try {
    const { amount, description, paid_by, participants, split_type, split_values } = req.body;

    if (!amount || amount <= 0) return res.status(400).json({ message: "Invalid amount" });
    if (!description || !paid_by) return res.status(400).json({ message: "Missing fields" });

    const expense = new Expense({ amount, description, paid_by, participants, split_type, split_values });
    await expense.save();

    res.status(201).json({ success: true, data: expense, message: "Expense added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving expense" });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Expense not found" });

    res.json({ success: true, data: updated });
  } catch {
    res.status(500).json({ success: false, message: "Error updating" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });

    res.json({ success: true, message: "Deleted successfully" });
  } catch {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};
