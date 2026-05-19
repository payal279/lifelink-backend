import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend route in app.js:
      // app.use("/auth", authRoutes);
      // So correct endpoint is:
      // http://localhost:3000/auth/login

      const res = await fetch(
  `${API_URL}/auth/login`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  }
);

      const data = await res.json();

      if (data.token) {
        // Save JWT token
        localStorage.setItem("token", data.token);

        // Save user info
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: data.user?.name || "User",
            email: form.email
          })
        );

        alert("Login Successful ✅");
        navigate("/dashboard");
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card login-animate">
        <h1>Welcome Back</h1>
        <p>Login to continue your mission.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="switch-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;