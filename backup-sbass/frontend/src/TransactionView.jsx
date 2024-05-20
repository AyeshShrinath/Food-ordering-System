import PropTypes from "prop-types";

function TransactionView(props) {
  return (
    <div className="w-full md:w-64 mb-4">
      <div className="rounded-xl bg-white shadow-md overflow-hidden">
        <h5 className="bg-blue-800 text-white text-center py-2 rounded-t-xl">
          Transaction ID: {props._id}
        </h5>
        <div className="p-4">
          <p className="text-gray-800">User Name: {props.username}</p>
          <p className="text-gray-800">Address: {props.address} </p>
          <p className="text-gray-800">mobile: {props.mobile}</p>
          <p className="text-gray-800">email: {props.email}</p>
          <p className="text-gray-800">totalprice Rs: {props.totalprice}</p>
          <p className="text-gray-800">
            deliveredtohome: {props.deliveredtohome}
          </p>
          <p className="text-gray-800">createdat.{props.createdAt}</p>
        </div>
      </div>
    </div>
  );
}

TransactionView.propTypes = {
  _id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  totalprice: PropTypes.number.isRequired,
  deliveredtohome: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default TransactionView;
