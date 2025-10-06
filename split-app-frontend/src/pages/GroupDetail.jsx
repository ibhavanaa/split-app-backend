import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import BalanceSummary from "../components/BalanceSummary";

export default function GroupDetail() {
  const { id } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState([]);

  // 🧠 Add expense locally (backend integration later)
  const handleAddExpense = (newExpense) => {
    const newExp = {
      ...newExpense,
      _id: Date.now(),
      createdAt: new Date(),
    };
    setExpenses([...expenses, newExp]);
    updateBalances(newExp);
  };

  // ⚖️ Simple balance calculation (frontend-only logic)
  const updateBalances = (expense) => {
    const participants = ["Alice", "Bob", "Charlie", "You"];
    const share = expense.amount / participants.length;
    const newBalances = participants
      .filter((p) => p !== expense.paidBy)
      .map((p) => ({
        from: p,
        to: expense.paidBy,
        amount: share,
      }));
    setBalances([...balances, ...newBalances]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Group: Goa Trip</h1>

      {/* Add Expense */}
      <ExpenseForm onAddExpense={handleAddExpense} />

      {/* Expenses */}
      <ExpenseList expenses={expenses} />

      {/* Balances */}
      <BalanceSummary balances={balances} />
    </div>
  );
}
