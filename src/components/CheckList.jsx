import { Field } from "formik";
import React from "react";

const CheckList = ({
  values,
  errors,
  touched,
  isSubmitting,
  setFieldValue,
  disableFields
}) => {
  const concerns = [
    "Conflict in class schedule",
    "Adjustment to college life",
    "Relationship with other students",
    "Overlapping of activities",
    "Peer pressure",
    "conflict with studies and work",
    "Relationship with teachers",
    "Relationship with opposite sex",
    "Relationship with boyfriend/girlfriend",
    "Finance and living condition",
    "Family pressure",
    "Personal and emotion problems",
  ];
  return (
    <div className="col-span-full grid grid-cols-2 gap-2">
      <div className="col-span-full text-sm font-bold">
        What are the problems/concern you encountered during your stay in SDSSU
        - Bislig Campus? Please check as many as you can:
      </div>
      {concerns.map((concern, index) => (
        <div key={index}>
          <Field type="checkbox" name="checkList.concerns" disabled={disableFields}>
            {({ field }) => (
              <div className="flex items-center gap-1">
                <input
                  {...field}
                  id={`concern-${index}`}
                  value={concern}
                  checked={field.value.includes(concern)}
                  type="checkbox"
                  disabled={disableFields}
                />
                <label htmlFor={`concern-${index}`} className="text-xs">
                  {concern}
                </label>
              </div>
            )}
          </Field>
        </div>
      ))}
      <div className="col-span-full flex items-center mb-2">
        <label htmlFor="other" className="text-xs font-bold">other, please specify:</label>
        <Field id="other" name="checkList.other" className="border-b flex-grow"/>
      </div>
    </div>
  );
};

export default CheckList;
