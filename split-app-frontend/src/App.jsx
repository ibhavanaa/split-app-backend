import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Import your pages
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Group from "./pages/Group.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Default route goes to Register */}
        <Route path="/" element={<Navigate to="/register" />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/groups" element={<Group />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;
