import UserMarketView from "./UserMarketView";
import { useState, useEffect } from "react";
import s1 from "../public/assests/S1.png";
import axios from "axios";

function UserMarket() {
  const [shrimpTypes, setShrimpTypes] = useState([]);

  useEffect(() => {
    fetchShrimpTypes();
  }, []);

  function fetchShrimpTypes() {
    axios
      .get("http://localhost:3000/SType")
      .then((response) => {
        setShrimpTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="relative flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl text-black font-bold">
              <span className="text-8xl">Buy</span> <br />
              <span className="text-blue-500 text-6xl">Shrimps</span>
            </h1>
            <p className="text-gray-600">
              Where Each Shrimp Tells a Tale of Ocean Freshness and Gourmet
              Expertise
            </p>
          </div>
          <div className="relative mt-20">
            <div className="absolute top-16 right-20 transform translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-blue-400 rounded-full"></div>
            <img
              className="w-97 h-97 object-cover relative z-10"
              src="../public/assests/SrimpDish.png"
              alt="Shrimps"
            />
          </div>
        </div>
        <h2 className="ml-10 text-4xl font-bold text-black mb-4">Categories</h2>
        <div className="flex flex-wrap">
          {shrimpTypes.map((shrimpType, index) => (
            <UserMarketView
              key={index}
              _id={shrimpType._id}
              type={shrimpType.shrimptype}
              price_per_kg={shrimpType.price_per_kg}
              imageUrl={s1} // Assuming the API provides an imageUrl
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserMarket;
