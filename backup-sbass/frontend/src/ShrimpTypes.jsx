import { useEffect, useState } from "react";
import ShrimpTypeView from "./ShrimpTypeView";
import AddShrimpType from "./AddShrimpType";
import axios from "axios";

function ShrimpTypes() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
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
        console.error(error);
      });
  }

  function handleAddShrimpType(newShrimpType) {
    axios
      .post("http://localhost:3000/SType", newShrimpType)
      .then((response) => {
        console.log(response);
        fetchShrimpTypes();
        setIsAddDialogOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Shrimp Type Management
        </h1>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl">
          <div className="p-6">
            <div className="flex justify-end">
              <button
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Add Shrimp Type
              </button>
            </div>
            <div className="mt-6">
              <table className="w-full table-auto">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="py-2 px-4">Shrimp Type</th>
                    <th className="py-2 px-4">Price per kg</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shrimpTypes.map((shrimpType) => (
                    <ShrimpTypeView
                      key={shrimpType._id}
                      _id={shrimpType._id}
                      shrimptype={shrimpType.shrimptype}
                      price_per_kg={shrimpType.price_per_kg}
                      fetchData={fetchShrimpTypes}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <AddShrimpType
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAdd={handleAddShrimpType}
        />
      </div>
    </div>
  );
}

export default ShrimpTypes;
