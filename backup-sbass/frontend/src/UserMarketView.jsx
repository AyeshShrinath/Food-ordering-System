import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function UserMarketView(props) {
  const navigate = useNavigate();

  function handleBuy(_id) {
    navigate(`/buy/${_id}`);
  }

  return (
    <div className="justify-center align-centre w-full md:w-1/3 lg:w-1/4 p-4">
      <div className=" bg-white shadow-md rounded-lg overflow-hidden">
        <img
          className="m-10 w-60% h-48 object-cover"
          src={props.imageUrl}
          alt={props.type}
        />
        <div className="p-4">
          <h5 className="text-xl font-semibold mb-2">{props.type}</h5>
          <p className="text-gray-700 mb-4">
            Price Per 1KG: Rs.{props.price_per_kg}
          </p>
          <button
            onClick={() => handleBuy(props._id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}

UserMarketView.propTypes = {
  _id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price_per_kg: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default UserMarketView;
