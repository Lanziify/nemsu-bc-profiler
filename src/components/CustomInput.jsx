import React from "react";
import { Field, ErrorMessage } from "formik";
import { MdErrorOutline } from "react-icons/md";
import { checkError } from "../utils/formUtils";

const CustomInput = (props) => {
  return (
    <div className={props.inputContainerStyle}>
      {props.asSelect ? (
        <>
          <label htmlFor={props.name} className="text-xs font-bold">
            {props.label}
          </label>
          <Field
            as="select"
            id={props.name}
            name={props.name}
            type={props.type}
            className={`w-full rounded-md border px-2 py-1 text-sm ${
              checkError(props.errors, props.name) &&
              checkError(props.touched, props.name)
                ? "border-red-500"
                : "border-gray-400"
            }`}
            disabled={props.disabled || false}
          >
            <option value="N/A" disabled>
              Select an option
            </option>
            {props.children}
          </Field>
        </>
      ) : !props.asSpecify ? (
        <>
          <label htmlFor={props.name} className="text-xs font-bold">
            {props.label}
          </label>
          <div className="relative">
            <Field
              id={props.name}
              name={props.name}
              type={props.type}
              placeholder={props.placeholder}
              className={`w-full rounded-md border px-2 py-1 text-sm ${
                checkError(props.errors, props.name) &&
                checkError(props.touched, props.name)
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              disabled={props.disabled || false}
            />
            {["text", "number", "email"].includes(props.type) &&
              checkError(props.errors, props.name) &&
              checkError(props.touched, props.name) && (
                <MdErrorOutline
                  size={18}
                  className="absolute bottom-0 right-1 top-0 m-auto text-red-500"
                />
              )}
          </div>
          <ErrorMessage
            name={props.name}
            className="text-xs text-red-500"
            component="span"
          />
        </>
      ) : (
        <>
          <div className="flex items-end gap-2">
            <label htmlFor={props.name} className="mb-1 text-xs font-bold">
              {props.label || "Please specify"}
            </label>
            <Field
              id={props.name}
              name={props.name}
              className="border-b border-gray-400 px-2 py-1 text-sm"
              disabled={props.disabled || false}
            />
          </div>
          <ErrorMessage
            name={props.name}
            className="text-xs text-red-500"
            component="span"
          />
        </>
      )}
    </div>
  );
};

export default CustomInput;
