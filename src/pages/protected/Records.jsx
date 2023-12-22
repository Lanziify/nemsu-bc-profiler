import React, { useState } from "react";
import { useSelector } from "react-redux";
import DataList from "../../components/DataList";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Records = () => {
  const [records, setRecords] = useState([]);
  const { profiles } = useSelector((state) => state.profiles);
  const navigate = useNavigate()

  const handleItemClicked = async (profile) => {
    try {
      Swal.fire({
        // showDenyButton: true,
        confirmButtonText: "Open",
        confirmButtonColor: "#3b82f6",
        showCancelButton: true,
        reverseButtons: true,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate(`profile/${profile.docId}`, { state: profile });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <DataList data={profiles} onRowClicked={handleItemClicked} />
    </div>
  );
};

export default Records;
