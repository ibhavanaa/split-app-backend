const Expense = require('../models/Expense');

exports.getPeople = async (req, res) => {
  const expenses = await Expense.find();
  const peopleSet = new Set();

  expenses.forEach(e => {
    peopleSet.add(e.paid_by);
    e.participants?.forEach(p => peopleSet.add(p));
  });

  res.json({ success: true, data: [...peopleSet] });
};

exports.getBalances = async (req, res) => {
  const expenses = await Expense.find();
  const balances = {};

  expenses.forEach(({ amount, paid_by, participants }) => {
    const split = amount / participants.length;

    participants.forEach(p => {
      balances[p] = (balances[p] || 0) - split;
    });

    balances[paid_by] = (balances[paid_by] || 0) + amount;
  });

  res.json({ success: true, data: balances });
};

exports.getSettlements = async (req, res) => {
  const balances = {};
  const expenses = await Expense.find();

  expenses.forEach(({ amount, paid_by, participants }) => {
    const share = amount / participants.length;

    participants.forEach(p => {
      balances[p] = (balances[p] || 0) - share;
    });

    balances[paid_by] = (balances[paid_by] || 0) + amount;
  });

  const creditors = [], debtors = [];

  Object.entries(balances).forEach(([person, balance]) => {
    if (balance > 0) creditors.push([person, balance]);
    else if (balance < 0) debtors.push([person, -balance]);
  });

  const settlements = [];

  while (creditors.length && debtors.length) {
    const [cName, cAmt] = creditors[0];
    const [dName, dAmt] = debtors[0];

    const paid = Math.min(cAmt, dAmt);
    settlements.push({ from: dName, to: cName, amount: paid });

    if (cAmt > dAmt) creditors[0][1] -= paid, debtors.shift();
    else if (cAmt < dAmt) debtors[0][1] -= paid, creditors.shift();
    else creditors.shift(), debtors.shift();
  }

  res.json({ success: true, data: settlements });
};
