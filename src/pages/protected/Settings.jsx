import React from "react";
import { NavLink } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";

const Settings = () => {
  const { logoutUser } = useAuth();
  const settingsItems = [
    {
      option: "Edit Profile",
      path: null,
    },
    {
      option: "Change Password",
      path: "change_password",
    },
  ];
  return (
    <div>
      <h1 className="p-4 text-xl font-bold">Settings</h1>
      <div className="flex flex-col">
        {settingsItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className="group inline-flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100"
          >
            <p className="text-sm group-hover:opacity-90">{item.option}</p>
          </NavLink>
        ))}
      </div>
      <div
        className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 hover:opacity-90"
        onClick={logoutUser}
      >
        Logout
      </div>
    </div>
  );
};

export default Settings;
