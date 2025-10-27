import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useApi } from './ApiContext';
function Home() {
  const navigate = useNavigate();
  const go = (id) => navigate(`/new-id/${id}`);
  const { apiUrl, addToCart } = useApi();

  const [result, setResult] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);


  const getCarData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/cars/all-cars`);
      setAllCars(res.data);
      setResult(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      alert("Network Error");
    }
  };


  const handler = (e) => {
    const value = e.target.value.toLowerCase();

    if (value === "") {
      setSuggestions([]);
    } else {
      const related = allCars.filter(
        (car) =>
          car.carName.toLowerCase().includes(value) ||
          car.carCompany.toLowerCase().includes(value)
      );
      setSuggestions(related.slice(0, 5));
    }
  };
  

  useEffect(() => {
    getCarData();
    
  }, []);

  return (
    <div className="container my-5 text-light">
      <div className="container my-5">
        <div className="row g-5">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <form
              className="d-flex flex-column justify-content-center align-items-center border border-warning bg-dark text-light p-4 rounded-4 shadow-lg position-relative"
              style={{ minHeight: "300px" }}
            >
              {/* 🔥 Slogan */}
              <h2 className="text-warning fw-bold text-center mb-2">
                "Find Your Dream Ride Today!"
              </h2>
              <p className="text-secondary text-center mb-4">
                Explore the best cars — luxury, comfort, and performance in one place.
              </p>

              {/* 🔍 Search Input */}
              <h4 className="text-center mb-3">Search Cars</h4>
              <input
                type="text"
                name="company"
                placeholder="Enter car name or company"
                id="company"
                onChange={handler}
                className="form-control text-center mb-3 rounded-pill"
                autoComplete="off"
                style={{
                  width: "80%",
                  padding: "10px",
                  fontSize: "1rem",
                }}
              />

              {/* ℹ️ Info Text */}
              <p className="text-danger fw-semibold mb-2">
                Contact or subscribe to get updates about new cars!
              </p>

              {/* 💡 Suggestion List */}
              {suggestions.length > 0 && (
                <ul
                  className="list-group w-75 position-absolute"
                  style={{
                    top: "80%",
                    zIndex: "10",
                    backgroundColor: "white",
                    color: "black",
                    maxHeight: "200px",
                    overflowY: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  {suggestions.map((car, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => navigate(`/new-id/${car._id}`)}
                      style={{
                        cursor: "pointer",
                        transition: "0.2s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f8f9fa")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "white")
                      }
                    >
                      <strong>{car.carCompany}</strong> — {car.carName}
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </div>
          {/* <div >
          <div className="col-lg-6 col-md-8 col-sm-10 border">
            <img src={ads} alt="" className='img-fluid' style={{objectFit:"cover"}} />
          </div>
          </div> */}
        </div>
      </div>

      <h2 className="mb-4 fst-italic text-center carousel-container">
        Buy Cars from <span className="text-warning fw-bold">Auto Dealer</span> and get Car Accessories for Free
      </h2>



      {loading && (
        <div className="d-flex justify-content-center m-5">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}


      <div className="row g-4">
        {result.length > 0 ? (
          result.map((car, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
              <div className="card car-card shadow-dark hover-lift h-100 rounded-4 bg-dark text-light">
                <img
                  src={car.carImage?.[0]?.main}
                  alt={car.carName}
                  className="card-img-top rounded-top-4 animate-zoom"
                  style={{ objectFit: "contain", height: "250px" }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold text-warning">{car.carName}</h5>
                  <p className="text-muted mb-1">{car.carCompany}</p>
                  <h6 className="text-success fw-bold">
                    ₹ {Number(car.price).toLocaleString("en-IN")}
                  </h6>

                  <div className="mt-2">
                    <p className="mb-1"><strong>Fuel:</strong> {car.fuel}</p>
                    <p className="mb-1"><strong>Transmission:</strong> {car.transmission}</p>
                    <p className="mb-1"><strong>Year:</strong> {car.carModel}</p>
                  </div>
                </div>

                <div className="card-footer bg-dark border-0 d-flex gap-2">
                  <button className="btn btn-primary flex-fill" onClick={() => go(car._id)}>
                    View Details
                  </button>
                  <button
                    className="btn btn-warning flex-fill"
                    onClick={() => addToCart({ ...car, price: Number(car.price), quantity: 1 })}
                  >
                    Book Car
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <h5 className="text-center text-warning mt-5">No matching cars found.</h5>
          )
        )}
      </div>
    </div>
  );
}

export default Home;
