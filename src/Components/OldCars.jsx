import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from './ApiContext';

function OldCars() {
  const { apiUrl, addToCart } = useApi();
  const [searchInp, setSearchInp] = useState('');
  const navigate = useNavigate();


  const [result, setResult] = useState([]);

  const getCarData = async () => {
    try {
      const oldCars = await axios.get(`${apiUrl}/api/oldcars/all-old-cars`);
      console.log("fetch data successfully");
      setResult(oldCars.data);
    } catch (e) {
      console.log(e);
      alert("Network Error");
    }
  };

  const searchHandler = () => {
    if (result.some(e => e.carName.toLowerCase() === searchInp.toLowerCase())) {
      navigate(`/oldcar-name/${searchInp}`);
    } else if (result.some(e => e.carCompany.toLowerCase() === searchInp.toLowerCase())) {
      navigate(`/company/${searchInp}`);
    } else if (result.some(e => e.fuel.toLowerCase() === searchInp.toLowerCase())); {
      navigate(`/fuel/${searchInp}`)
    }

  }

  useEffect(() => {
    getCarData();
  }, []);



  return (

    <div className="container mt-5">
      <div className="d-flex justify-content-center gap-5">
        <input type="text" name="" id="search" onChange={(e) => setSearchInp(e.target.value)} className='rounded-4 p-2 border border-secondary border-3' placeholder='Search Old Cars By Name and Company' style={{ minWidth: "30vw" }} />
        <div className="btn btn-success" onClick={() => searchHandler()}>Search</div>
      </div>
      <h3 className="text-white fst-italic mb-4 mt-4">
        Get <span className='text-warning'> second-hand cars </span> directly from owners
      </h3>

      <div className="row g-4">
        {result.map((car, index) => (
          <div className="col-md-4 col-lg-3" key={index}>
            <div
              className="card shadow-lg border-0 rounded-4 overflow-hidden h-100 position-relative car-card"
              style={{ transition: "transform 0.3s", cursor: "pointer" }}
            >
              {/* Price Badge */}
              <span
                className="badge bg-success position-absolute"
                style={{ top: "10px", right: "10px", fontSize: "1rem" }}
              >
                ₹ {car.price}
              </span>

              {/* Car Image */}
              <img
                src={car.carImage?.[0]?.main}
                className="card-img-top"
                alt={car.carName}
                style={{ height: "200px", objectFit: "cover" }}
              />

              {/* Card Body */}
              <div className="card-body text-center">
                <h5 className="card-title fw-bold mb-2">
                  {car.carCompany} <span className='text-warning'>{car.carName}</span>
                </h5>
                <p className="mb-1 text-muted">
                  <strong>Model:</strong> {car.carModel}
                </p>
                <p className="mb-1 text-muted">
                  <strong>Fuel:</strong> {car.fuel}
                </p>
              </div>

              {/* Card Footer with Buttons */}
              <div className="card-footer bg-light d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-primary w-50 me-1"
                  onClick={() => addToCart(car)}
                >
                  Add to Cart
                </button>
                <Link to={`/id/${car._id}`} className="btn btn-sm btn-warning w-50 ms-1">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hover Animation */}
      <style>{`
        .car-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2) !important;
        }
      `}</style>
    </div>
  );
}

export default OldCars;
