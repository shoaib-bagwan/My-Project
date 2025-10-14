import axios from "axios";
import Marquee from "react-fast-marquee";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "./ApiContext";

function Cart() {
  const { cart, setCart, setCount, count, setFormData, apiUrl } = useApi();
  const navigate = useNavigate();

  const updateQuantity = (index, type) => {
    const updatedCart = [...cart];
    const currentQuantity = Number(updatedCart[index].quantity) || 1;

    if (type === "increase") {
      updatedCart[index].quantity = currentQuantity + 1;
    } else if (type === "decrease" && currentQuantity > 1) {
      updatedCart[index].quantity = currentQuantity - 1;
    }
    setCart(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCount(count - 1);
    setCart(updatedCart);
  };

  const mappedCars = cart.map((e) => ({
    carName: e.carName,
    carCompany: e.carCompany,
    carQuantity: e.quantity,
    carModel: e.carModel,
    gearBox: e.gearBox,
    engine: e.engine,
    transmission: e.transmission,
    fuel: e.fuel,
    carType: e.carType,
    totalPrice: Number(e.price) * (Number(e.quantity) || 1),
  }));

  const totalAmount = mappedCars.reduce((sum, car) => sum + car.totalPrice, 0);

  const bookCar = async () => {
    const confirmBooking = window.confirm("Do you want to proceed to book these cars?");
    if (!confirmBooking) return;

    try {
      const newOrder = {
        customerName: localStorage.getItem("username"),
        customerEmail: localStorage.getItem("email"),
        customerAddress: localStorage.getItem("address"),
        totalAmount,
        cars: mappedCars,
      };
      await axios.post(`${apiUrl}/api/orders/addorders`, newOrder);
      alert("✅ Order booked successfully!");
      setFormData(cart);
      setCount(0);
      setCart([]);
      navigate(`/history`);
    } catch (err) {
      console.log(err);
      alert("❌ Booking failed, please try again.");
    }
  };

  const user = localStorage.getItem("username");
  if (!user) {
    return (
      <div className="text-center mt-5">
        <h2 className="text-danger fw-bold">You need to Login First</h2>
        <Link to="/login" className="btn btn-warning mt-3">
          Login
        </Link>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="container text-center mt-5">
        <p className="fs-5">
          🛒 Your cart is empty <Link to="/home">Add cars</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container my-4">
      {/* --- Header --- */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-warning border-bottom pb-2 d-inline-block">Auto Dealer</h2>
        <p className="text-secondary mb-0">Near Angry Garden, Katraj, Pune 411001</p>
        <p className="text-muted">📞 9898989898 | ✉️ autocar@gmail.com</p>
      </div>

      {/* --- Invoice Card --- */}
      <div className="bg-dark text-light rounded-4 shadow-lg p-3 p-md-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 border-bottom border-secondary pb-2">
          <h4 className="fw-bold text-warning mb-2 mb-md-0">Your Cart Items</h4>
          <span className="text-secondary">Date: {new Date().toLocaleDateString()}</span>
        </div>

        {/* --- Cart Items --- */}
        {cart.map((item, index) => {
          const itemTotal = Number(item.price) * Number(item.quantity || 1);
          return (
            <div
              key={index}
              className="border-bottom border-secondary py-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
            >
              <div className="d-flex align-items-center mb-3 mb-md-0">
                <img
                  src={item.carImage?.[0]?.main || item.carImage}
                  alt={item.carName}
                  className="me-3 rounded img-fluid bg-light"
                  style={{ height: "70px", width: "120px", objectFit: "cover" }}
                />
                <div>
                  <h5 className="fw-bold text-warning mb-1">{item.carCompany} {item.carName}</h5>
                  <p className="mb-1 text-muted">Model: {item.carModel}</p>
                  <p className="mb-1 text-muted">GearBox: {item.gearBox}</p>
                </div>
              </div>

              <div className="text-start text-md-end">
                <div className="d-flex justify-content-start justify-content-md-end align-items-center mb-2">
                  <button
                    className="btn btn-sm btn-outline-warning me-2"
                    onClick={() => updateQuantity(index, "decrease")}
                  >
                    -
                  </button>
                  <span className="fw-bold text-light px-2">{item.quantity || 1}</span>
                  <button
                    className="btn btn-sm btn-outline-warning ms-2"
                    onClick={() => updateQuantity(index, "increase")}
                  >
                    +
                  </button>
                </div>
                <p className="mb-1 text-light">Price: ₹ {Number(item.price).toLocaleString("en-IN")}</p>
                <p className="mb-1 text-info fw-bold">Total: ₹ {itemTotal.toLocaleString("en-IN")}</p>
                <button
                  className="btn btn-sm btn-outline-danger mt-2"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}

        {/* --- Grand Total Section --- */}
        <div className="mt-4 border-top border-warning pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <h5 className="fw-bold text-warning mb-2 mb-md-0">Grand Total</h5>
          <h5 className="fw-bold text-success">₹ {totalAmount.toLocaleString("en-IN")}</h5>
        </div>
          <Marquee speed={50} className="w-100 w-md-50 mb-2 mb-md-0">
            <h5 className="fw-bold text-danger text-center">Only Cash On Delivery Available</h5>
          </Marquee>

        {/* --- Buttons --- */}
        <div className="d-flex flex-column flex-md-row justify-content-between mt-4 gap-2">
          <Link className="btn btn-outline-light btn-lg w-100 w-md-auto" to="/home">
            ⬅️ Add More Cars
          </Link>
          <button
            className="btn btn-warning btn-lg text-dark fw-bold shadow w-100 w-md-auto"
            onClick={() => bookCar(cart)}
          >
            Confirm Booking
          </button>
        </div>
      </div>

      {/* --- Footer --- */}
      <p className="text-center text-secondary mt-4 mb-0">
        Thank you for choosing <span className="text-warning">Auto Dealer</span> 🚗
      </p>
    </div>
  );
}

export default Cart;
