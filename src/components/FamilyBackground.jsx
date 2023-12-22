import React from "react";
import { IoMdPersonAdd } from "react-icons/io";
import {
  checkError,
  addChildren,
  deleteChild,
  addSiblings,
  removeSibling,
} from "../utils/formUtils";
import CustomInput from "./CustomInput";
import { Field } from "formik";

const FamilyBackground = ({
  values,
  errors,
  touched,
  isSubmitting,
  setFieldValue,
  disableFields,
}) => {
  const parents = [
    {
      type: "father",
    },
    {
      type: "mother",
    },
  ];

  const fields = (parent) => {
    return [
      {
        label: "Full Name",
        name: `familyBackground.${parent.type}.name`,
        type: "text",
      },
      {
        label: "Age",
        name: `familyBackground.${parent.type}.age`,
        type: "text",
      },
      {
        label: "Address",
        name: `familyBackground.${parent.type}.address`,
        type: "text",
      },
      {
        label: "Contact Number",
        name: `familyBackground.${parent.type}.contact`,
        type: "text",
      },
      {
        label: "Occupation",
        name: `familyBackground.${parent.type}.occupation`,
        type: "text",
      },
      {
        label: "Highest Education Attainment",
        name: `familyBackground.${parent.type}.attainment`,
        type: "text",
      },
      {
        label: "Monthly income",
        name: `familyBackground.${parent.type}.income`,
        type: "number",
      },
    ];
  };

  return (
    <div className="col-span-full grid gap-2 lg:grid-cols-2">
      {parents.map((parent, i) => (
        <div key={i}>
          <h1 className="bg-gray-200 px-2 py-1 font-bold">
            {parent.type.charAt(0).toLocaleUpperCase() + parent.type.slice(1)}
          </h1>
          {fields(parent).map((field, j) => (
            <div key={j}>
              <CustomInput
                {...field}
                errors={errors}
                touched={touched}
                disabled={disableFields}
              />
            </div>
          ))}
        </div>
      ))}

      <div className="col-span-full">
        <CustomInput
          asSelect
          name="familyBackground.parentStatus"
          label="Parent Status"
          errors={errors}
          touched={touched}
          disabled={disableFields}
        >
          <option value="living together">Living Together</option>
          <option value="separated">Separated</option>
          <option value="others">Other</option>
        </CustomInput>
        {values.familyBackground.parentStatus === "others" && (
          <CustomInput
            asSpecify
            name="familyBackground.specifyParentStatus"
            disabled={disableFields}
          />
        )}
      </div>

      <h1 className="col-span-full bg-gray-200 px-2 py-1 font-bold">
        Brothers/Sisters
      </h1>
      {values.familyBackground.siblings.map((child, index) => (
        <div
          key={index}
          className="col-span-full gap-2 max-sm:grid max-sm:grid-cols-6 lg:flex"
        >
          <Field
            name={`familyBackground.siblings[${index}].name`}
            placeholder="Name"
            className="rounded-md border border-gray-400 px-2 py-1 text-sm max-sm:col-span-full max-sm:flex-grow-0 lg:flex-grow"
            disabled={disableFields}
          />
          <Field
            type="number"
            name={`familyBackground.siblings[${index}].age`}
            placeholder="Age"
            className="rounded-md border border-gray-400 px-2 py-1 text-sm lg:w-24"
            disabled={disableFields}
          />
          <Field
            name={`familyBackground.siblings[${index}].school`}
            placeholder="School"
            className="rounded-md border border-gray-400 px-2 py-1 text-sm max-sm:col-span-3 lg:flex-grow"
            disabled={disableFields}
          />
          <Field
            name={`familyBackground.siblings[${index}].occupation`}
            placeholder="Occupation"
            className="rounded-md border border-gray-400 px-2 py-1 text-sm max-sm:col-span-2"
            disabled={disableFields}
          />
          <button
            type="button"
            className="rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white max-sm:col-span-full"
            onClick={() => removeSibling(setFieldValue, values, index)}
            disabled={disableFields}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="col-span-full flex items-center justify-center gap-2 rounded-md bg-blue-500 p-1 text-sm font-semibold text-white disabled:bg-gray-500 disabled:opacity-50"
        onClick={() => addSiblings(setFieldValue, values)}
        disabled={disableFields}
      >
        Add Sibling <IoMdPersonAdd size={16} />
      </button>
      <div></div>
    </div>
  );
};

export default FamilyBackground;
