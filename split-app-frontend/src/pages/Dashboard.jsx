import React from "react";
import GroupCard from "../components/GroupCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // ✅ Temporary hardcoded groups for UI testing
  const groups = [
    { _id: "1", name: "Goa Trip" },
    { _id: "2", name: "Flat Rent" },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Groups</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((group) => (
          <GroupCard key={group._id} group={group} />
        ))}
      </div>

      <Link
        to="/add-group"
        className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Create New Group
      </Link>
    </div>
  );
}
