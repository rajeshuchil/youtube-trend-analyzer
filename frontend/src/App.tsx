import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Trends from "./pages/Trends";
import Categories from "./pages/Categories";
import { PageTransition } from "./components/PageTransition";

export default function App() {
  const location = useLocation();

  // Only show navbar on landing page (/)
  const showNavbar = location.pathname === "/";

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <div className={showNavbar ? "main-content" : ""}>
        <Routes>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="/trends" element={<PageTransition><Trends /></PageTransition>} />
          <Route path="/categories" element={<PageTransition><Categories /></PageTransition>} />
        </Routes>
      </div>
    </div>
  );
}
