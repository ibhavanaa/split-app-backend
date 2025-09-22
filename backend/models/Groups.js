const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  balances: { type: Map, of: Number, default: {} } 
  // key: "userId1_userId2", value: net amount owed
}, { timestamps: true });

module.exports = mongoose.model("Group", groupSchema);
