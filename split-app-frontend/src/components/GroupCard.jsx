import React from "react";
import { Link } from "react-router-dom";

export default function GroupCard({ group }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{group.name}</h3>
      <p className="text-sm text-gray-600">ID: {group._id}</p>
      <Link
        to={`/groups/${group._id}`} // ✅ no more undefined
        className="mt-2 inline-block text-blue-600 hover:underline"
      >
        View Details →
      </Link>
    </div>
  );
}
