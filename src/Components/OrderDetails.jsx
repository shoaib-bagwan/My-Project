import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "./ApiContext";

function OrderDetails() {
    const { id } = useParams();
    const { apiUrl } = useApi();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/orders/order/${id}`);
            setOrder(res.data);
            console.log(res.data)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 text-secondary">
                <div
                    className="spinner-border text-primary me-3"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                    role="status"
                ></div>
                <strong>Loading order details...</strong>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="text-center text-muted mt-5">
                Order not found 😕
            </div>
        );
    }

    // Calculate total amount if not stored
    const totalAmount = order.cars?.reduce(
        (sum, car) => sum + (car.totalPrice || 0),
        0
    );

    // Separate cars by type
    const newCars = order.cars?.filter((car) => car.carType === "New") || [];
    const oldCars = order.cars?.filter((car) => car.carType === "Old") || [];


    return (
        <div className="container py-5">
            <h2 className="text-center mb-4 fw-bold border-bottom pb-2 d-inline-block">
                Invoice / Order #{id}
            </h2>

            {/* Customer Info */}
            <div className="card mb-4 shadow-sm rounded-4">
                <div className="card-body">
                    <h5 className="card-title text-primary mb-3">Customer Info</h5>
                    <p><strong>Name:</strong> {order.customerName}</p>
                    <p><strong>Email:</strong> {order.customerEmail}</p>
                    <p><strong>Address:</strong> {order.customerAddress}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
            </div>

            {/* New Cars Table */}
            {newCars.length > 0 && (
                <div className="card mb-4 shadow-sm rounded-4">
                    <div className="card-body">
                        <h5 className="card-title text-primary mb-3">New Cars Ordered</h5>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Car Name</th>
                                        <th>Company</th>
                                        <th>Model</th>
                                        <th>Type</th>
                                        <th>GearBox</th>
                                        <th>Transmission</th>
                                        <th>Fuel</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newCars.map((car, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{car.carName}</td>
                                            <td>{car.carCompany}</td>
                                            <td>{car.carModel || "-"}</td>
                                            <td>{car.carType}</td>
                                            <td>{car.gearBox}</td>
                                            <td>{car.transmission}</td>
                                            <td>{car.fuel}</td>
                                            <td>{car.quantity || car.carQuantity || 1}</td>
                                            <td>₹ {car.totalPrice || 0}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="9" className="text-end fw-bold">Total Amount (New Cars)</td>
                                        <td className="fw-bold">₹ {newCars.reduce((sum, car) => sum + (car.totalPrice || 0), 0)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Old Cars Table */}
            {oldCars.length > 0 && (
                <div className="card mb-4 shadow-sm rounded-4">
                    <div className="card-body">
                        <h5 className="card-title text-warning mb-3">Old Cars Ordered</h5>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Car Name</th>
                                        <th>Company</th>
                                        <th>Model</th>
                                        <th>Type</th>
                                        <th>GearBox</th>
                                        <th>Transmission</th>
                                        <th>Fuel</th>
                                        <th>Quantity</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {oldCars.map((car, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{car.carName}</td>
                                            <td>{car.carCompany}</td>
                                            <td>{car.carModel}</td>
                                            <td>{car.carType}</td>
                                            <td>{car.gearBox}</td>
                                            <td>{car.transmission}</td>
                                            <td>{car.fuel}</td>
                                            <td>{car.quantity || 1}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderDetails;
