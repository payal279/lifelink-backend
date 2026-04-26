import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">LifeLink</h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        {!user ? (
          <>
            <li><Link to="/register">Register</Link></li>
            <li className="login-btn"><Link to="/login">Login</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li className="welcome-user">Hi, {user.name}</li>
            <li className="login-btn" onClick={logout}>Logout</li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;