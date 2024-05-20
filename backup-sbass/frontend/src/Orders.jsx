import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Order");
      console.log(response.data);
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
      <div className="max-w-4xl w-full mx-auto">
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <h1 className="text-2xl font-bold bg-blue-800 text-white py-4 text-center">
            Orders
          </h1>
          <div className="p-6">
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">
                Error loading orders: {error.message}
              </p>
            ) : (
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-blue-800 text-white">
                    <th className="py-3 px-4 text-left">Order ID</th>
                    <th className="py-3 px-4 text-left">UserName</th>
                    <th className="py-3 px-4 text-left">Address</th>
                    <th className="py-3 px-4 text-left">Mobile</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Delivered to Home</th>

                    <th className="py-3 px-4 text-left">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-t border-gray-200">
                      <td className="py-3 px-4">{order._id}</td>
                      <td className="py-3 px-4">{order.username}</td>
                      <td className="py-3 px-4">{order.address}</td>
                      <td className="py-3 px-4">Rs. {order.mobile}</td>
                      <td className="py-3 px-4">{order.email}</td>
                      <td className="py-3 px-4">
                        {order.deliveredtohome ? "Yes" : "No"}
                      </td>
                      <td className="py-3 px-4">
                        {new Date(order.createdAt).toISOString().split("T")[0]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
