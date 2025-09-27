import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { token, login } = useContext(AuthContext);

  // 🔐 Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/groups");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await API.post("/auth/login", form);
      login(res.data.user, res.data.token); // ✅ sets context + localStorage + redirects
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Login failed. Check your credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      {msg && <p style={{ color: "red" }}>{msg}</p>}

      <p>
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
