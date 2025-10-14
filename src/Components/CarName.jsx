import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "./ApiContext";

function CarName() {
  const { name } = useParams();
  const { apiUrl, addToCart } = useApi();
  const [car, setCar] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/cars/all-cars`);
      const foundCar = res.data.find(
        (c) => c.carName?.toLowerCase() === name.toLowerCase()
      );
      setCar(foundCar);
    } catch (e) {
      console.log(e);
      alert("Network error");
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0,0)
  }, [name]);

  if (!car) {
    return (
      <div className="text-center mt-5">
        <h3>Loading car details...</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center g-4">
        {/* Car Image */}
        <div className="col-12 col-md-6">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <img
              src={car.carImage?.[0]?.main}
              alt={car.carName}
              className="card-img-top"
              style={{ objectFit: "contain", height: "300px", width: "100%" }}
            />
          </div>
        </div>

        {/* Car Details */}
        <div className="col-12 col-md-6">
          <div className="card shadow-lg border-0 rounded-4 p-4 h-100">
            <h2 className="fw-bold text-primary mb-1">{car.carName}</h2>
            <h5 className="text-muted mb-3">{car.carCompany}</h5>
            <h3 className="text-success fw-bold mb-4">
              ₹ {Number(car.price).toLocaleString("en-IN")}
            </h3>

            <div className="mb-4">
              <p><strong>Fuel Type:</strong> {car.fuel}</p>
              <p><strong>Transmission:</strong> {car.transmission}</p>
              <p><strong>Model:</strong> {car.carModel}</p>
              <p><strong>Gear Box:</strong> {car.gearBox}</p>
              <p><strong>Engine:</strong> {car.engine}</p>
              <p><strong>Sitting Capacity:</strong> {car.sittingCapacity}</p>
              <p><strong>Available Colors:</strong></p>
              <div className="d-flex flex-wrap gap-2 mt-1">
                {car.color?.map((col, ind) => (
                  <div key={ind} className="d-flex align-items-center gap-2">
                    <span
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: col.toLowerCase(),
                        border: '1px solid #000'
                      }}
                    ></span>
                    <span className="text-muted">{col}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
              
              <button
                className="btn btn-warning w-100 hover-lift"
                onClick={() => addToCart({ ...car, price: Number(car.price), quantity: 1 })}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarName;
