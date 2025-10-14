import axios from 'axios';
import { useState } from "react";

function AddCarsForm() {
  const apiUrl = 'http://localhost:8000';
  const [data, setData] = useState({
    carName: '',
    carModel: '',
    carCompany: '',
    sittingCapacity: '',
    gearBox: '5-speed Manual',
    engine: '',
    transmission: 'Manual',
    fuel: 'Petrol',
    mileage: '',
    price: '',
    carImage: { main: '', img1: '' },
    color: [],
  });

  const [colorInput, setColorInput] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'main' || name === 'img1') {
      setData({ ...data, carImage: { ...data.carImage, [name]: value } });
    } else if (name === 'color') {
      setColorInput(value);
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const addColor = () => {
    if (colorInput.trim() && !data.color.includes(colorInput.trim())) {
      setData({ ...data, color: [...data.color, colorInput.trim()] });
      setColorInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/cars/add-car`, data);
      alert("Car added successfully!");
      setData({
        carName: '',
        carModel: '',
        carCompany: '',
        sittingCapacity: '',
        gearBox: '5-speed Manual',
        engine: '',
        transmission: 'Manual',
        fuel: 'Petrol',
        mileage: '',
        price: '',
        carImage: { main: '', img1: '' },
        color: [],
      });
      setColorInput('');
    } catch (err) {
      console.error(err);
      alert("Error adding car");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add Car Details</h1>
      <form onSubmit={handleSubmit} className="d-flex flex-column" style={{ gap: "10px" }}>
        <input type="text" name="carName" placeholder="Car Name" className="form-control" value={data.carName} onChange={handleChange} required />
        <input type="number" name="carModel" placeholder="Car Model" className="form-control" value={data.carModel} onChange={handleChange} required />
        <input type="text" name="carCompany" placeholder="Car Company" className="form-control" value={data.carCompany} onChange={handleChange} required />
        <input type="number" name="sittingCapacity" placeholder="Sitting Capacity" className="form-control" value={data.sittingCapacity} onChange={handleChange} required />
        <input type="text" name="gearBox" placeholder="Gear Box" className="form-control" value={data.gearBox} onChange={handleChange} />
        <input type="text" name="engine" placeholder="Engine CC" className="form-control" value={data.engine} onChange={handleChange} required />
        <input type="text" name="transmission" placeholder="Transmission (Automatic/Manual)" className="form-control" value={data.transmission} onChange={handleChange} />
        <input type="text" name="fuel" placeholder="Fuel Type" className="form-control" value={data.fuel} onChange={handleChange} />
        <input type="text" name="mileage" placeholder="Mileage (e.g. 20 km/l)" className="form-control" value={data.mileage} onChange={handleChange} />
        <input type="text" name="price" placeholder="Price (₹)" className="form-control" value={data.price} onChange={handleChange} required />

        {/* Car Images */}
        <input type="text" name="main" placeholder="Main Image URL" className="form-control" value={data.carImage.main} onChange={handleChange} />
        <input type="text" name="img1" placeholder="Secondary Image URL" className="form-control" value={data.carImage.img1} onChange={handleChange} />

        {/* Colors */}
        <div className="d-flex">
          <input type="text" name="color" placeholder="Add a Color" className="form-control" value={colorInput} onChange={handleChange} />
          <button type="button" className="btn btn-primary ms-2" onClick={addColor}>Add Color</button>
        </div>
        <div>
          {data.color.map((c, i) => <span key={i} className="me-2 badge bg-secondary">{c}</span>)}
        </div>

        <button type="submit" className="btn btn-success mt-3">Add Car</button>
      </form>
    </div>
  );
}

export default AddCarsForm;
