import { useState, useEffect } from "react";
import API from "../api/axios";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");

  const fetchGroups = async () => {
    try {
      // fetch all groups of the user
      const res = await API.get("/groups"); // assume backend has this endpoint
      setGroups(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createGroup = async () => {
    try {
      const res = await API.post("/groups", { name: groupName });
      setGroups([...groups, res.data]);
      setGroupName("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div>
      <h2>Your Groups</h2>
      <input
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Group name"
      />
      <button onClick={createGroup}>Create Group</button>

      <ul>
        {groups.map((g) => (
          <li key={g._id}>{g.name}</li>
        ))}
      </ul>
    </div>
  );
}
