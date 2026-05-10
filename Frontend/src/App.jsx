import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/dashboard/Dashboard";
import Insights from "./components/Insights";
import Calendar from "./components/Calendar";
import RunDetail from "./pages/RunDetail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/run/:id" element={<RunDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
