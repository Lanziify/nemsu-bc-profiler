import React, { useState } from "react";
import {
  AuthErrorCodes,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { errorHandler } from "../../utils/errorHandler";
import { authValidation } from "../../utils/validation";

const ChangePassword = () => {
  const { user } = useAuth();

  const [values, setValues] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [error, setError] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const fields = [
    {
      id: "current_password",
      label: "Current Password",
      name: "current",
      value: values.current,
      type: "text",
      error: error.current,
    },
    {
      id: "new_password",
      label: "New Password",
      name: "new",
      value: values.new,
      error: error.new,
      type: showPassword ? "text" : "password",
    },
    {
      id: "confirm_new_password",
      label: "Confirm Password",
      name: "confirm",
      value: values.confirm,
      error: error.confirm,
      type: showPassword ? "text" : "password",
    },
  ];

  const handleOnchange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formErrors = authValidation.validatePasswordReset(values);
      if (Object.keys(formErrors).length > 0) {
        setError(formErrors);
        return;
      }

      if (Object.values(values).every((value) => value === values.current))
        throw new Error(
          "Current password and new password should not be the same",
        );

      Swal.fire({
        title: "Loading...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const credential = EmailAuthProvider.credential(
        user.email,
        values.current,
      );

      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, values.new);
      Swal.close();

      Swal.fire({
        icon: "success",
        title: "Password Updated!",
        showConfirmButton: false,
        allowEscapeKey: true,
        allowOutsideClick: true,
      });
      setValues({
        current: "",
        new: "",
        confirm: "",
      });
    } catch (error) {
      let errorMessage = error.message ;
      if (error.code) {
        errorMessage = errorHandler.authError(error, AuthErrorCodes);
      }
      Swal.fire({
        icon: "error",
        text: errorMessage,
        showConfirmButton: false,
      });
    }
  };

  return (
    <form className="flex flex-col gap-2 p-4" onSubmit={handleSubmit}>
      <NavLink
        to="/settings"
        className="mb-4 flex items-center gap-1 text-sm font-semibold hover:opacity-50 "
      >
        <IoChevronBack size={18} />
        <div>Return</div>
      </NavLink>
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col">
          <label htmlFor={field.id} className="mb-1 text-xs font-semibold">
            {field.label}
          </label>
          <input
            id={field.id}
            name={field.name}
            type={field.type}
            value={field.value}
            onChange={handleOnchange}
            className="rounded-md border border-gray-400 px-2 py-1 placeholder:text-sm"
          />
          {field.error && (
            <span className="text-xs text-red-500">{field.error}</span>
          )}
        </div>
      ))}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="show"
          id="show_password"
          checked={showPassword}
          onChange={(e) => setShowPassword(e.target.checked)}
        />
        <label htmlFor="show_password" className="text-sm">
          Show Password
        </label>
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-blue-500 px-2 py-1 text-sm font-semibold text-white"
      >
        Confirm
      </button>
    </form>
  );
};

export default ChangePassword;
