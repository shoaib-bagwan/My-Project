import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "./ApiContext";

function Logos() {
  const { apiUrl } = useApi();
  const [logos, setLogos] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/logos/logos`);
      setLogos(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="py-5 bg-dark">
      {/* Heading */}
      <div className="text-center mb-5">
        <h2 className="fw-bold display-6">
          Our Partner <span className="text-primary">Brands</span>
        </h2>
        <p className="text">
          Trusted automobile brands we collaborate with
        </p>
      </div>

      {/* Logos Grid */}
      <div className="container">
        <div className="row g-4 justify-content-center">
          {logos.map((e, index) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={index}>
              <Link
                to={`/company/${e.company}`}
                className="text-decoration-none"
              >
                <div className="card h-100 border-0 shadow-sm rounded-4 text-center p-3 car-card transition">
                  <img
                    src={e.imageSrc}
                    alt={e.logoName}
                    className="img-fluid mx-auto d-block"
                    style={{ maxHeight: "70px", objectFit: "contain" }}
                  />
                  <h6 className="mt-3 text-dark fw-semibold brand-name">
                    {e.company}
                  </h6>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Logos;
