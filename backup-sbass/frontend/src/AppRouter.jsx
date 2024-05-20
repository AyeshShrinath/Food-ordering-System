import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transactions from "./Transactions.jsx";
import ShrimpTypes from "./ShrimpTypes.jsx";
import UserMarket from "./UserMarket.jsx";
import Contact from "./Contact.jsx";
import NavBaradmin from "./NavBaradmin.jsx";
import NavBaruser from "./NavBaruser.jsx";
import BuyShrimps from "./BuyShrimps.jsx";
import Orders from "./Orders.jsx";
import Login from "./Login.jsx";
import NavBarlogin from "./NavBarlogin.jsx";
import ShoppingCart from "./ShoppingCart.jsx";
import OrderPlaced from "./OrderPlaced.jsx";
const adminRoutes = [
  { path: "/", element: <Orders /> },
  { path: "/Transactions", element: <Transactions /> },
  { path: "/ShrimpTypes", element: <ShrimpTypes /> },
  { path: "/buy/:id", element: <BuyShrimps /> },
  { path: "/UserMarket", element: <UserMarket /> },
  { path: "/Orders", element: <Orders /> },
  { path: "/NotFound", element: <h1>404 Not Found</h1> },
];

const userRoutes = [
  { path: "/", element: <UserMarket /> },
  { path: "/About", element: <h1>About</h1> },
  { path: "/Services", element: <h1>Services</h1> },
  { path: "/Contact", element: <Contact /> },
  { path: "/buy/:id", element: <BuyShrimps /> },
  { path: "/UserMarket", element: <UserMarket /> },
  { path: "/shoppingcart", element: <ShoppingCart /> },
  { path: "/orderplaced", element: <OrderPlaced /> },
];

const defaultRoutes = [
  { path: "/", element: <Login userType="none" /> },
  { path: "/NotFound", element: <h1>404 Not Found</h1> },
];

const getUserType = () => {
  return localStorage.getItem("userType");
};

function AppRouter() {
  const userType = getUserType();
  console.log(userType);
  const routes =
    userType === "admin"
      ? adminRoutes
      : userType === "user"
      ? userRoutes
      : defaultRoutes;
  const NavBar =
    userType === "admin"
      ? NavBaradmin
      : userType === "user"
      ? NavBaruser
      : NavBarlogin;

  return (
    <BrowserRouter>
      {NavBar && <NavBar />}
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
