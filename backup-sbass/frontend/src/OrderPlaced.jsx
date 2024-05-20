import { useEffect, useState } from "react";
import axios from "axios";

const OrderPlaced = () => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchShoppingCart();
  }, []);

  function clearCart() {
    localStorage.removeItem("shoppingCart");
    setShoppingCart([]);
  }

  function placeOrder() {
    //place order by orders db
    //clear shopping cart
    axios
      .post("http://localhost:3000/order/", {
        username: name,
        address: address,
        mobile: mobile,
        email: email,
        deliveredtohome: deliveryCharges > 0 ? true : false,
        totalprice: calculateTotalPrice(),
      })
      .then((response) => {
        console.log(response);
        clearCart();
      })
      .catch((error) => {
        console.error(error);
      });

    axios.post("");
  }

  function fetchShoppingCart() {
    if (!localStorage.getItem("shoppingCart")) {
      localStorage.setItem("shoppingCart", JSON.stringify([]));
    } else {
      setShoppingCart(JSON.parse(localStorage.getItem("shoppingCart")));
    }
    return shoppingCart;
  }

  function calculateTotalPrice() {
    const storedCart = localStorage.getItem("shoppingCart");
    const cartItems = storedCart ? JSON.parse(storedCart) : [];
    return (
      cartItems.reduce((total, item) => total + item.price, 0) + deliveryCharges
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter your full name"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter your address"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="mobile"
          className="block text-sm font-medium text-gray-700"
        >
          Mobile
        </label>
        <input
          type="text"
          id="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter your mobile number"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter your email address"
        />
      </div>
      <select
        className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:border-blue-500"
        onChange={(e) => {
          if (e.target.value === "home") {
            setDeliveryCharges(1000);
          } else if (e.target.value === "pickup") {
            setDeliveryCharges(0);
          }
        }}
      >
        <option value="home">Deliver to Home</option>
        <option value="pickup">Get Yourself</option>
      </select>
      <h1 className="text-2xl font-bold">
        Total Price: {calculateTotalPrice()}
      </h1>

      <button
        onClick={() => placeOrder()}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderPlaced;
