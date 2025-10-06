import React from "react";

export default function BalanceSummary({ balances }) {
  if (!balances.length) {
    return <p className="mt-4 text-gray-500">No balances yet.</p>;
  }

  return (
    <div className="mt-6 bg-gray-50 p-4 rounded border shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Balance Summary</h2>
      <ul className="list-disc pl-6 space-y-1">
        {balances.map((b, i) => (
          <li key={i}>
            <span className="font-medium">{b.from}</span> owes{" "}
            <span className="font-medium">{b.to}</span> ₹{b.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
