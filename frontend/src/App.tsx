import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Trends from "./pages/Trends";
import Categories from "./pages/Categories";
import { PageTransition } from "./components/PageTransition";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/trends" element={<PageTransition><Trends /></PageTransition>} />
          <Route path="/categories" element={<PageTransition><Categories /></PageTransition>} />
        </Routes>
      </div>
    </div>
  );
}
