import React from "react";
import CustomInput from "./CustomInput";
import { Field } from "formik";

const VocationalPlans = ({
  values,
  errors,
  touched,
  isSubmitting,
  setFieldValue,
  disableFields
}) => {
  const fields = [
    {
      name: "vocationalPlans.courseReason",
      label: "What is your main reason in choosing your course?",
    },
    {
      name: "vocationalPlans.career",
      label: "What occupation do you prefer in the future?",
    },
  ];
  const characteristics = [
    "Hardworking",
    "Responsible",
    "Resourceful",
    "Shy/Quiet",
    "Calm",
    "Good-natured",
    "Impatient",
    "Cheerful",
    "Easily Distracted",
    "Self-confident",
    "Cooperative",
    "Creative",
    "Serious",
    "Born-leader",
    "Approachable",
  ];

  return (
    <div className="col-span-full">
      {fields.map((field, index) => (
        <div key={index} className="mb-2">
          <CustomInput {...field} errors={errors} touched={touched} disabled={disableFields} />
        </div>
      ))}
      <div className="grid grid-cols-3 gap-2 mb-2">
        <div className="col-span-full text-xs font-bold">
          Please check the following characteristics which seems to describe you:
        </div>
        {characteristics.map((character, index) => (
          <div key={index}>
            <Field type="checkbox" name="vocationalPlans.characteristics">
              {({ field }) => (
                <div className="flex items-center gap-1">
                  <input
                    {...field}
                    id={`chckbx-${index}`}
                    value={character}
                    checked={field.value.includes(character)}
                    type="checkbox"
                    className="h-4 w-4"
                    disabled={disableFields}
                  />
                  <label htmlFor={`chckbx-${index}`} className="text-xs">
                    {character}
                  </label>
                </div>
              )}
            </Field>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VocationalPlans;
