import React from "react";
import CustomInput from "./CustomInput";

const WorkExperience = ({
  values,
  errors,
  touched,
  isSubmitting,
  setFieldValue,
  disableFields
}) => {
  const jobs = [
    {
      category: "present",
      label: "Present",
    },
    {
      category: "pervious",
      label: "Past/Previous",
    },
  ];

  const fields = (job) => {
    return [
      {
        name: `workExperience.${job.category}.employer`,
        placeholder: "Name of Employer",
      },
      {
        name: `workExperience.${job.category}.duration`,
        placeholder: "Duration",
      },
    ];
  };

  return (
    <div className="col-span-full grid gap-2">
      {jobs.map((job, i) => (
        <div key={i} className="flex gap-2 max-sm:flex-col">
          <div className="w-40">{job.label}</div>
          <div className="grid flex-grow gap-2 lg:grid-cols-2">
            {fields(job).map((field, j) => (
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

export default WorkExperience;
