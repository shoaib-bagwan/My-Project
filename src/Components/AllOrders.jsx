import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "./ApiContext";

function AllOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { apiUrl } = useApi();
    const navigate=useNavigate();

    const fetchData = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/orders/admin/orders`);
            setOrders(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const cancelOrder = async (id) => {
        const cancelled = window.confirm("Do you really want to cancel the order ");
        if (!cancelled) {
            return
        } else {
            try {
                const res = await axios.put(`${apiUrl}/api/orders/update-order/${id}`, { status: "Cancelled by Admin" });
                if (res.status == 200) {
                    alert("Order Cancelled By admin Successfully")
                    fetchData();
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
    const viewDetails = async (id) => {
        navigate(`/order/${id}`)
    }

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
                <strong>Loading orders...</strong>
            </div>
        );
    }

    return (
        <div className="container py-5 min-vh-100">
            <h2 className="text-center mb-5 fw-bold border-bottom pb-2 d-inline-block">
                All Orders
            </h2>

            {orders.length === 0 ? (
                <div className="text-center text-muted fs-5 mt-5">
                    No orders found 😕
                </div>
            ) : (
                <div className="row g-4">
                    {orders.map((order, index) => (
                        <div className="col-md-6 col-lg-4" key={index}>
                            <div className="card shadow-sm border-0 rounded-4 h-100">
                                <div className="card-body d-flex flex-column justify-content-between h-100">

                                    {/* Header */}
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="card-title text-primary fw-bold mb-0">
                                            Order #{index + 1}
                                        </h5>
                                        <span
                                            className={`badge ${order.status === "Completed"
                                                ? "bg-success"
                                                : order.status === "Cancelled" || order.status === "Cancelled by Admin" || order.status === "Cancelled by User"
                                                    ? "bg-danger"
                                                    : "bg-warning text-dark"
                                                }`}
                                        >
                                            {order.status || "Processing"}
                                        </span>
                                    </div>

                                    {/* Customer Info */}
                                    <div className="mb-3">
                                        <h6 className="fw-semibold text-secondary">Customer Info</h6>
                                        <ul className="list-unstyled mb-0">
                                            <li>
                                                <strong>Name:</strong> {order.customerName}
                                            </li>
                                            <li>
                                                <strong>Email:</strong> {order.customerEmail}
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Cars Info */}
                                    {order.cars && order.cars.length > 0 && (
                                        <div className="mb-3">
                                            <h6 className="fw-semibold text-secondary">Car(s)</h6>
                                            {order.cars.map((car, idx) => (
                                                <div
                                                    key={idx}
                                                    className="border rounded-3 p-3 mb-2"
                                                    style={{ backgroundColor: "#f8f9fa" }}
                                                >
                                                    <p className="mb-1">
                                                        <strong>Car:</strong> {car.carCompany}{" "}{car.carName}
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>Model:</strong>{" "}
                                                        {car.carModel ? car.carModel : "N/A"}
                                                    </p>
                                                    <p className="mb-0">
                                                        <strong>Type:</strong>{" "}
                                                        <span className="text-success fw-bold">{car.carType}</span>
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Footer */}
                                    <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                                        <small className="fw-bold text-secondary mb-2">
                                            Date:{" "}
                                            {order.createdAt || "N/A"}
                                        </small>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-danger btn-sm" onClick={() => cancelOrder(order._id)}>
                                            Cancel Order
                                        </button>
                                        <button className="btn btn-primary btn-sm" onClick={() => viewDetails(order._id)}>
                                            View Details
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AllOrders;
