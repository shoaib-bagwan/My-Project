import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from './ApiContext';

function CarsDetails({ paramName, endPoint }) {
  const { apiUrl, addToCart } = useApi();
  const [car, setCar] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [mainImg, setMainImg] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const paramValue = params[paramName];

  // ✅ Fetch single car details
  const fetchCar = async () => {
    try {
      const res = await axios.get(`${apiUrl}${endPoint}/${paramValue}`);
      setCar(res.data);
      setMainImg(res.data.carImage?.[0]?.main || "");
      fetchAllCarsExceptSelected(res.data._id);
    } catch (err) {
      console.error("Error fetching car:", err);
    }
  };

  // ✅ Fetch all cars except selected one
  const fetchAllCarsExceptSelected = async (selectedCarId) => {
    try {
      const res = await axios.get(`${apiUrl}/api/cars/all-cars`);
      const filteredCars = res.data.filter((c) => c._id !== selectedCarId);
      setSuggestions(filteredCars.slice(0, 10));
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCar();
  }, [paramValue]);

  if (!car) {
    return <p className="text-center mt-5 text-light">Loading...</p>;
  }

  return (
    <div className="container-fluid my-5 text-light">
      {/* ====== Car Details Section ====== */}
      <div className="row g-4 align-items-start">
        {/* Left: Image Gallery */}
        {/* Left: Image Gallery */}
        <div className="col-md-6 text-center">
          <div
            className="bg-dark rounded shadow-lg mb-3 ms-5 d-flex align-items-center justify-content-center"
            style={{
              height: "420px",
              overflow: "hidden",
            }}
          >
            <img
              src={mainImg}
              alt={car.carName}
              className="img-fluid"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
                transition: "transform 0.3s ease",
              }}
            />
          </div>

          {/* Thumbnail Images */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
            {["img1", "img2", "img3", "img4"].map((key, index) => {
              const img = car.carImage?.[0]?.[key];
              return img ? (
                <img
                  key={index}
                  src={img}
                  alt={`Car ${index + 1}`}
                  onMouseEnter={() => setMainImg(img)}
                  onMouseLeave={() => setMainImg(car.carImage?.[0]?.main)}
                  className="img-thumbnail shadow-sm"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    cursor: "pointer",
                    borderRadius: "10px",
                    border: mainImg === img ? "2px solid #ffc107" : "1px solid #555",
                    transition: "transform 0.2s ease, border 0.2s ease",
                  }}
                />
              ) : null;
            })}
          </div>
        </div>


        {/* Right: Car Info */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">
            {car.carCompany} <span className="text-warning">{car.carName}</span>
          </h2>
          <h4 className="text-success mb-3">₹ {Number(car.price).toLocaleString("en-IN")}</h4>

          {/* Car Overview */}
          <ul className="list-unstyled mt-3 fs-6">
            <li><strong>Brand:</strong> {car.carCompany}</li>
            <li><strong>Model Year:</strong> {car.carModel}</li>
            <li><strong>Engine (CC):</strong> {car.engine}</li>
            <li><strong>Fuel Type:</strong> {car.fuel}</li>
            <li><strong>Transmission:</strong> {car.transmission}</li>
            <li><strong>Gear Box:</strong> {car.gearBox}</li>
            <li><strong>Sitting Capacity:</strong> {car.sittingCapacity} Seater</li>
            <li><strong>Mileage:</strong> {car.mileage ? `${car.mileage} km/l` : "N/A"}</li>
            <li><strong>Car Type:</strong> {car.carType}</li>
            <li>
              <strong>Available Colors:</strong>{" "}
              {car.color?.length > 0
                ? car.color.map((clr, i) => (
                  <span
                    key={i}
                    className="badge bg-secondary mx-1"
                    style={{
                      backgroundColor: clr,
                      border: "1px solid #fff",
                      color: clr === "white" ? "black" : "white",
                    }}
                  >
                    {clr}
                  </span>
                ))
                : "Not specified"}
            </li>
          </ul>

          {/* Buttons */}
          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-warning px-4 fw-bold"
              onClick={() => addToCart({ ...car, quantity: 1 })}
            >
              Book / Add to Cart
            </button>
            <button
              className="btn btn-outline-light px-4"
              onClick={() => navigate(-1)}
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>

      {/* ====== Suggested Cars Section ====== */}
      <div className="mt-5">
        <h3 className="fw-bold mb-4">You May Also Like</h3>
        <div className="row g-4">
          {suggestions.length === 0 ? (
            <p>No suggestions available.</p>
          ) : (
            suggestions.map((suggestion) => (
              <div key={suggestion._id} className="col-lg-3 col-md-4 col-sm-6 col-12">
                <div
                  className="card bg-dark text-light shadow-sm border-0 h-100 hover-lift"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/new-id/${suggestion._id}`)}
                >
                  <img
                    src={
                      suggestion.carImage?.[0]?.main
                    }
                    className="card-img-top rounded-top"
                    alt={suggestion.carName}
                    style={{ height: "180px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-warning">{suggestion.carName}</h5>
                    <p className="card-text text-muted mb-1">{suggestion.carCompany}</p>
                    <p className="text-success fw-bold">₹ {Number(suggestion.price).toLocaleString("en-IN")}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CarsDetails;
