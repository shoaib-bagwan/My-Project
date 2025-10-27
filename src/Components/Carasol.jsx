import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { motion } from "framer-motion";
import c1 from "../assets/car1.jpg";
import c2 from "../assets/car2.jpg";
import c3 from "../assets/car3.jpg";

function Carasol() {
  return (
    <motion.div
      className="container-fluid mt-2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="2000"
      >
        <div className="carousel-inner rounded-4 shadow-lg overflow-hidden">
          {/* Slide 1 */}
          <div className="carousel-item active">
            <img
              src={c3}
              className="d-block w-100 img-fluid"
              alt="Car 1"
              style={{ objectFit: "cover", maxHeight: "70vh" }}
            />
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <img
              src={c2}
              className="d-block w-100 img-fluid"
              alt="Car 2"
              style={{ objectFit: "cover", maxHeight: "70vh" }}
            />
          </div>

          {/* Slide 3 */}
          <div className="carousel-item">
            <img
              src={c1}
              className="d-block w-100 img-fluid"
              alt="Car 3"
              style={{ objectFit: "cover", maxHeight: "70vh" }}
            />
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
      </div>
    </motion.div>
  );
}

export default Carasol;
