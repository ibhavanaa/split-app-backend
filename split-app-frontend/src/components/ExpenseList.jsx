// src/components/ExpenseList.jsx
import React from "react";

export default function ExpenseList({ expenses }) {
  if (!expenses.length) {
    return <p className="text-gray-500">No expenses yet.</p>;
  }

  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Description</th>
          <th className="p-2 border">Amount</th>
          <th className="p-2 border">Paid By</th>
          <th className="p-2 border">Date</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp) => (
          <tr key={exp._id}>
            <td className="p-2 border">{exp.description}</td>
            <td className="p-2 border">₹{exp.amount}</td>
            <td className="p-2 border">{exp.paidBy?.name || "Unknown"}</td>
            <td className="p-2 border">
              {new Date(exp.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
