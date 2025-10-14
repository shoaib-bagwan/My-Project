import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "./ApiContext";

function CompanyName() {
  const { carCompany } = useParams(); // company name from URL
  const [cars, setCars] = useState([]);
  const { addToCart } = useApi();
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/cars/all-cars`);
      const companyCars = res.data.filter(
        (c) => c.carCompany?.toLowerCase() === carCompany.toLowerCase()
      );
      setCars(companyCars);
    } catch (e) {
      console.log(e);
      alert("Network error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [carCompany]);

  if (cars.length === 0) {
    return (
      <div className="text-center mt-5">
        <h3>No cars found for <span className="text-primary">{name}</span></h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="fw-bold text-center mb-4">
        {carCompany} Cars
      </h2>
      <div className="row g-4">
        {cars.map((car, index) => (
          <div className="col-md-4" key={index}>
            <div className="card shadow-sm border-0 h-100 rounded-4 car-card">
              {/* Car Image */}
              <img
                src={car.carImage?.[0]?.main}
                alt={car.carName}
                className="card-img-top rounded-top-4"
                style={{ objectFit: "cover", height: "250px" }}
              />

              {/* Car Details */}
              <div className="card-body">
                <h5 className="card-title fw-bold text-primary">{car.carName}</h5>
                <p className="text-muted mb-1">{car.carCompany}</p>
                <h6 className="text-success fw-bold">₹ {car.price}</h6>

                <div className="mt-2">
                  <p className="mb-1"><strong>Fuel:</strong> {car.fuel}</p>
                  <p className="mb-1"><strong>Transmission:</strong> {car.transmission}</p>
                  <p className="mb-1"><strong>Year:</strong> {car.carModel}</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="card-footer bg-white border-0 d-flex gap-2">
                <button className="btn btn-primary flex-fill" onClick={() => navigate(`/cars/${car._id}`)}>View Details</button>
                <button className="btn btn-outline-dark flex-fill" onClick={() => addToCart(car)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyName;
