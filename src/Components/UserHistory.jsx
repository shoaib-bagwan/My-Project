import axios from "axios";
import { useEffect, useState } from "react";
import { useApi } from "./ApiContext";

function UserHistory() {
    const { apiUrl } = useApi();
    const customerEmail = localStorage.getItem("email");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/orders/history/${customerEmail}`);
            setOrders(res.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    const cancelOrder = async (id) => {
        try {

            const res = await axios.put(`${apiUrl}/api/orders/update-order/${id}`, { status: "Cancelled by User" });
            if (res.status == 200) {
                fetchData();
                console.log(res.data)
                alert("order Cancelled Successfully");
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4 fw-bold border-bottom pb-2 text-warning d-inline-block">
                My Order History
            </h2>

            {loading ? (
                <p className="text-center text-secondary fs-5">Loading your orders...</p>
            ) : orders.length === 0 ? (
                <div className="text-center text-secondary bg-light p-5 rounded shadow-sm">
                    You haven’t placed any orders yet.
                </div>
            ) : (
                <div className="row g-4">
                    {orders.map((order, index) => (
                        <div className="col-md-6 col-lg-4" key={index}>
                            <div className="card shadow-sm border-0 rounded-4 h-100 order-card">
                                <div className="card-body p-4">
                                    {/* Order Header */}
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="fw-semibold text-dark mb-0">
                                            #{order.orderId || index + 1}
                                        </h5>

                                        <span
                                            className={`badge px-3 py-2 ${order.status === "Completed"
                                                ? "bg-success-subtle text-success border border-success"
                                                : order.status === "Cancelled by User" || order.status === "Cancelled by Admin"
                                                    ? "bg-warning-subtle text-danger border border-warning"
                                                    : "bg-primary-subtle text-primary border border-primary"
                                                }`}
                                        >
                                            {order.status || "Processing"}
                                        </span>
                                    </div>

                                    {/* Cars in the order */}
                                    <div className="mb-3">
                                        <h6 className="fw-semibold text-dark mb-2">OrderId : {order._id}</h6>
                                        <div className="list-group small">
                                            {order.cars && order.cars.length > 0 ? (
                                                order.cars.map((car, carIndex) => (
                                                    <div
                                                        key={carIndex}
                                                        className="list-group-item border rounded-3 mb-2 shadow-sm"
                                                    >
                                                        <p className="mb-1">
                                                            <strong>Car Type :</strong> <span className="text-success fw-bold">{car.carType || "N/A"}</span>
                                                        </p>
                                                        <p className="mb-1">
                                                            <strong>Car:</strong> {car.carName || "N/A"}
                                                        </p>
                                                        <p className="mb-1">
                                                            <strong>Company:</strong> {car.carCompany || "N/A"}
                                                        </p>
                                                        <p className="mb-0">
                                                            <strong>Amount:</strong> ₹{car.totalAmount || 0}
                                                        </p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-muted">No car details found.</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Order Info */}
                                    <ul className="list-unstyled mb-3 small text-secondary">
                                        <li>
                                            <strong>Date:</strong>{" "}
                                            {order.createdAt}
                                        </li>
                                        <li>
                                            <strong>Total Amount:</strong> ₹{order.totalAmount || 0}
                                        </li>
                                    </ul>


                                    <hr />
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>{order.customerName}</span>
                                        <span>{order.customerEmail}</span>
                                    </div>
                                    <span className="btn text-center btn-outline-danger" onClick={() => cancelOrder(order._id)}>Cancel Order</span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}

            {/* Inline Bootstrap Styling */}
            <style>{`
        .order-card {
          transition: all 0.3s ease-in-out;
        }
        .order-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }
        .bg-success-subtle { background-color: #d1e7dd !important; }
        .bg-warning-subtle { background-color: #fff3cd !important; }
        .bg-primary-subtle { background-color: #cfe2ff !important; }
        .list-group-item {
          background-color: #f8f9fa;
          transition: 0.2s;
        }
        .list-group-item:hover {
          background-color: #f1f1f1;
        }
      `}</style>
        </div>
    );
}

export default UserHistory;
