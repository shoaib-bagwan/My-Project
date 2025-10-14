import axios from "axios";
import { useEffect, useState } from "react";
import { useApi } from "./ApiContext";

function DeleteOldCar() {
    const { apiUrl } = useApi();
    const [oldCar, setOldCar] = useState([]);
    const deleteOld = async (id) => {
        try {
            const conformDelete=window.confirm("Are You Sure you want to delete the car!");
            if(!conformDelete){
                return;
            }
            const res = await axios.delete(`${apiUrl}/api/oldcars/delete/${id}`);
            console.log(res.data);
            fetchData();
            alert(res.data.carCompany + " " + res.data.carName + " Deleted Successfully");
        } catch (e) {
            console.log(e)
        }
    }

    const fetchData = async () => {
        try{
            const res = await axios.get(`${apiUrl}/api/oldcars/all-old-cars`);
            console.log(res.data)
            setOldCar(res.data);
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="container-fluid mt-5">
            <h1 className="text-center mb-4">All Old Cars</h1>
            <div className="row g-4">
                {oldCar.map((e) => (
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
                                    <strong>Sitting:</strong> {e.sittingCapacity} <br />
                                    <strong>Gear Box:</strong> {e.gearBox} <br />
                                    <strong>Owner:</strong> {e.ownerNumber} <br />
                                    <strong>Fuel:</strong> {e.fuel} <br />
                                    <strong>Transmission:</strong> {e.transmission} <br />
                                    <strong>Price:</strong> {e.price}
                                </p>
                                <div className="d-flex justify-content-center">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteOld(e._id)}
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
    )
}

export default DeleteOldCar