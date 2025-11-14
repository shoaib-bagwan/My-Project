import axios from "axios";
import { useEffect, useState } from "react";
import { useApi } from "./ApiContext";

function UpdateCars() {
  // const apiUrl = "http://localhost:8000";
  const { apiUrl } = useApi();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const fetchPost = () => {
    axios.get(`${apiUrl}/api/cars/all-cars`).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const openUpdateModal = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value;
    setSelectedCar({ ...selectedCar, [name]: value });
  };

  const updateCar = async () => {
    try {
      await axios.put(
        `${apiUrl}/api/cars/update/${selectedCar._id}`,
        selectedCar
      );
      fetchPost();
      console.log(selectedCar);
      alert("Car Updated Successfully")
      setShowModal(false);
    } catch (e) {
      alert("Sorry can't update car")
    }
  };

  return (
    <div className="container-fluid mt-5">
      <h1 className="text-center mb-4">All Available Cars</h1>
      <div className="row g-4">
        {data.map((e) => (
          <div className="col-md-3" key={e._id}>
            <div className="card car-card rounded-4 shadow-sm h-100">
              <img
                src={e.carImage?.[0]?.main}
                alt={e.carName}
                className="card-img-top"
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div className="card-body">
                <p className="card-text">
                  <strong>Car Name:</strong> {e.carName} <br />
                  <strong>Company:</strong> {e.carCompany} <br />
                  <strong>Model:</strong> {e.carModel} <br />
                  <strong>Sitting Capacity:</strong> {e.sittingCapacity} <br />
                  <strong>Gear Box:</strong> {e.gearBox} <br />
                  <strong>Engine:</strong> {e.engine} <br />
                  <strong>Transmission:</strong> {e.transmission} <br />
                  <strong>Fuel:</strong> {e.fuel} <br />
                  <strong>Price:</strong> {e.price}
                </p>
                <div className="d-flex justify-content-center ">
                  <button
                    className="btn btn-danger"
                    onClick={() => openUpdateModal(e)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedCar && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Car</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <form className="row g-3">
                  {/* Car Company */}
                  <div className="col-md-6">
                    <label className="form-label">Car Company</label>
                    <input
                      type="text"
                      className="form-control"
                      name="carCompany"
                      value={selectedCar.carCompany}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Car Name */}
                  <div className="col-md-6">
                    <label className="form-label">Car Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="carName"
                      value={selectedCar.carName}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Car Model */}
                  <div className="col-md-6">
                    <label className="form-label">Car Model (Year)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="carModel"
                      value={selectedCar.carModel}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Sitting Capacity */}
                  <div className="col-md-6">
                    <label className="form-label">Sitting Capacity</label>
                    <input
                      type="number"
                      className="form-control"
                      name="sittingCapacity"
                      value={selectedCar.sittingCapacity}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Gear Box */}
                  <div className="col-md-6">
                    <label className="form-label">Gear Box</label>
                    <input
                      type="text"
                      className="form-control"
                      name="gearBox"
                      value={selectedCar.gearBox}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Engine */}
                  <div className="col-md-6">
                    <label className="form-label">Engine</label>
                    <input
                      type="text"
                      className="form-control"
                      name="engine"
                      value={selectedCar.engine}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Transmission */}
                  <div className="col-md-6">
                    <label className="form-label">Transmission</label>
                    <select
                      className="form-select"
                      name="transmission"
                      value={selectedCar.transmission}
                      onChange={handleInputChange}
                    >
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                  </div>

                  {/* Fuel */}
                  <div className="col-md-6">
                    <label className="form-label">Fuel Type</label>
                    <select
                      className="form-select"
                      name="fuel"
                      value={selectedCar.fuel}
                      onChange={handleInputChange}
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  {/* Mileage */}
                  <div className="col-md-6">
                    <label className="form-label">Mileage</label>
                    <input
                      type="text"
                      className="form-control"
                      name="mileage"
                      value={selectedCar.mileage || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Quantity */}
                  <div className="col-md-6">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      name="quantity"
                      value={selectedCar.quantity || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Color (comma-separated) */}
                  <div className="col-12">
                    <label className="form-label">Colors (comma separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="color"
                      value={selectedCar.color?.join(", ") || ""}
                      onChange={(e) =>
                        setSelectedCar({
                          ...selectedCar,
                          color: e.target.value.split(",").map((c) => c.trim()),
                        })
                      }
                    />
                  </div>

                  {/* Car Image Section */}
                  <div className="col-12 border-top pt-3">
                    <label className="form-label fw-bold">Car Images</label>
                    {selectedCar.carImage?.map((img, index) => (
                      <div key={index} className="row g-2 mb-3">
                        <div className="col-md-6">
                          <label>Main Image</label>
                          <input
                            type="text"
                            className="form-control"
                            value={img.main || ""}
                            onChange={(e) => {
                              const newImages = [...selectedCar.carImage];
                              newImages[index].main = e.target.value;
                              setSelectedCar({ ...selectedCar, carImage: newImages });
                            }}
                          />
                        </div>
                        <div className="col-md-3">
                          <label>Image 1</label>
                          <input
                            type="text"
                            className="form-control"
                            value={img.img1 || ""}
                            onChange={(e) => {
                              const newImages = [...selectedCar.carImage];
                              newImages[index].img1 = e.target.value;
                              setSelectedCar({ ...selectedCar, carImage: newImages });
                            }}
                          />
                        </div>
                        <div className="col-md-3">
                          <label>Image 2</label>
                          <input
                            type="text"
                            className="form-control"
                            value={img.img2 || ""}
                            onChange={(e) => {
                              const newImages = [...selectedCar.carImage];
                              newImages[index].img2 = e.target.value;
                              setSelectedCar({ ...selectedCar, carImage: newImages });
                            }}
                          />
                        </div>
                        <div className="col-md-3">
                          <label>Image 3</label>
                          <input
                            type="text"
                            className="form-control"
                            value={img.img3 || ""}
                            onChange={(e) => {
                              const newImages = [...selectedCar.carImage];
                              newImages[index].img3 = e.target.value;
                              setSelectedCar({ ...selectedCar, carImage: newImages });
                            }}
                          />
                        </div>
                        <div className="col-md-3">
                          <label>Image 4</label>
                          <input
                            type="text"
                            className="form-control"
                            value={img.img4 || ""}
                            onChange={(e) => {
                              const newImages = [...selectedCar.carImage];
                              newImages[index].img4 = e.target.value;
                              setSelectedCar({ ...selectedCar, carImage: newImages });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        const newImages = [
                          ...(selectedCar.carImage || []),
                          { main: "", img1: "", img2: "", img3: "", img4: "" },
                        ];
                        setSelectedCar({ ...selectedCar, carImage: newImages });
                      }}
                    >
                      + Add Image Set
                    </button>
                  </div>

                  {/* Price */}
                  <div className="col-md-6">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={selectedCar.price || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => { setShowModal(false); fetchPost() }}
                >
                  Close
                </button>
                <button className="btn btn-primary" onClick={updateCar}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

export default UpdateCars;
