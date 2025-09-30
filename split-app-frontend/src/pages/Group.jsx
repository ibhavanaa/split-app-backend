import React, { useEffect, useState } from "react";
import API from "../api/axios";
import GroupCard from "../components/GroupCard";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");

  const fetchGroups = async () => {
    try {
      const res = await API.get("/groups");
      setGroups(res.data.data); // ✅ use data.data
    } catch (err) {
      console.error("Error fetching groups", err);
    }
  };

  const createGroup = async () => {
    if (!groupName.trim()) return;
    try {
      const res = await API.post("/groups", { name: groupName });
      setGroups([...groups, res.data.data]); // ✅ use data.data
      setGroupName("");
    } catch (err) {
      console.error("Error creating group", err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Groups</h2>

      {/* Create New Group */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={createGroup}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Group
        </button>
      </div>

      {/* Groups List */}
      <div className="grid gap-4">
        {groups.length > 0 ? (
          groups.map((g) => <GroupCard key={g._id} group={g} />)
        ) : (
          <p className="text-gray-500">No groups yet. Create one above!</p>
        )}
      </div>
    </div>
  );
}
