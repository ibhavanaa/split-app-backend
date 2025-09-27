// src/pages/GroupDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import ExpenseList from "../components/ExpenseList";

export default function GroupDetail() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [memberEmail, setMemberEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  // Fetch group info
  const fetchGroup = async () => {
    try {
      const res = await API.get(`/groups/${id}/expenses`);
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses", err);
    }

    try {
      const res = await API.get(`/groups/${id}/balances`);
      setBalances(res.data);
    } catch (err) {
      console.error("Error fetching balances", err);
    }

    try {
      const res = await API.get(`/groups/${id}/settlements`);
      setSettlements(res.data);
    } catch (err) {
      console.error("Error fetching settlements", err);
    }
  };

  const addMember = async () => {
    try {
      await API.post(`/groups/${id}/members`, { email: memberEmail });
      setMembers([...members, { email: memberEmail }]);
      setMemberEmail("");
    } catch (err) {
      console.error("Error adding member", err);
    }
  };

  const addExpense = async () => {
    try {
      await API.post(`/groups/${id}/expenses`, {
        description: desc,
        amount: Number(amount),
      });
      setDesc("");
      setAmount("");
      fetchGroup();
    } catch (err) {
      console.error("Error adding expense", err);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, [id]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Group Details</h2>

      {/* Add Member */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Add Member</h3>
        <input
          type="email"
          placeholder="Member email"
          value={memberEmail}
          onChange={(e) => setMemberEmail(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={addMember}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Add Expense */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Add Expense</h3>
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={addExpense}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Expense
        </button>
      </div>

      {/* Expenses */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Expenses</h3>
        <ExpenseList expenses={expenses} />
      </div>

      {/* Balances */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Balances</h3>
        {balances.map((b, idx) => (
          <p key={idx}>
            {b.user}: {b.balance}
          </p>
        ))}
      </div>

      {/* Settlements */}
      <div>
        <h3 className="text-lg font-semibold">Settlements</h3>
        {settlements.map((s, idx) => (
          <p key={idx}>
            {s.from} → {s.to}: ₹{s.amount}
          </p>
        ))}
      </div>
    </div>
  );
}
