const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  splits: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amountOwed: { type: Number }
  }],
  splitType: { type: String, enum: ["equal", "percentage", "exact"], default: "equal" }
}, { timestamps: true });

module.exports = mongoose.model("Expense", expenseSchema);
