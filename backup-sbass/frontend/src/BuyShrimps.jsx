import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function BuyShrimps() {
  const [shrimpType, setShrimpType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  function checkShoppingCart() {
    var shoppingCart = [];
    if (!localStorage.getItem("shoppingCart")) {
      localStorage.setItem("shoppingCart", JSON.stringify([]));
    } else {
      shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
    }
    shoppingCart.push({
      shrimptype: shrimpType.shrimptype,
      quantity: quantity,
      price: totalPrice,
    });
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }

  function handleBuyShrimps() {
    const confirmationMessage = `You are going to buy ${quantity} KG of ${shrimpType.shrimptype} shrimp for Rs. ${totalPrice}`;
    const result = window.confirm(confirmationMessage);
    if (result) {
      checkShoppingCart();
      navigate("/shoppingcart");
    }
  }

  useEffect(() => {
    async function fetchShrimpData(_id) {
      try {
        const response = await axios.get(`http://localhost:3000/Stype/${_id}`);
        setShrimpType(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchShrimpData(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading shrimp data: {error.message}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div className="mr-10">
          <h1 className="text-4xl font-bold mb-4">
            Buy <span className="text-blue-500">Shrimps</span>
          </h1>
          <div className="ml-11 text-blue-500">
            <img
              src="../public/assests/shopping-cart.png" // Replace with the actual path to your image
              alt="Shopping Cart"
              className="w-24 h-24"
            />
          </div>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg">
          {shrimpType && (
            <div className="mb-4">
              <p className="text-2xl mb-2">
                Shrimp Type: {shrimpType.shrimptype}
              </p>
              <p className="text-2xl mb-2">
                Price Per 1KG: {shrimpType.price_per_kg}
              </p>
            </div>
          )}
          <div className="flex flex-col items-center">
            <label className="text-xl">Quantity:</label>
            <input
              className="bg-transparent border-b-2 border-black w-20 text-center text-xl mb-4"
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setTotalPrice(e.target.value * shrimpType.price_per_kg);
              }}
            />
            <label className="text-xl">Total Price:</label>
            <input
              className="bg-transparent border-b-2 border-black w-20 text-center text-xl mb-4"
              type="number"
              value={totalPrice}
              readOnly
            />
            <button
              onClick={handleBuyShrimps}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyShrimps;
