import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ShoppingCart() {
  const navigate = useNavigate();
  const [shoppingCart, setShoppingCart] = useState([]);

  function fetchShoppingCart() {
    if (!localStorage.getItem("shoppingCart")) {
      localStorage.setItem("shoppingCart", JSON.stringify([]));
    } else {
      setShoppingCart(JSON.parse(localStorage.getItem("shoppingCart")));
    }
    return shoppingCart;
  }

  useEffect(() => {
    fetchShoppingCart();
  }, [shoppingCart]);

  function removeItemFromCart(itemId) {
    const updatedCart = shoppingCart.filter((item) => item.id !== itemId);
    localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
    setShoppingCart(updatedCart);
  }

  function clearCart() {
    localStorage.removeItem("shoppingCart");
    setShoppingCart([]);
  }

  function calculateTotalPrice() {
    const storedCart = localStorage.getItem("shoppingCart");
    const cartItems = storedCart ? JSON.parse(storedCart) : [];
    return cartItems.reduce((total, item) => total + item.price, 0);
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {shoppingCart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {shoppingCart.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between py-2"
            >
              <span>
                {item.shrimptype} Shrimp {item.quantity}KG - ${item.price}
              </span>
              <button
                className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md"
                onClick={() => removeItemFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4">Total: ${calculateTotalPrice()}</p>
      <button
        className="mt-4 text-white bg-red-700 hover:bg-red-900 px-4 py-2 rounded-md"
        onClick={() => clearCart()}
      >
        Clear Cart
      </button>
      <button
        className="mt-4 m-2 text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md"
        onClick={() => navigate("/usermarket")}
      >
        Add More Shrimp
      </button>
      <button
        className="mt-4 m-2 text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
        onClick={() => navigate("/orderplaced")}
      >
        Continue
      </button>
    </div>
  );
}

export default ShoppingCart;
