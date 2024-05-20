import { Link } from "react-router-dom";
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

function NavBarlogin() {
  const navItems = [
    { url: "/", text: "Home" },
    { url: "/about", text: "About" },
    { url: "/services", text: "Services" },
    { url: "/contact", text: "Contact" },
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
        <div className="flex"></div>
      </div>
    </nav>
  );
}

export default NavBarlogin;
