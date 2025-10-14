import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ isDark }) {
  const apiUrl = "http://localhost:8000";
  const [result, setResult] = useState([]);
  const [data, setData] = useState({
    username: "",
    email: "",
    address: "",
    mobileNo: "",
    password: "",
  });

  const get = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${apiUrl}/api/users/register`, data)
        .then((res) => {
          console.log(res);
          alert("Register Successfully");
        })
        .catch((e) => {
          console.log(e);
          alert("Data already exists");
        });
    } catch (err) {
      console.log(err);
    }
    setResult([...result, data]);
    setData({
      username: "",
      email: "",
      address: "",
      mobileNo: "",
      password: "",
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className={`col-12 col-sm-10 col-md-8 col-lg-6 border border-2 p-4 p-md-5 rounded-4 shadow
        ${isDark ? "bg-dark text-white" : "bg-light text-dark"}`}
      >
        <form onSubmit={submitHandler}>
          <h1 className="text-center mb-4">Register</h1>

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            className="form-control mb-3"
            onChange={get}
            value={data.username}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            onChange={get}
            value={data.email}
            required
          />
          <input
            type="tel"
            name="mobileNo"
            placeholder="Enter mobile No"
            className="form-control mb-3"
            onChange={get}
            value={data.mobileNo}
            required
          />
          <textarea
            type="text"
            name="address"
            placeholder="Enter Address"
            cols={12}
            rows={3}
            className="form-control mb-3"
            onChange={get}
            value={data.address}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="form-control mb-3"
            onChange={get}
            value={data.password}
            required
          />

          {/* Mobile-friendly buttons */}
          <div className="d-flex flex-column flex-md-row justify-content-between">
            <input
              type="submit"
              value="Submit"
              className="btn btn-success w-100 mb-2 mb-md-0 me-md-2"
            />
            <input
              type="reset"
              value="Reset"
              className="btn btn-danger w-100 ms-md-2"
            />
          </div>
        </form>

        <p className="text-center mt-3">
          Already have an Account?
          <Link to="/login" className="text-info ms-2">
            Login
          </Link>
        </p>
      </div>

      
    </div>
  );
}

export default Register;
