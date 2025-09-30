const Group = require("../models/Groups");
const User = require("../models/User");

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Group name is required" });
    }

    // Default members array → creator always included
    const memberList = members && members.length > 0 ? members : [req.user.id];

    const group = await Group.create({ name, members: memberList, balances: {} });

    res.status(201).json({
      success: true,
      message: "Group created successfully",
      data: group,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating group",
      error: error.message,
    });
  }
};

// Get all groups for logged in user
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user.id }).populate(
      "members",
      "name email"
    );
    res.json({ success: true, data: groups });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching groups",
      error: error.message,
    });
  }
};

// Add a member to group (by email)
exports.addMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const group = await Group.findById(id);
    if (!group)
      return res.status(404).json({ success: false, message: "Group not found" });

    if (group.members.includes(user._id)) {
      return res
        .status(400)
        .json({ success: false, message: "User already in group" });
    }

    group.members.push(user._id);
    await group.save();

    res.json({ success: true, message: "Member added", data: group });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding member",
      error: error.message,
    });
  }
};

// Get single group details
exports.getGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate(
      "members",
      "name email"
    );
    if (!group)
      return res.status(404).json({ success: false, message: "Group not found" });

    res.json({ success: true, data: group });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching group",
      error: error.message,
    });
  }
};

// Get group balances
exports.getGroupBalances = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate("members", "name");
    if (!group)
      return res.status(404).json({ success: false, message: "Group not found" });

    res.json({ success: true, data: group.balances });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching balances",
      error: error.message,
    });
  }
};

// Get settlements
exports.getGroupSettlements = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate("members", "name");
    if (!group)
      return res.status(404).json({ success: false, message: "Group not found" });

    const balances = group.balances || {};
    const settlements = [];

    Object.entries(balances).forEach(([key, value]) => {
      if (value > 0) {
        const [debtorId, creditorId] = key.split("_");
        const debtor = group.members.find((m) => m._id.toString() === debtorId);
        const creditor = group.members.find((m) => m._id.toString() === creditorId);

        if (debtor && creditor) {
          settlements.push({ from: debtor.name, to: creditor.name, amount: value });
        }
      }
    });

    res.json({ success: true, data: settlements });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error calculating settlements",
      error: error.message,
    });
  }
};
