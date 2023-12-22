import React from "react";
import CustomInput from "./CustomInput";

const ScholasticData = ({
  values,
  errors,
  touched,
  isSubmitting,
  setFieldValue,
  disableFields
}) => {
  const levels = [
    {
      category: "elementary",
      label: "Elementary",
    },
    {
      category: "highSchool",
      label: "High School",
    },
    {
      category: "college",
      label: "College (transferee)",
    },
    {
      category: "course",
      label: "Course",
    },
  ];

  const fields = (levels) => {
    return [
      {
        name: `scholasticData.${levels.category}.schoolName`,
        placeholder: "Name of School",
      },
      {
        name: `scholasticData.${levels.category}.inclusiveYear`,
        placeholder: "Inclusive Years",
      },
      {
        name: `scholasticData.${levels.category}.awards`,
        placeholder: "Honors/Awards Recieved",
      },
    ];
  };

  return (
    <div className="col-span-full grid gap-2">
      {levels.map((level, i) => (
        <div key={i} className="flex gap-2 max-sm:flex-col">
          <div className="w-40">{level.label}</div>
          <div className="grid flex-grow gap-2 lg:grid-cols-3">
            {fields(level).map((field, j) => (
              <CustomInput
                key={j}
                {...field}
                errors={errors}
                touched={touched}
                disabled={disableFields}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScholasticData;
