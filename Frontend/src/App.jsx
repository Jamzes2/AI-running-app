import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    axios.get("http://localhost:3000/health")
      .then(res => setStatus(res.data.message))
      .catch(() => setStatus("Backend not connected"));
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">🏃 AI Running Insights</h1>
          <p className="status">Backend: <span className={status === "Backend not connected" ? "error" : "success"}>{status}</span></p>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h2>Unlock Your Running Potential</h2>
            <p>Connect your Strava account to get AI-powered insights about your running performance</p>
            <button className="btn-strava">Connect to Strava</button>
          </div>
        </section>

        {/* Recent Runs Section */}
        <section className="recent-runs-section">
          <h3>Recent Runs</h3>
          <div className="runs-grid">
            <div className="run-card placeholder">
              <div className="run-placeholder">
                <p>No runs yet</p>
                <small>Connect your Strava account to see your recent runs</small>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
