import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useMultistepForm } from "../../hooks/useMultiForm";
import PesonalData from "../../components/PesonalData";
import FamilyBackground from "../../components/FamilyBackground";
import FormButtons from "../../components/FormButtons";
import ScholasticData from "../../components/ScholasticData";
import WorkExperience from "../../components/WorkExperience";
import CurricularActivities from "../../components/CurricularActivities";
import PersonalRelationships from "../../components/PersonalRelationships";
import VocationalPlans from "../../components/VocationalPlans";
import CheckList from "../../components/CheckList";
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { firestore } from "../../firebase";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const {
    validationSchema,
    step,
    formTitle,
    stepTitles,
    nextStep,
    prevStep,
    resetStep,
  } = useMultistepForm();
  const location = useLocation();
  const profileValues = location.state;
  const [disableFields, setDisableFields] = useState(true)

  if (!profileValues)
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="text-xl font-bold">Oops! Something Went Wrong</div>
        <div className="text-sm">
          Record does not exist or has been deleted.
        </div>
      </div>
    );

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (step != 8) {
      setSubmitting(false);
      return nextStep();
    }
    try {
      setSubmitting(true);
      Swal.fire({
        title: "Submitting Form",
        text: "Uploading Student Profile. Please wait...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const profileDocRef = collection(firestore, "profiles");
      const docRef = await addDoc(profileDocRef, {});
      await setDoc(doc(profileDocRef, docRef.id), {
        ...values,
        docId: docRef.id,
        updatedAt: null,
        createdAt: serverTimestamp(),
      });
      Swal.close();
      await Swal.fire({
        icon: "success",
        title: "Profile Recorded!",
        text: "Student profile successfully recorded!",
        showConfirmButton: true,
        confirmButtonText: "Confirm",
        confirmButtonColor: "#3b82f6",
        customClass: {
          title: "text-xl",
          htmlContainer: "swal2-text-body",
        },
      });
      resetStep();
      resetForm();
      setSubmitting(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops! Something went wrong.",
        text: error.message,
        showConfirmButton: true,
        confirmButtonText: "Confirm",
        confirmButtonColor: "#3b82f6",
        customClass: {
          title: "text-xl",
          htmlContainer: "swal2-text-body",
        },
      });
    }
  };

  const RenderForms = (formProps) => {
    switch (step) {
      case 1:
        return <PesonalData {...formProps} />;
      case 2:
        return <FamilyBackground {...formProps} />;
      case 3:
        return <ScholasticData {...formProps} />;
      case 4:
        return <WorkExperience {...formProps} />;
      case 5:
        return <CurricularActivities {...formProps} />;
      case 6:
        return <PersonalRelationships {...formProps} />;
      case 7:
        return <VocationalPlans {...formProps} />;
      case 8:
        return <CheckList {...formProps} />;
      default:
        return <PesonalData {...formProps} />;
    }
  };

  return (
    <Formik
      initialValues={profileValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={handleSubmit}
    >
      {(formProps) => (
        <div className="relative">
          <Form className="grid grid-cols-3 items-start gap-2 p-2">
            <div className="col-span-full flex items-center justify-between">
              <h1 className="text-2xl font-bold">{formTitle}</h1>
              <span className="text-xs font-bold">
                {step} / {stepTitles.length}
              </span>
            </div>
            <RenderForms {...formProps} disableFields={disableFields} />
            <FormButtons
              step={step}
              onClickPrevStep={prevStep}
              isSubmitting={formProps.isSubmitting}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Profile;
