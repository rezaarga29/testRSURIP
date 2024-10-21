import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavbarUser() {
  const [token, setToken] = useState(
    localStorage.getItem("access_token") || ""
  );

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setToken("");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link to="/user" className="text-light navbar-brand">
          RS URIP SUMOHARJO
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/add-karyawan" className="text-light nav-link">
                Add Karyawan
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/homepage" className="text-light nav-link">
                List Karyawan
              </Link>
            </li>
          </ul>
          <Link
            to="/"
            onClick={handleLogout}
            className="text-light btn btn-outline-warning"
            type="submit"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
