import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ isDark }) {
  const apiUrl = "http://localhost:8000";
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const get = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/users/login`, data).then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("address", res.data.address);
        localStorage.setItem("mobileNo", res.data.mobileNo);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("role", res.data.role);
        console.log(res);

        if (res.data.role === "user") {
          navigate("/home");
        } else {
          navigate("/admin");
        }
      });
    } catch (e) {
      console.log(e);
      alert("Invalid data please enter valid data");
    }

    setData({
      email: "",
      password: "",
    });
  };
  useEffect(()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("mobileNo");
    localStorage.removeItem("address");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
  },[])

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div
          className={`col-12 col-sm-10 col-md-8 col-lg-6 border border-2 p-4 p-md-5 rounded-4 shadow 
          ${isDark ? "bg-dark text-white" : "bg-light text-dark"}`}
        >
          <form onSubmit={submitHandler}>
            <h1 className="text-center mb-4">Login Page</h1>

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
            Not have an Account?
            <Link to="/new-user" className="text-info ms-2">
              Create new
            </Link>
          </p>
          <Link to="/home"className="btn btn-outline-dark">Skip Login</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
