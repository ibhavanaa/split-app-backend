const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  paid_by: { type: String, required: true },
  participants: [{ type: String }],
  split_type: { type: String, enum: ['equal', 'percentage', 'exact'], default: 'equal' },
  split_values: { type: mongoose.Schema.Types.Mixed } // e.g., { Shantanu: 20, Om: 40 }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
