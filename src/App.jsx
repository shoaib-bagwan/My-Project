import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import AddCarsForm from './Components/AddCarsForm';
import Admin from './Components/Admin';
import AllOrders from "./Components/AllOrders";
import { ApiProvider } from "./Components/ApiContext";
import AppNavbar from "./Components/AppNavbar";
import Carasol from './Components/Carasol';
import CarsDetails from './Components/CarsDetails';
import Cart from "./Components/Cart";
import Contact from './Components/Contact';
import DeleteCar from "./Components/DeleteCar";
import DeleteOldCar from "./Components/DeleteOldCar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Login from './Components/Login';
import Logos from "./Components/Logos";
import NewCars from "./Components/NewCars";
import NotFound from "./Components/NotFound";
import OldCarDetails from "./Components/OldCarDetails";
import OldCars from "./Components/OldCars";
import OrderDetails from "./Components/OrderDetails";
import Register from './Components/Register';
import UpdateCars from "./Components/UpdateCars";
import UpdateOldCar from "./Components/UpdateOldCar";
import UserHistory from "./Components/UserHistory";

function Layout() {

  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/login" || location.pathname === '/new-user' || location.pathname==='/admin';
  return (
    <>
      {!hideNavbarFooter && <AppNavbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/home' element={
          <>
            <Carasol />
            <Home />
            <Logos />
          </>
        } />

        {/* old-car routs */}
        <Route path="/id/:id" element={<OldCarDetails paramName="id" endPoint={`/api/oldcars/id`} />} />
        <Route path="/name/:carName" element={<OldCarDetails paramName="carName" endPoint={`/api/oldcars/name`} />} />
        <Route path="/company/:carCompany" element={<OldCarDetails paramName="carCompany" endPoint={`/api/oldcars/company`} />} />
        <Route path="/fuel/:fuel" element={<OldCarDetails paramName="fuel" endPoint={`/api/oldcars/fuel`} />} />

        {/* new cars routs */}
        <Route path="/new-id/:id" element={<CarsDetails paramName="id" endPoint={`/api/cars/new-id`}/>}/>
        <Route path="/new-name/:carName" element={<CarsDetails paramName="id" endPoint={`/api/cars/new-name`}/>}/>
        <Route path="/new-Company/:carCompany" element={<CarsDetails paramName="id" endPoint={`/api/cars/new-company`}/>}/>

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/update-old-car" element={<UpdateOldCar />} />
        <Route path="/admin/orders" element={<AllOrders />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/cars/:id" element={<CarsDetails paramName="id" endPoint={`/api/cars/cars`} />} /> */}
        
        {/* <Route path="/name/:carName" element={<CarName />} />
        <Route path="/company/:carCompany" element={<CompanyName />} /> */}
        <Route path="/admin/add-new-car" element={<AddCarsForm />} />
        <Route path="/admin/delete-new-car" element={<DeleteCar />} />
        <Route path="/admin/delete-old-car" element={<DeleteOldCar />} />
        <Route path="/admin/update-new-car" element={<UpdateCars />} />
        <Route path="/new-cars" element={<NewCars />} />
        <Route path="/old-cars" element={<OldCars />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-user" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/history" element={<UserHistory />} />
        

        <Route path="*" element={<NotFound />} />
        
      </Routes>
      {!hideNavbarFooter && <Footer/>}

    </>
  )
}

function App() {
  const appStyles = {
    backgroundColor: "#000000",
    color: "#ffffff",
    minHeight: "100vh",
    transition: "all 0.3s ease"
  };
  return (
    <div style={appStyles}>
      <ApiProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ApiProvider>
    </div>
  );
}

export default App;
