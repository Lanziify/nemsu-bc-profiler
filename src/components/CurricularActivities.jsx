import React from "react";
import { addOrganization, removeOrganization } from "../utils/formUtils";
import { Field } from "formik";

const CurricularActivities = ({
  values,
  errors,
  touched,
  isSubmitting,
  setFieldValue,
  disableFields
}) => {
  const categories = [
    {
      name: "school",
      label: "Clubs and Organization in the school you belong",
      path: "curricularActivities.organizations.school",
      headerLeft: "Name of Clubs/Organization",
      headerRight: "Position Held",
      childFields: {
        name: "",
        position: "",
      },
    },
    {
      name: "community",
      label: "Clubs and Organization in the community you belong",
      path: "curricularActivities.organizations.community",
      headerLeft: "Name of Clubs/Organization",
      headerRight: "Specify activity conducted",
      childFields: {
        name: "",
        activity: "",
      },
    },
  ];

  return (
    <div className="col-span-full">
      {categories.map((category, i) => (
        <div key={i} className="mb-4">
          <div className="mb-2 font-bold">{category.label}</div>
          <div className="grid grid-cols-2 gap-2">
            {values.curricularActivities.organizations[category.name].length !=
              0 && (
              <>
                <div className="text-xs font-bold max-sm:hidden">
                  {category.headerLeft}
                </div>
                <div className="text-xs font-bold max-sm:hidden">
                  {category.headerRight}
                </div>
              </>
            )}
            {values.curricularActivities.organizations[category.name].map(
              (field, j) => (
                <div key={j} className="col-span-full grid grid-cols-6 gap-2">
                  <Field
                    name={`curricularActivities.organizations.${category.name}.[${j}].name`}
                    placeholder={category.headerLeft}
                    className="col-span-3 rounded-md border border-gray-400 px-2 py-1 text-sm max-sm:col-span-full placeholder:lg:opacity-0"
                    disabled={disableFields}
                  />
                  <Field
                    name={`curricularActivities.organizations.${
                      category.name
                    }.[${j}].${
                      category.name === "school" ? "position" : "activity"
                    }`}
                    placeholder={category.headerRight}
                    className="col-span-2  rounded-md border border-gray-400 px-2 py-1 text-sm max-sm:col-span-full placeholder:lg:opacity-0"
                    disabled={disableFields}
                  />
                  <button
                    type="button"
                    className="rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white max-sm:col-span-full"
                    onClick={() => removeOrganization(setFieldValue, values, category.path, j)}
                    disabled={disableFields}
                  >
                    Remove
                  </button>
                  <hr
                    className={`col-span-full lg:hidden ${
                      values.curricularActivities.organizations[category.name]
                        .length !=
                      j + 1
                        ? "flex"
                        : "hidden"
                    }`}
                  />
                </div>
              ),
            )}
            <button
              type="button"
              className="col-span-full rounded-md bg-blue-500 px-2 py-1 text-xs font-semibold text-white max-sm:col-span-full disabled:bg-gray-500 disabled:opacity-50"
              onClick={() =>
                addOrganization(
                  setFieldValue,
                  values,
                  category.path,
                  category.childFields,
                )
              }
              disabled={disableFields}
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CurricularActivities;
