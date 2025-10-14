import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useApi } from './ApiContext';
// import './HomeDark.css'; // CSS for dark mode, animations, hover effects

function Home() {
  const navigate = useNavigate();
  const go = (id) => navigate(`/new-id/${id}`);
  const { apiUrl, addToCart } = useApi();
  const [result, setResult] = useState([]);

  const getCarData = async () => {
    try {
      const cars = await axios.get(`${apiUrl}/api/cars/all-cars`);
      setResult(cars.data);
    } catch (e) {
      console.log(e);
      alert("Network Error");
    }
  };

  useEffect(() => { getCarData(); }, []);

  return (
    <div className="container my-5 text-light">
      <h2 className="mb-4 fst-italic text-center carousel-container">
        Buy Cars from <span className='text-warning fw-bold'>Auto Dealer</span> and get Car Accessories for Free
      </h2>

      <div className="row g-4">
        {result.map((car, index) => (
          <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
            <div className="card car-card shadow-dark hover-lift h-100 rounded-4 bg-dark text-light">
              {/* Car Image */}
              <img
                src={car.carImage?.[0]?.main}
                alt={car.carName}
                className="card-img-top rounded-top-4 animate-zoom"
                style={{ objectFit: "cover", height: "250px" }}
              />

              {/* Car Details */}
              <div className="card-body">
                <h5 className="card-title fw-bold text-warning">{car.carName}</h5>
                <p className="text-muted mb-1">{car.carCompany}</p>
                <h6 className="text-success fw-bold">₹ {Number(car.price).toLocaleString("en-IN")}</h6>

                <div className="mt-2">
                  <p className="mb-1"><strong>Fuel:</strong> {car.fuel}</p>
                  <p className="mb-1"><strong>Transmission:</strong> {car.transmission}</p>
                  <p className="mb-1"><strong>Year:</strong> {car.carModel}</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="card-footer bg-dark border-0 d-flex gap-2">
                <button 
                  className="btn btn-primary flex-fill hover-lift"
                  onClick={() => go(car._id)}
                >
                  View Details
                </button>
                <button 
                  className="btn btn-warning flex-fill hover-lift" 
                  onClick={() => addToCart({ ...car, price: Number(car.price), quantity: 1 })}
                >
                  Book Car
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
