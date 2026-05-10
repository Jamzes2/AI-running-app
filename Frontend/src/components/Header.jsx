import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="header">
      <div className="logo">AI Running App</div>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/insights">AI Insights</Link>
        <Link to="/calendar">Calendar</Link>
      </div>

      <div className="profile-section">
        <div
          className="profile-icon"
          onClick={() => setOpen(!open)}
        >
          👤
        </div>

        {open && (
          <div className="dropdown">
            <div className="dropdown-item">View Profile</div>
            <div className="dropdown-item">Settings</div>
            <div className="dropdown-item">Sign Out</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
