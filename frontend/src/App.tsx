import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Trends from "./pages/Trends";
import Categories from "./pages/categories";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/trends" element={<Trends />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
        </Routes>
      </div>
    </div>
  );
}
