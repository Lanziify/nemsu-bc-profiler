import React from "react";
import { Field, ErrorMessage } from "formik";
import { MdErrorOutline } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { checkError, addChildren, deleteChild } from "../utils/formUtils";
import CustomInput from "./CustomInput";

const PesonalData = ({
  values,
  errors,
  touched,
  isSubmitting,
  setFieldValue,
  disableFields
}) => {
  const fields = [
    {
      label: "Last Name",
      type: "text",
      name: "personalData.name.lastName",
    },
    {
      label: "First Name",
      type: "text",
      name: "personalData.name.firstName",
    },
    {
      label: "Middle Initial",
      type: "text",
      name: "personalData.name.middleInitial",
    },
    {
      label: "Course",
      type: "text",
      name: "personalData.course",
      span: "col-span-full",
    },
    {
      label: "Age",
      type: "text",
      name: "personalData.age",
    },
    {
      label: "Date of Birth",
      type: "date",
      name: "personalData.birthDate",
      span: "max-sm:col-span-2",
    },
    {
      label: "Place of Birth",
      type: "text",
      name: "personalData.birthPlace",
      span: "max-sm:col-span-full",
    },
    {
      label: "Sex",
      type: "text",
      name: "personalData.sex",
    },
    {
      label: "Religion",
      type: "text",
      name: "personalData.religion",
    },
    {
      label: "Nationality",
      type: "text",
      name: "personalData.nationality",
    },
    {
      label: "Home Address",
      type: "text",
      name: "personalData.homeAddress",
      span: "col-span-full",
    },
    {
      label: "Present/Boading House Address",
      type: "text",
      name: "personalData.presentAddress",
      span: "col-span-full",
    },
    {
      label: "Email Address",
      type: "email",
      name: "personalData.email",
      span: "col-span-full",
    },
    {
      label: "Contact Number",
      type: "text",
      name: "personalData.contact",
      span: "col-span-full",
    },
    {
      label: "If married, name of spouse",
      type: "text",
      name: "personalData.spouse.name",
      span: "max-sm:col-span-full col-span-2",
    },
    {
      label: "Contact Number",
      type: "number",
      name: "personalData.spouse.contact",
      span: "max-sm:col-span-full",
    },
  ];

  return (
    <>
      {fields.map((field, index) => (
        <CustomInput
          key={index}
          {...field}
          errors={errors}
          touched={touched}
          inputContainerStyle={`flex flex-col ${field.span || ""}`}
          disabled={disableFields}
        />
      ))}
      {values.personalData.children.length > 0 && (
        <div className="col-span-full grid grid-cols-4  gap-2">
          <p className="col-span-full mb-1 text-xs font-bold lg:hidden">
            Children Name, Age, Sex
          </p>
          <p className="col-span-2 mb-1 text-center text-xs font-bold max-sm:hidden">
            Name of the Children (from eldest to youngest)
          </p>
          <p className="mb-1 text-center text-xs font-bold max-sm:hidden">
            Age
          </p>
          <p className="mb-1 text-center text-xs font-bold max-sm:hidden">
            Sex
          </p>
          {values.personalData.children.map((child, index) => (
            <div
              key={index}
              className="col-span-full gap-2 max-sm:grid max-sm:grid-cols-6 lg:flex"
            >
              <Field
                name={`personalData.children[${index}].name`}
                placeholder="Name"
                className="rounded-md border border-gray-400 px-2 py-1 text-sm max-sm:col-span-3 max-sm:flex-grow-0 lg:flex-grow lg:placeholder:opacity-0"
                disabled={disableFields}
              />
              <Field
                type="number"
                name={`personalData.children[${index}].age`}
                placeholder="Age"
                className="rounded-md border border-gray-400 px-2 py-1 text-sm lg:placeholder:opacity-0"
                disabled={disableFields}
              />
              <Field
                name={`personalData.children[${index}].sex`}
                placeholder="Sex"
                className="rounded-md border border-gray-400 px-2 py-1 text-sm lg:placeholder:opacity-0"
                disabled={disableFields}
              />
              <button
                className="rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white max-sm:w-full"
                onClick={() => deleteChild(setFieldValue, values, index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {values.personalData.spouse.name.length > 0 && (
        <button
          type="button"
          disabled={isSubmitting}
          className="col-span-full flex items-center justify-center gap-2 rounded-md bg-blue-500 p-1 text-sm font-semibold text-white disabled:opacity-10"
          onClick={() => addChildren(setFieldValue, values)}
        >
          <p>Add Children</p> <IoMdPersonAdd size={16} />
        </button>
      )}

      <div className="col-span-full flex flex-col">
        <label
          htmlFor="personalData.studyReason"
          className="mb-1 text-xs font-bold"
        >
          Reason/s for studying in SDSSU
        </label>
        <Field
          id="personalData.studyReason"
          name="personalData.studyReason"
          className="w-full rounded-md border border-gray-400 px-2 py-1 text-sm"
          disabled={disableFields}
        />
      </div>

      <div className="col-span-full flex flex-col">
        <label
          htmlFor="personalData.studyReason"
          className="mb-1 text-xs font-bold"
        >
          Person/s you are living with
        </label>
        <Field
          as="select"
          id="personalData.livingWith"
          name="personalData.livingWith"
          className="w-full rounded-md border border-gray-400 px-2 py-1 text-sm"
          disabled={disableFields}
        >
          <option value="N/A" disabled>
            Select an option
          </option>
          <option value="parents">Parents</option>
          <option value="one of the parents">One of the parents</option>
          <option value="relatives">Relatives</option>
          <option value="others">Others</option>
        </Field>
        {values.personalData.livingWith === "others" && (
          <CustomInput
            asSpecify
            name="personalData.specifyLivingWith"
            label="Please specify"
            disabled={disableFields}
          />
        )}
      </div>

      <div className="col-span-2 flex flex-col max-sm:col-span-full">
        <CustomInput
          id="personalData.emergencyPerson.name"
          name="personalData.emergencyPerson.name"
          label="In case of Emergency person to notify"
          errors={errors}
          touched={touched}
          disabled={disableFields}
        />
      </div>

      <div className="flex flex-col max-sm:col-span-full">
        <CustomInput
          id="personalData.emergencyPerson.contact"
          name="personalData.emergencyPerson.contact"
          label=" Contact Number"
          errors={errors}
          touched={touched}
          disabled={disableFields}
        />
      </div>
    </>
  );
};

export default PesonalData;
