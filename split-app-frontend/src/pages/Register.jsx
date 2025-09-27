import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [debug, setDebug] = useState(""); // 🔎 for showing raw errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("➡️ Sending register request:", form);
      const res = await API.post("/auth/register", form);
      console.log("✅ Register success:", res.data);

      setMsg("Registered successfully! Redirecting to login...");
      setDebug("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("❌ Register error:", err);
      console.error("❌ Backend error response:", err.response?.data);

      setMsg(err.response?.data?.message || "Error registering");
      setDebug(JSON.stringify(err.response?.data || err.message, null, 2)); // 🔎 show raw error
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>{msg}</p>

      {/* 🔎 Debug output */}
      {debug && (
        <pre style={{ background: "#f4f4f4", padding: "10px", marginTop: "10px" }}>
          {debug}
        </pre>
      )}
    </div>
  );
}
