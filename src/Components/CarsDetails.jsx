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
      setCar(res.data); // ✅ fixed: store as object, not array
      console.log(res.data)
      console.log(res.data.carImage?.[0].main)
      setMainImg(
        res.data.carImage?.[0].main || ""
      );
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
      setSuggestions(filteredCars.slice(0, 4));
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  useEffect(() => {
    window.scrollTo(0,0)
    fetchCar();
    console.log(paramValue)
  }, [paramValue]);

  // ✅ Fallback while data loads
  if (!car) {
    return <p className="text-center mt-5 text-light">Loading...</p>;
  }

  return (
    <div className="container my-5 text-light">
      {/* ====== Car Details Section ====== */}
      <div className="row g-4 align-items-start">
        {/* Left: Image Gallery */}
        <div className="col-md-6 text-center ">
          <img
            src={mainImg}
            alt={car.carName}
            className="img-fluid rounded shadow-lg mb-3 bg-secondary"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
            {["img1","img2","img3","img4"]?.map((key, index) => {
              const img=car.carImage?.[0]?.[key];
            return (
              <img
                key={index}
                src={img}
                alt={`Car ${index + 1}`}
                onClick={() => setMainImg(img)}
                className="img-thumbnail shadow-sm"
                style={{
                  width: "80px",
                  height: "80px",
                  cursor: "pointer",
                  objectFit: "cover",
                  border: mainImg === img ? "2px solid #ffc107" : "1px solid #555",
                }}
              />
            )})}
          </div>
        </div>

        {/* Right: Car Info */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{car.carCompany} <span className='text-warning'>{car.carName}</span></h2>
          <h4 className="text-success mb-3">₹ {car.price}</h4>
          

          <ul className="list-unstyled mt-3">
            <li><strong>Brand:</strong> {car.carCompany}</li>
            <li><strong>Model:</strong> {car.carModel}</li>
            <li><strong>CC:</strong> {car.engine}</li>
            <li><strong>Fuel Type:</strong> {car.fuel}</li>
          </ul>

          <button
            className="btn btn-warning mt-3 px-4"
            onClick={() => addToCart(car)}
          >
            Add to Cart
          </button>
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
              <div key={suggestion._id} className="col-md-3">
                <div
                  className="card bg-dark text-light shadow-sm border-0 h-100"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/new-id/${suggestion._id}`)}
                >
                  <img
                    src={
                      suggestion.carImage?.[0]?.main ||
                      "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    className="card-img-top rounded-top"
                    alt={suggestion.carName}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{suggestion.carName}</h5>
                    <p className="card-text text-warning">₹ {suggestion.price}</p>
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
