import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Check if the user is a shrimp market user
    if (user.username === "user" && user.password === "password") {
      localStorage.setItem("userType", "user");
      console.log("User login successful", user);
      navigate("/UserMarket");
      window.location.reload();
    }
    // Check if the user is an admin
    else if (user.username === "admin" && user.password === "admin") {
      localStorage.setItem("userType", "admin");
      console.log("Admin login successful", user);
      navigate("/Orders");
      window.location.reload();
    }
    // Invalid user type
    else {
      console.log("Invalid user type");
      // You may want to handle invalid login attempts here
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={user.username}
          placeholder="Username"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  userType: PropTypes.oneOf(["user", "admin", "none"]).isRequired,
};

export default Login;
