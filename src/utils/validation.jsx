import * as yup from "yup";
import { strings } from "../constants/strings";
import { phoneRegExp } from "../strings/regex";

export const authValidation = {
  validateLogin: (values) => {
    const errorMessage = {};
    // Email validation
    if (!values.email) {
      errorMessage.email = "Email is required";
    } else if (!strings.emailRegex.test(values.email)) {
      errorMessage.email = "Please enter a valid email address";
    }
    // Password validation
    if (!values.password) {
      errorMessage.password = "Password is required";
    } else if (!strings.passwordRegex.test(values.password)) {
      errorMessage.password =
        "Password must be eight characters long, at least one letter and one number";
    }
    return errorMessage;
  },

  validateRegistration: (values) => {
    const errorMessage = {};
    if (!values.displayName) {
      errorMessage.displayName = "Name is required.";
    }
    if (!values.email) {
      errorMessage.email = "Email is required.";
    } else if (!strings.emailRegex.test(values.email)) {
      errorMessage.email = "Please enter a valid email address.";
    }
    if (!values.password) {
      errorMessage.password = "Password is required.";
    } else if (!strings.passwordRegex.test(values.password)) {
      errorMessage.password =
        "Password must be eight characters long, at least one letter and one number";
    }
    return errorMessage;
  },

  validatePasswordReset: (values) => {
    const errorMessage = {};

    if (!values.current) {
      errorMessage.current = "Please enter your current password";
    }

    if (!values.new) {
      errorMessage.new = "Please enter your new password";
    } else if (!strings.passwordRegex.test(values.new)) {
      errorMessage.new =
        "Password must be eight characters long, at least one letter and one number";
    }

    if (!values.confirm || values.new != values.confirm) {
      errorMessage.confirm = "Password does not match";
    }

    return errorMessage;
  },
};

export const personalDataValidationSchema = yup.object().shape({
  personalData: yup.object().shape({
    name: yup.object().shape({
      lastName: yup.string().required("Last name is required"),
      firstName: yup.string().required("First name is required"),
      middleInitial: yup.string(),
    }),
    course: yup.string().required("Course is required"),
    age: yup
      .number()
      .typeError("Age must be a number")
      .positive("Age must be a positive number")
      .integer("Age must be an integer")
      .required("Age is required"),
    birthDate: yup.string().required("Birth date is required"),
    birthPlace: yup.string().required("Birth place is required"),
    sex: yup.string().required("Sex is required"),
    religion: yup.string().required("Religion is required"),
    nationality: yup.string().required("Nationality is required"),
    homeAddress: yup.string().required("Home address is required"),
    presentAddress: yup.string().required("Present address is required"),
    contact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Contact is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    spouse: yup.object().shape({
      name: yup.string(),
      contact: yup.string(),
    }),
    children: yup.array(),
    studyReason: yup.string(),
    livingWith: yup.string(),
    specifyLivingWith: yup.string().when("livingWith", {
      is: (value) => value === "others",
      then: (schema) =>
        schema.required("Please specify your living arrangement"),
    }),
    emergencyPerson: yup.object().shape({
      name: yup.string().required("Emergency person is required"),
      contact: yup.string().matches(phoneRegExp, "Phone number is not valid")
      .required("Contact is required"),
    }),
  }),
});

export const familyBackgroundValidationSchema = yup.object().shape({
  familyBackground: yup.object().shape({
    father: yup.object().shape({
      name: yup.string().required("Full name is required"),
      age: yup
        .number()
        .typeError("Age must be a number")
        .positive("Invalid age")
        .integer("Age must be an integer")
        .required("Please enter an age"),
      address: yup.string().required("Address is required"),
      contact: yup.string().matches(phoneRegExp, "Phone number is not valid"),
      occupation: yup.string(),
      attainment: yup.string("Invalid input"),
      income: yup.number().positive("Invalid input"),
    }),
    mother: yup.object().shape({
      name: yup.string().required("Full name is required"),
      age: yup
        .number()
        .typeError("Age must be a number")
        .positive("Invalid age")
        .integer("Age must be an integer")
        .required("Please enter an age"),
      address: yup.string().required("Address is required"),
      contact: yup.string().matches(phoneRegExp, "Phone number is not valid"),
      occupation: yup.string(),
      attainment: yup.string(),
      income: yup.number().positive("Invalid input"),
    }),
    parentStatus: yup.string(),
    specifyParentStatus: yup.string().when("parentStatus", {
      is: (value) => value === "others",
      then: (schema) =>
        schema.required("Please specify your parent's living status"),
    }),
  }),
});

export const scholasticDataValidationSchema = yup.object().shape({
  scholasticData: yup.object().shape({
    elementary: yup.object().shape({
      schoolName: yup.string().required("Elementary school name is required"),
      inclusiveYear: yup
        .string()
        .required("Elementary inclusive year is required"),
      awards: yup.array(),
    }),
    highSchool: yup.object().shape({
      schoolName: yup.string().required("High school name is required"),
      inclusiveYear: yup
        .string()
        .required("High school inclusive year is required"),
      awards: yup.array(),
    }),
    college: yup.object().shape({
      schoolName: yup.string(),
      inclusiveYear: yup.string(),
      awards: yup.array(),
    }),
    course: yup.object().shape({
      schoolName: yup.string(),
      inclusiveYear: yup.string(),
      awards: yup.string(),
    }),
  }),
});

export const workExperienceSchema = yup.object().shape({
  workExperience: yup.object().shape({
    present: yup.object().shape({
      employer: yup.string(),
      duration: yup.string(),
    }),
    previous: yup.object().shape({
      employer: yup.string(),
      duration: yup.string(),
    }),
  }),
});

export const curricularActivitiesSchema = yup.object().shape({
  curricularActivities: yup.object().shape({
    organizations: yup.object().shape({
      school: yup.array(),
      community: yup.array(),
    }),
  }),
});

export const personalRelationshipsSchema = yup.object().shape({
  personalRelationships: yup.object().shape({
    family: yup.array(),
    friends: yup.array(),
    oppositeSex: yup.array(),
    counselors: yup.array(),
  }),
});

export const vocationalPlansSchema = yup.object().shape({
  vocationalPlans: yup.object().shape({
    courseReason: yup.string().required("This field is required"),
    career: yup.string().required("Future occupation is required"),
    characteristics: yup.array(),
  }),
});
export const checkListSchema = yup.object().shape({
  checkList: yup.object().shape({
    concerns: yup.array(),
    other: yup.string(),
  }),
});
