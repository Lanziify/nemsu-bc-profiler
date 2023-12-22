import { Field } from "formik";
import React from "react";

const PersonalRelationships = ({
  values,
  errors,
  touched,
  isSubmitting,
  setFieldValue,
  disableFields
}) => {
  const categories = [
    {
      name: "family",
      label: "Family",
      fields: [
        "I have a good relationship with my parents",
        "I can easily approach or talk to my parents",
        "I can share my problems to my siblings",
      ],
    },
    {
      name: "friends",
      label: "Friends",
      fields: [
        "I have established good relationships with my friends",
        "I can easily open up my problems with them",
        "I usually spend most of my time with them than with my family",
      ],
    },
    {
      name: "oppositeSex",
      label: "Opposite Sex",
      fields: [
        "I am in relationship right now",
        "I often spend time with my girlfriend/boyfriend",
        "I don't have a relationship with the opposite sex at present",
      ],
    },
    {
      name: "counselors",
      label: "Counselors",
      fields: [
        "I have been to counseling session/s during my highschool",
        "I am comfortable sharing my personal problems with a counselor",
        "I know that counselors cab help me improve myself",
      ],
    },
  ];

  return (
    <div className="col-span-full">
      {categories.map((category, i) => (
        <div key={i} className="grid mb-4 grid-cols-2 gap-2">
          <div className="col-span-full grid grid-cols-6">
            <div className="col-span-4 font-bold">{category.label}</div>
            <div className={`text-center font-bold ${i === 0 ? "block" : "hidden"}`}>YES</div>
            <div className={`text-center font-bold ${i === 0 ? "block" : "hidden"}`}>NO</div>
          </div>
          {category.fields.map((field, j) => (
            <div key={j} className="col-span-full grid grid-cols-6">
              <div className="col-span-4  text-sm">
                {j + 1}. {field}
              </div>
              <Field
                type="checkbox"
                name={`personalRelationships.${category.name}[${j}]`}
                disabled={disableFields}
              >
                {({ field }) => (
                  <>
                    <input
                      {...field}
                      value="yes"
                      checked={field.value === "yes"}
                      type="checkbox"
                      onChange={() => setFieldValue(field.name, "yes")}
                      className="m-auto h-4 w-4"
                      disabled={disableFields}
                    />
                    <input
                      {...field}
                      value="no"
                      checked={field.value === "no"}
                      type="checkbox"
                      onChange={() => setFieldValue(field.name, "no")}
                      className="m-auto h-4 w-4"
                      disabled={disableFields}
                    />
                  </>
                )}
              </Field>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PersonalRelationships;
