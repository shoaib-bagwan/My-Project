import { motion } from "framer-motion";
import c1 from '../assets/car1.jpg';
import c2 from '../assets/car2.jpg';
import c3 from '../assets/car3.jpg';

function Carasol() {
  return (
    <motion.div
      id="carouselExampleInterval"
      className="carousel slide mt-2 container-fluid"
      data-bs-ride="carousel"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="carousel-inner">
        {/* Slide 1 */}
        <div className="carousel-item active" data-bs-interval="2000">
          <img
            src={c3}
            className="d-block w-100 img-fluid"
            alt="car1"
            style={{ objectFit: "cover", maxHeight: "70vh" }}
          />
        </div>

        {/* Slide 2 */}
        <div className="carousel-item" data-bs-interval="1000">
          <img
            src={c2}
            className="d-block w-100 img-fluid"
            alt="car2"
            style={{ objectFit: "cover", maxHeight: "70vh" }}
          />
        </div>

        {/* Slide 3 */}
        <div className="carousel-item" data-bs-interval="1000">
          <img
            src={c1}
            className="d-block w-100 img-fluid"
            alt="car3"
            style={{ objectFit: "cover", maxHeight: "70vh" }}
          />
        </div>
      </div>

      {/* Prev / Next Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </motion.div>
  )
}

export default Carasol
