import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddGroup() {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([""]);
  const navigate = useNavigate();

  const handleAddMemberField = () => {
    setMembers([...members, ""]);
  };

  const handleMemberChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim()) return alert("Group name is required!");

    // ✅ Temporary mock object – replace with API later
    const newGroup = {
      _id: Date.now().toString(),
      name: groupName,
      members: members.filter((m) => m.trim() !== ""),
    };

    console.log("New Group Created (frontend only):", newGroup);

    // Redirect back to dashboard
    navigate("/");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a New Group</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded shadow-sm">
        {/* Group Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Group Name</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="e.g., Goa Trip, Flat Rent"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Members */}
        <div>
          <label className="block text-sm font-medium mb-2">Add Members</label>
          {members.map((member, index) => (
            <input
              key={index}
              type="email"
              value={member}
              onChange={(e) => handleMemberChange(index, e.target.value)}
              placeholder={`Member ${index + 1} email`}
              className="border p-2 w-full rounded mb-2"
            />
          ))}
          <button
            type="button"
            onClick={handleAddMemberField}
            className="text-blue-600 text-sm hover:underline"
          >
            + Add another member
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Create Group
        </button>
      </form>
    </div>
  );
}
