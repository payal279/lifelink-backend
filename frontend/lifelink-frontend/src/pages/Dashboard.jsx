import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    /* Protected backend route */
    fetch("http://localhost:3000/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.log(err));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <h1>Dashboard</h1>

        <p className="welcome-text">
          Welcome, <strong>{user?.name || "User"}</strong> 👋
        </p>

        <div className="dashboard-grid">
          <div className="dash-box">
            <h3>Your Email</h3>
            <p>{user?.email}</p>
          </div>

          <div className="dash-box">
            <h3>Status</h3>
            <p>Logged In Successfully</p>
          </div>

          <div className="dash-box">
            <h3>Protected Data</h3>
            <p>{profile?.message || "Loading..."}</p>
          </div>
        </div>

        <button className="primary logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
