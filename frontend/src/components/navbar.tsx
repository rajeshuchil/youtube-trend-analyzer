import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <span className="brand-name">Trend Analyzer</span>
          <span className="brand-subtitle">YouTube Insights</span>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/trends" className={isActive("/trends")}>
              Trends
            </Link>
          </li>
          <li>
            <Link to="/categories" className={isActive("/categories")}>
              Categories
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
