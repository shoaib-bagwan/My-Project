import { Link } from "react-router-dom";
import logo1 from "../assets/logo1.png";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">

          {/* Logo & About */}
          <div className="col-md-4 mb-3">
            <Link to="/" className="d-flex align-items-center text-decoration-none text-light mb-2">
              <img src={logo1} alt="Logo" width="50" height="40" className="me-2" />
              <span className="fw-bold fs-5">Auto Dealer</span>
            </Link>
            <p className="small">
             Buy and Sell your car with Auto Dealer on Good Price
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-light text-decoration-none">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none">Contact</Link>
              </li>
              <li>
                <Link to="/about" className="text-light text-decoration-none">About</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <p className="mb-1">
              Email: <a href="mailto:shoaibbagwn727@gmail.com" className="text-light text-decoration-none">shoaibbagwn727@gmail.com</a>
            </p>
            <p className="mb-1">
              Phone: <a href="tel:+918669018078" className="text-light text-decoration-none">8669018078</a>
            </p>
            <p className="mb-1">
              LinkedIn: <a href="https://www.linkedin.com/in/your-linkedin-id" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Click Me</a>
            </p>
          </div>

        </div>

        <hr className="bg-light" />

        {/* Footer Bottom */}
        <div className="text-center small">
          &copy; {new Date().getFullYear()} Auto Dealer. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
