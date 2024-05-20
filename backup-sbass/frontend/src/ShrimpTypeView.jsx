import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
import UpdateShrimpType from "./UpdateShrimpType";

function ShrimpTypeView(props) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  function handleUpdateShrimpType(shrimptype, price_per_kg) {
    console.log(shrimptype, price_per_kg);
    const updatedShrimpType = {
      shrimptype: shrimptype,
      price_per_kg: price_per_kg,
    };

    console.log(props._id, updatedShrimpType);
    axios
      .put(`http://localhost:3000/SType/${props._id}`, updatedShrimpType)
      .then((response) => {
        console.log(response.data);
        props.fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDeleteShrimpType(id) {
    axios
      .delete(`http://localhost:3000/SType/${id}`)
      .then((response) => {
        console.log(response.data);
        props.fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <tr className="">
        <td className="border-b  border-slate-300 px-4 pl-16">
          {props.shrimptype} Shrimp
        </td>
        <td className="border-b border-slate-300 px-8 pl-36">
          Rs. {props.price_per_kg}
        </td>
        <td className="border-b border-slate-300 px-4">
          <div className="ml-2 flex flex-row justify-end">
            <i
              className="fas fa-edit text-2xl mx-10 hover:text-gray-300 cursor-pointer"
              onClick={() => {
                setIsUpdateDialogOpen(true);
              }}
            ></i>
            <i
              className="fas fa-trash text-2xl hover:text-gray-300 cursor-pointer"
              onClick={() => handleDeleteShrimpType(props._id)}
            ></i>
          </div>
        </td>
      </tr>
      <UpdateShrimpType
        isOpen={isUpdateDialogOpen}
        _id={props._id}
        oldshrimptype={props.shrimptype}
        oldprice_per_kg={props.price_per_kg}
        fetchData={() => props.fetchData()}
        onClose={() => setIsUpdateDialogOpen(false)}
        onUpdate={handleUpdateShrimpType}
      />
    </>
  );
}

ShrimpTypeView.propTypes = {
  _id: PropTypes.string.isRequired,
  shrimptype: PropTypes.string.isRequired,
  price_per_kg: PropTypes.number.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default ShrimpTypeView;
