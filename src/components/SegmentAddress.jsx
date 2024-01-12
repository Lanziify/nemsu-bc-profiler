import React, { useEffect, useState } from "react";
import { MdOutlineFolder, MdPeopleOutline } from "react-icons/md";

const SegmentAddress = (props) => {
  const [uniqueAddress, setUniqueAddress] = useState([]);
  function formatNumber(number) {
    if (number < 1000) {
      return number.toString();
    } else if (number < 1000000) {
      // Convert to thousands (e.g., 1200 to 1.2k)
      return (number / 1000).toFixed(1) + "k";
    } else {
      // Convert to millions (e.g., 1200000 to 1.2m)
      return (number / 1000000).toFixed(1) + "m";
    }
  }
  useEffect(() => {
    const getAllAddress = () => {
      const addressList = props.data.map(
        (record) => record.personalData.homeAddress,
      );
      setUniqueAddress(new Set(addressList));
    };
    getAllAddress();
  }, [props.data]);

  const addressOptions = Array.from(uniqueAddress).map((address) => (
    <option key={address} value={address} className="text-black">
      {address}
    </option>
  ));

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex items-center justify-between rounded-md bg-blue-500 px-4 py-2 text-white max-sm:col-span-full">
        <MdOutlineFolder size={48} />
        <div>
          <div className="text-right text-xs font-bold">Total Records</div>
          <div className="text-center text-2xl font-bold">
            {formatNumber(props.data.length)}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 rounded-md bg-gray-800 text-white px-4 py-2 max-sm:col-span-full">
        <div className="flex items-center gap-2">
          <MdPeopleOutline size={48} />
          <div className="text-center text-2xl font-bold">
            {props.filteredData.length != 0
              ? formatNumber(props.filteredData.length)
              : ""}
          </div>
        </div>
        <div>
          <div className="text-right text-xs font-bold">Home Address Filter</div>
          <select
            name="select"
            id="select"
            className="cursor-pointer bg-white text-black rounded-md py-1 px-2 outline-none"
            defaultValue=""
            onChange={props.onChangeSelect}
          >
            <option value="" className="text-black">
              All
            </option>
            {addressOptions}
          </select>
        </div>
      </div>
      
    </div>
  );
};

export default SegmentAddress;
