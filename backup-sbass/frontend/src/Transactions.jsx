import axios from "axios";
import TransactionView from "./TransactionView";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useEffect, useState } from "react";

function Transactions() {
  const [orders, setOrders] = useState([]);
  const [filterDate, setFilterDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Report handler
  async function RepGen() {
    const doc = new jsPDF();

    // Total non-student Users user.userRole === 'admin' ||
    const totalOrderCount = filteredOrders.reduce((count) => {
      count++;
      return count;
    }, 0);

    // Add header
    const headerTitle = "Exported Transactions List";
    const headerTitleX = doc.internal.pageSize.width / 2;
    doc.setFontSize(12);
    doc.text(headerTitle, headerTitleX, 10, { align: "center" });

    // Table header
    doc.autoTable({
      head: [
        [
          "User Name",
          "Address",
          "Mobile",
          "Email",
          "Total Price",
          "Delivery To Home",
          "Date Ordered",
        ],
      ],
      body: filteredOrders.map((order) => [
        order.username,
        order.address,
        order.mobile,
        order.email,
        order.totalprice,
        order.deliveredtohome ? "Yes" : "No",
        new Date(order.createdAt).toISOString().split("T")[0],
      ]),
    });

    let currentY = doc.autoTable.previous.finalY + 10;

    // Total Students
    doc.text(`Total Orders Count: ${totalOrderCount}`, 14, currentY + 10);

    // Save the PDF
    doc.save("Admin-TransactionsReport.pdf");
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    axios
      .get("http://localhost:3000/Order")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredOrders = orders.filter((order) => {
    return filterDate === new Date(order.createdAt).toISOString().split("T")[0];
  });

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
      <div className="max-w-4xl w-full mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl text-gray-800 font-bold mb-8">
              Daily Transactions
            </h1>
            <div className="flex justify-between mb-4">
              <button
                className="bg-blue-600 rounded-xl text-white p-2 px-4 hover:bg-violet-700"
                onClick={RepGen}
              >
                Generate A Report
              </button>
              <h2 className="text-xl font-semibold">
                {filteredOrders.length === 0 ? "No" : filteredOrders.length}{" "}
                Transactions in {filterDate}
              </h2>
              <label className="bg-blue-800 text-white p-2 rounded-md flex items-center">
                <span className="mr-2">Filtered Date:</span>
                <input
                  className="text-gray-800 bg-gray-200 p-2 rounded-md ml-2"
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrders.map((order, index) => (
                <TransactionView
                  key={index}
                  _id={index + 1}
                  username={order.username}
                  address={order.address}
                  mobile={order.mobile}
                  email={order.email}
                  totalprice={order.totalprice}
                  deliveredtohome={order.deliveredtohome ? "Yes" : "No"}
                  createdAt={formatDate(order.createdAt)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
