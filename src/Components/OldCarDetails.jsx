import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "./ApiContext";

function OldCarDetails({ endPoint, paramName }) {
  const { apiUrl, addToCart } = useApi();
  const [car, setCar] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [mainImg, setMainImg] = useState("");
  const params = useParams();
  const paramValue = params[paramName];
  const navigate = useNavigate();

  // Fetch selected car or array
  const fetchCar = async () => {
    try {
      const res = await axios.get(`${apiUrl}${endPoint}/${paramValue}`);
      console.log("Fetched Car Data:", res.data);

      if (Array.isArray(res.data)) {
        // Case 1: Response is an array
        setCar(res.data);
      } else {
        // Case 2: Single object
        const carData = res.data;
        if (!carData) {
          navigate(`/NotFound`);
          return;
        }
        setCar(carData);
        setMainImg(carData?.carImage?.[0]?.main || carData?.carImage?.main);
        if (carData?._id) fetchAllCarsExceptSelected(carData._id);
      }
    } catch (err) {
      console.error("Error fetching car:", err);
    }
  };

  // Fetch all old cars except selected
  const fetchAllCarsExceptSelected = async (selectedCarId) => {
    try {
      const res = await axios.get(`${apiUrl}/api/oldcars/all-old-cars`);
      const filtered = res.data.filter((item) => item._id !== selectedCarId);
      setSuggestions(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (paramValue) fetchCar();
    window.scrollTo(0, 0);
  }, [paramValue]);

  if (!car) return <p className="text-center mt-5 text-light">Loading...</p>;

  // ✅ If car is an ARRAY, show grid layout
  if (Array.isArray(car)) {
    return (
      <div
        className="container-fluid my-5 text-light"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <h2 className="text-warning text-center mb-4">Available Cars</h2>
        <div className="row g-4">
          {car.map((c) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={c._id}>
              <div
                className="card bg-dark text-light border-0 shadow-lg h-100"
                style={{
                  borderRadius: "15px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onClick={() => navigate(`/id/${c._id}`)}
              >
                <img
                  src={c.carImage?.[0]?.main}
                  className="card-img-top rounded-top-4"
                  alt={c.carName}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    backgroundColor: "#111",
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold">
                    {c.carCompany} {c.carName}
                  </h5>
                  <p className="text-warning fw-semibold mb-1">
                    ₹ {Number(c.price).toLocaleString("en-IN")}
                  </p>
                  <button className="btn btn-outline-warning w-100 rounded-pill mt-2">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ✅ Else, render single car detail (existing design)
  return (
    <div
      className="container-fluid my-5 text-light"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Main Car Section */}
      <div className="text-center mb-5 selected-car animate-fade-in">
        <div className="row justify-content-center align-items-start g-4">
          {/* Left: Main Image */}
          <div className="col-lg-8 col-md-7">
            <div
              className="position-relative overflow-hidden rounded-4 border shadow-lg bg-secondary"
              style={{ width: "100%", backgroundColor: "#111" }}
            >
              <img
                src={mainImg}
                alt={car.carName}
                className="img-fluid w-100 rounded-4"
                style={{
                  height: "450px",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
              />
              <div className="position-absolute top-0 end-0 m-3 badge bg-warning fs-6">
                ₹ {Number(car.price).toLocaleString("en-IN")}
              </div>
            </div>

            {/* Small Images */}
            <div className="d-flex justify-content-center flex-wrap gap-3 mt-4">
              {["i1", "i2", "i3", "i4"].map((key, index) => {
                const img = car.carImage?.[0]?.[key];
                return (
                  img && (
                    <img
                      key={index}
                      src={img}
                      alt={`thumb-${index}`}
                      onMouseEnter={() => setMainImg(img)}
                      className="rounded-3 shadow-sm"
                      style={{
                        width: "150px",
                        height: "100px",
                        objectFit: "cover",
                        cursor: "pointer",
                        border:
                          mainImg === img
                            ? "3px solid #ffc107"
                            : "1px solid #555",
                      }}
                    />
                  )
                );
              })}
            </div>
          </div>

          {/* Right: Car Info */}
          <div className="col-lg-4 col-md-5 text-start">
            <h2 className="fw-bold mt-2">
              {car.carCompany} {car.carName}
            </h2>
            <h4 className="text-success fw-bold">Model: {car.carModel}</h4>

            <ul className="list-group list-group-flush mt-3 rounded">
              <li className="list-group-item bg-dark text-white border-0 d-flex justify-content-between">
                <span>Color</span>
                <span>{car.color}</span>
              </li>
              <li className="list-group-item bg-dark text-white border-0 d-flex justify-content-between">
                <span>Fuel</span>
                <span>{car.fuel}</span>
              </li>
              <li className="list-group-item bg-dark text-white border-0 d-flex justify-content-between">
                <span>Gear Box</span>
                <span>{car.gearBox}</span>
              </li>
              <li className="list-group-item bg-dark text-white border-0 d-flex justify-content-between">
                <span>Transmission</span>
                <span>{car.transmission}</span>
              </li>
              <li className="list-group-item bg-dark text-white border-0 d-flex justify-content-between">
                <span>Sitting Capacity</span>
                <span>{car.sittingCapacity} Seater</span>
              </li>
              <li className="list-group-item bg-dark text-white border-0 d-flex justify-content-between">
                <span>Owner</span>
                <span>{car.ownerNumber}</span>
              </li>
            </ul>

            <button
              className="btn btn-outline-warning btn-lg mt-4 px-5 shadow-sm rounded-pill"
              onClick={() => addToCart({ ...car, quantity: 1 })}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Cars */}
      {suggestions.length > 0 && (
        <>
          <h2 className="mb-4 text-center text-warning">
            Other Cars You May Like
          </h2>
          <div className="row g-4">
            {suggestions.map((c) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={c._id}>
                <div
                  className="card h-100 shadow-lg bg-dark text-light border-0"
                  style={{
                    borderRadius: "15px",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                  }}
                  onClick={() => navigate(`/id/${c._id}`)}
                >
                  <img
                    src={c.carImage?.[0]?.main}
                    className="card-img-top rounded-top-4"
                    alt={c.carName}
                    style={{
                      height: "230px",
                      objectFit: "cover",
                      backgroundColor: "#111",
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">
                      {c.carCompany} {c.carName}
                    </h5>
                    <p className="text-warning fw-bold">
                      ₹ {Number(c.price).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default OldCarDetails;
