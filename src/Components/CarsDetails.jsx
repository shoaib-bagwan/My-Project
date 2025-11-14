import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "./ApiContext";

function CarsDetails({ paramName, endPoint }) {
  const { apiUrl, addToCart } = useApi();
  const [car, setCar] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [mainImg, setMainImg] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const paramValue = params[paramName];

  const fetchCar = async () => {
    try {
      const res = await axios.get(`${apiUrl}${endPoint}/${paramValue}`);
      setCar(res.data);
      setMainImg(res.data.carImage?.[0]?.main || "");
      fetchAllCarsExceptSelected(res.data._id);
    } catch (err) {}
  };

  const fetchAllCarsExceptSelected = async (selectedCarId) => {
    try {
      const res = await axios.get(`${apiUrl}/api/cars/all-cars`);
      const filteredCars = res.data.filter((c) => c._id !== selectedCarId);
      setSuggestions(filteredCars.slice(0, 10));
    } catch (err) {}
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCar();
  }, [paramValue]);

  if (!car) {
    return <p className="text-center mt-5 text-light">Loading...</p>;
  }

  return (
    <div className="container my-4 text-light">
      <div className="row g-4">
        <div className="col-lg-6 col-md-6 col-12 text-center">
          <div
            className="bg-dark rounded shadow-lg d-flex align-items-center justify-content-center"
            style={{ height: "350px", overflow: "hidden" }}
          >
            <img
              src={mainImg}
              alt={car.carName}
              className="img-fluid"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
            {["img1", "img2", "img3", "img4"].map((key, index) => {
              const img = car.carImage?.[0]?.[key];
              return img ? (
                <img
                  key={index}
                  src={img}
                  alt=""
                  onMouseEnter={() => setMainImg(img)}
                  onMouseLeave={() => setMainImg(car.carImage?.[0]?.main)}
                  className="img-thumbnail"
                  style={{
                    width: "90px",
                    height: "70px",
                    objectFit: "cover",
                    cursor: "pointer",
                    borderRadius: "8px",
                    border: mainImg === img ? "2px solid #ffc107" : "1px solid #666",
                  }}
                />
              ) : null;
            })}
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-12">
          <h3 className="fw-bold">
            {car.carCompany} <span className="text-warning">{car.carName}</span>
          </h3>
          <h4 className="text-success mb-3">
            ₹ {Number(car.price).toLocaleString("en-IN")}
          </h4>

          <ul className="list-unstyled fs-6">
            <li><strong>Brand:</strong> {car.carCompany}</li>
            <li><strong>Model Year:</strong> {car.carModel}</li>
            <li><strong>Engine (CC):</strong> {car.engine}</li>
            <li><strong>Fuel Type:</strong> {car.fuel}</li>
            <li><strong>Transmission:</strong> {car.transmission}</li>
            <li><strong>Gear Box:</strong> {car.gearBox}</li>
            <li><strong>Sitting Capacity:</strong> {car.sittingCapacity} Seater</li>
            <li><strong>Mileage:</strong> {car.mileage || "N/A"}</li>
            <li><strong>Car Type:</strong> {car.carType}</li>
            <li>
              <strong>Available Colors:</strong>{" "}
              {car.color?.map((clr, i) => (
                <span
                  key={i}
                  className="badge mx-1"
                  style={{
                    backgroundColor: clr,
                    border: "1px solid #fff",
                    color: clr === "white" ? "black" : "white",
                  }}
                >
                  {clr}
                </span>
              ))}
            </li>
          </ul>

          <div className="d-flex flex-wrap gap-3 mt-4">
            <button
              className="btn btn-warning fw-bold px-4"
              onClick={() => addToCart({ ...car, quantity: 1 })}
            >
              Book / Add to Cart
            </button>

            <button className="btn btn-outline-light px-4" onClick={() => navigate(-1)}>
              ← Go Back
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="fw-bold mb-3">You May Also Like</h4>
        <div className="row g-3">
          {suggestions.map((suggestion) => (
            <div key={suggestion._id} className="col-lg-3 col-md-4 col-6">
              <div
                className="card bg-dark text-light shadow-sm border-0 h-100"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/new-id/${suggestion._id}`)}
              >
                <img
                  src={suggestion.carImage?.[0]?.main}
                  className="card-img-top"
                  alt={suggestion.carName}
                  style={{ height: "150px", objectFit: "contain" }}
                />
                <div className="card-body p-2">
                  <h6 className="card-title text-warning mb-1">{suggestion.carName}</h6>
                  <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
                    {suggestion.carCompany}
                  </p>
                  <p className="text-success fw-bold" style={{ fontSize: "14px" }}>
                    ₹ {Number(suggestion.price).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarsDetails;
