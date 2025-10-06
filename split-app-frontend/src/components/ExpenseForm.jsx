import React, { useState } from "react";

export default function ExpenseForm({ onAddExpense }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitType, setSplitType] = useState("equal");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !paidBy) return;

    onAddExpense({
      description,
      amount: Number(amount),
      paidBy,
      splitType,
    });

    setDescription("");
    setAmount("");
    setPaidBy("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded mb-4 shadow-sm bg-gray-50"
    >
      <h2 className="text-lg font-semibold mb-3">Add Expense</h2>

      <input
        type="text"
        placeholder="Description (e.g., Dinner)"
        className="border p-2 w-full mb-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        className="border p-2 w-full mb-2 rounded"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="text"
        placeholder="Paid By (e.g., Alice)"
        className="border p-2 w-full mb-2 rounded"
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-3 rounded"
        value={splitType}
        onChange={(e) => setSplitType(e.target.value)}
      >
        <option value="equal">Equal Split</option>
      </select>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
      >
        Add Expense
      </button>
    </form>
  );
}
