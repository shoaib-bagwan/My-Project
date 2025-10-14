import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import { useApi } from "./ApiContext";

function AppNavbar() {
  const navigate = useNavigate();
  const { count,apiUrl } = useApi();
  const [txt, setTxt] = useState("");
  const [car, setCar] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const user = localStorage.getItem("username");

  async function handler() {
  if (!txt.trim()) return;

  const foundCar = car.find(
    (c) =>
      c.carCompany?.toLowerCase() === txt.toLowerCase() ||
      c.carName?.toLowerCase() === txt.toLowerCase()
  );

  if (foundCar) {
    setSelectedCar(foundCar);

    if (foundCar.carCompany?.toLowerCase() === txt.toLowerCase()) {
      navigate(`/company/${foundCar.carCompany}`);
    } else if (foundCar.carName?.toLowerCase() === txt.toLowerCase()) {
      navigate(`/name/${foundCar.carName}`);
    }
  } else {
    setSelectedCar(null);
    alert("No car found with that name or company");
  }
}


  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/cars/all-cars`);

      setCar(res.data);
    } catch (e) {
      console.log(e);
      alert("Network problem");
    }
  };

  const Logout = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("email")
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("address")
    localStorage.removeItem("mobileNo")
    navigate(`/`);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Transparent + blur style
  const navbarStyle = {
    backgroundColor: "black",   // solid black background
    transition: "all 0.3s ease",
    zIndex: 1000,
  };



  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top" style={navbarStyle} >

      <div className="container-fluid">
        {/* Logo */}
        <Link to="" className="navbar-brand d-flex align-items-center ms-3 ">
          <img src={logo1} width="70" height="50" alt="Logo" className="me-2" />
          <span className="fw-bold fs-4">Auto Dealer</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links + Search */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ps-5">
            <li className="nav-item mx-2">
              <Link to="/home" className="nav-link text-primary fw-bold">
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/new-cars" className="nav-link text-primary fw-bold">
                New Car's
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/old-cars" className="nav-link text-primary fw-bold">
                Used Car's
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/history" className="nav-link text-primary fw-bold">
                Order History
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/contact" className="nav-link text-primary fw-bold">
                Contact
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/cart" className="nav-link text-primary fw-bold">
                Cart <span className="badge bg-danger ms-1">{count}</span>
              </Link>
            </li>

            {/* Account Dropdown */}
            <li className="nav-item dropdown mx-2">
              <button
                className="nav-link dropdown-toggle btn btn-link text-warning fw-bold"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user ? `Welcome ${user}` : "Profile"}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/login" className="dropdown-item">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/new-user" className="dropdown-item">
                    New User
                  </Link>
                </li>
                <li>
                  <span to="/login" className="dropdown-item" onClick={Logout}>
                    Logout
                  </span>
                </li>
              </ul>
            </li>
          </ul>


          {/* Search */}
          <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              placeholder="Search Car's"
              className="form-control me-2"
              onChange={(e) => setTxt(e.target.value)}
            />
            <button className="btn btn-outline-success" type="button" onClick={handler}>
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
