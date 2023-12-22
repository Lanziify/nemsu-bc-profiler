import React, { useEffect, useState } from "react";
import {
  checkListSchema,
  curricularActivitiesSchema,
  familyBackgroundValidationSchema,
  personalDataValidationSchema,
  personalRelationshipsSchema,
  scholasticDataValidationSchema,
  vocationalPlansSchema,
  workExperienceSchema,
} from "../utils/validation";

const initialValues = {
  personalData: {
    name: {
      lastName: "",
      firstName: "",
      middleInitial: "",
    },
    course: "",
    age: "",
    birthDate: "",
    birthPlace: "",
    sex: "",
    religion: "",
    nationality: "",
    homeAddress: "",
    presentAddress: "",
    contact: "",
    email: "",
    maritalStatus: "",
    spouse: {
      name: "",
      contact: "",
    },
    children: [],
    studyReason: "",
    livingWith: "N/A",
    specifyLivingWith: "",
    emergencyPerson: {
      name: "",
      contact: "",
    },
  },
  familyBackground: {
    father: {
      name: "",
      age: "",
      address: "",
      contact: "",
      occupation: "",
      attainment: "",
      income: "",
    },
    mother: {
      name: "",
      age: "",
      address: "",
      contact: "",
      occupation: "",
      attainment: "",
      income: "",
    },
    parentStatus: "N/A",
    specifyParentStatus: "",
    siblings: [],
  },
  scholasticData: {
    elementary: {
      schoolName: "",
      inclusiveYear: "",
      awards: [],
    },
    highSchool: {
      schoolName: "",
      inclusiveYear: "",
      awards: [],
    },
    college: {
      schoolName: "",
      inclusiveYear: "",
      awards: [],
    },
    course: {
      schoolName: "",
      inclusiveYear: "",
      awards: "",
    },
  },
  workExperience: {
    present: {
      employer: "",
      duration: "",
    },
    previous: {
      employer: "",
      duration: "",
    },
  },
  curricularActivities: {
    organizations: {
      school: [],
      community: [],
    },
  },
  personalRelationships: {
    family: [],
    friends: [],
    oppositeSex: [],
    counselors: [],
  },
  vocationalPlans: {
    courseReason: "",
    career: "",
    characteristics: [],
  },
  checkList: {
    concerns: [],
    other: "",
  },
};

export function useMultistepForm() {
  const [step, setStep] = useState(1);
  const [formTitle, setFormTitle] = useState("");

  const stepTitles = [
    "Personal Data",
    "Family Background",
    "Scholastic Data",
    "Work Experience",
    "Curricular Activities",
    "Personal Relationships",
    "Vocational Plans",
    "Checklist",
  ];

  const validationSchema = () => {
    switch (step) {
      case 1:
        return personalDataValidationSchema;
      case 2:
        return familyBackgroundValidationSchema;
      case 3:
        return scholasticDataValidationSchema;
      case 4:
        return workExperienceSchema;
      case 5:
        return curricularActivitiesSchema;
      case 6:
        return personalRelationshipsSchema;
      case 7:
        return vocationalPlansSchema;
      case 8:
        return checkListSchema;
      default:
        return personalDataValidationSchema;
    }
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
    setFormTitle(stepTitles[step]);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
    setFormTitle(stepTitles[step - 2]);
  };

  const resetStep = () => {
    setStep(1);
    setFormTitle(stepTitles[0]);
  };

  useEffect(() => {
    setFormTitle(stepTitles[step - 1]);
  }, [step]);

  return {
    initialValues,
    validationSchema,
    step,
    formTitle,
    stepTitles,
    nextStep,
    prevStep,
    resetStep,
  };
}
