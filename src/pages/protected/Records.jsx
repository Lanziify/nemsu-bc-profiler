import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataList from "../../components/DataList";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SegmentAddress from "../../components/SegmentAddress";
import SearchBar from "../../components/SearchBar";

const Records = () => {
  const [filterRecords, setFilterRecords] = useState([]);
  const [searchRecords, setSearchRecords] = useState([]);
  const navigate = useNavigate();
  const { profiles } = useSelector((state) => state.profiles);

  const handleItemClicked = async (profile) => {
    try {
      Swal.fire({
        confirmButtonText: "Open",
        confirmButtonColor: "#3b82f6",
        showCancelButton: true,
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`profile/${profile.docId}`, { state: profile });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (e) => {
    if (e.target.value === "") {
      setFilterRecords([]);
    } else {
      setFilterRecords(
        profiles.filter((profile) =>
          profile.personalData.homeAddress
            .toLowerCase()
            .trim()
            .includes(e.target.value.toLowerCase().trim()),
        ),
      );
    }
  };

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setSearchRecords([]);
    } else {
      const query = e.target.value.toLowerCase();
      setSearchRecords(
        profiles.filter(
          (profile) =>
            profile.docId.toLowerCase().includes(query) ||
            profile.personalData.name.firstName.toLowerCase().includes(query) ||
            profile.personalData.name.lastName.toLowerCase().includes(query) ||
            profile.personalData.homeAddress.toLowerCase().includes(query) ||
            profile.personalData.presentAddress.toLowerCase().includes(query) ||
            profile.personalData.contact.toLowerCase().includes(query) ||
            profile.personalData.email.toLowerCase().includes(query),
        ),
      );
    }
  };

  return (
    <div>
      <div className="p-4 flex flex-col gap-4">
        <SegmentAddress
          data={profiles}
          filteredData={filterRecords}
          onChangeSelect={handleSelectChange}
        />
        <SearchBar onChange={handleSearch} />
      </div>
      <DataList
        data={
          searchRecords.length > 0
            ? searchRecords
            : filterRecords.length > 0
              ? filterRecords
              : profiles
        }
        onRowClicked={handleItemClicked}
      />
    </div>
  );
};

export default Records;
