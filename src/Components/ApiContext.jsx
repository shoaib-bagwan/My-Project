import { createContext, useContext, useState } from "react";
const ApiContext = createContext();
export const ApiProvider = ({ children }) => {
  const apiUrl = "https://server-a40p.onrender.com";
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState();
  const [quant, setQuant] = useState(1);
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState();

  const addToCart = (car) => {
    const alreadyExists = cart.some((item) => item._id === car._id);

    if (alreadyExists) {
      alert("Car already exists in the cart!");
    } else {
      setCart([...cart, car]);
      alert("car Added to cart successfully")
      setCount(count + 1);
    }
  };
  const clearCart = () => {
    setCart([]);
    setCount(0);
  };



  return (
    <ApiContext.Provider value={{ apiUrl, setCart, cart, addToCart, count, setCount, quant, setQuant, order, setOrder, formData, setFormData,clearCart }}>
      {children}
    </ApiContext.Provider>
  );
};
export const useApi = () => {
  return useContext(ApiContext);
};

