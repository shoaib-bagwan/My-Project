import axios from "axios";
import { useEffect, useState } from "react";
import { useApi } from "./ApiContext";

function DeleteCar() {
    const {apiUrl} = useApi();
    const [data, setData] = useState([]);

    const fetchPost = () => {
        axios.get(`${apiUrl}/api/cars/all-cars`).then((res) => {
            setData(res.data);
        });
    };

    useEffect(() => {
        fetchPost();
    }, []);

    const deleteHandler = async (id) => {
        setData(data.filter((e) => e._id !== id));
        await axios.delete(`${apiUrl}/api/cars/delete/${id}`);
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
                                        onClick={() => deleteHandler(e._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
}

export default DeleteCar;
