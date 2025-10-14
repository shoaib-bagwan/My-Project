import { Link } from "react-router-dom";
import logo1 from "../assets/logo1.png";

function Admin() {
  const adminActions = [
    { title: "Update New Car", url: "/admin/update-new-car" },
    { title: "Update Old Car", url: "/admin/update-old-car" },
    { title: "Add New Car", url: "/admin/add-new-car" },
    { title: "Add Old Car", url: "/admin/add-old-car" },
    { title: "Delete Old Car", url: "/admin/delete-old-car" },
    { title: "Delete New Car", url: "/admin/delete-new-car" },
    { title: "Add Car Accessory", url: "/admin/add-accessory" },
    { title: "All Orders", url: "/admin/orders" },
  ];

  return (
    <div>
      {/* Navbar */}
      <div className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={logo1}
              width="70"
              height="50"
              className="d-inline-block align-top"
              alt="Logo"
            />{" "}
            Auto Dealer Admin
          </a>
        </div>
      </div>

      {/* Cards */}
      <div className="container">
        <div className="row justify-content-center g-4">
          {adminActions.map((action, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-3">
              <Link to={action.url} className="text-decoration-none">
                <div className="card text-center shadow-sm h-100 hover-scale p-3 border-warning border-3">
                  <div className="card-body">
                    <h5 className="card-title">{action.title}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Hover effect */}
      <style jsx="true">{`
        .hover-scale:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default Admin;
