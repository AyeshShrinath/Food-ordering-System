import { Link, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PropTypes from "prop-types";

function NavBarItem({ url, text }) {
  return (
    <li className="m-2 mt-4">
      <Link to={url} className="text-white text-md hover:text-gray-300">
        {text}
      </Link>
    </li>
  );
}

NavBarItem.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

function NavBaradmin() {
  const navigate = useNavigate();
  const navItems = [
    { url: "/", text: "Home" },
    { url: "/transactions", text: "Daily Transactions" },
    { url: "/shrimptypes", text: "Shrimp Types" },
    { url: "/usermarket", text: "Buy Shrimps" },
    { url: "/orders", text: "Orders" },
  ];

  return (
    <nav className="bg-blue-800 p-4">
      <div className="flex">
        <h1 className="pt-2 w-32 font-extrabold text-3xl text-white">SBASS</h1>
        <div className="flex-grow">
          <ul className="flex items-center justify-center">
            {navItems.map((item, index) => (
              <NavBarItem
                className=""
                key={index}
                url={item.url}
                text={item.text}
              />
            ))}
          </ul>
        </div>
        <div className="flex">
          <button
            onClick={() => {
              localStorage.setItem("userType", "none");
              navigate("/");
              window.location.reload();
            }}
            className="bg-blue-500 text-white m-2 p-2 px-4 rounded-md"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBaradmin;
