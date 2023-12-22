export const checkError = (errors, fieldName) => {
  if (Object.keys(errors).length === 0) return;

  const fieldPath = fieldName.split(".");
  const fieldValue = fieldPath.reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return acc[key];
    }
    return undefined;
  }, errors);

  return fieldValue;
};

export const addChildren = (setFieldValue, values) => {
  setFieldValue("personalData.children", [
    ...values.personalData.children,
    {
      name: "",
      age: "",
      sex: "",
    },
  ]);
};

export const deleteChild = (setFieldValue, values, index) => {
  const updatedChildren = [...values.personalData.children];
  updatedChildren.splice(index, 1);
  setFieldValue("personalData.children", updatedChildren);
};

export const addSiblings = (setFieldValue, values) => {
  setFieldValue("familyBackground.siblings", [
    ...values.familyBackground.siblings,
    {
      name: "",
      age: "",
      school: "",
      occupation: "",
    },
  ]);
};

export const removeSibling = (setFieldValue, values, index) => {
  const updatedChildren = [...values.familyBackground.siblings];
  updatedChildren.splice(index, 1);
  setFieldValue("familyBackground.siblings", updatedChildren);
};

export const addOrganization = (setFieldValue, values, path, fields) => {
  const targetKey = path.split(".").pop();
  setFieldValue(path, [
    ...values.curricularActivities.organizations[targetKey],
    fields,
  ]);
};

export const removeOrganization = (setFieldValue, values, path, index) => {
  const targetKey = path.split(".").pop();
  const updatedChildren = [...values.curricularActivities.organizations[targetKey]];
  updatedChildren.splice(index, 1);
  setFieldValue(path, updatedChildren);
};


