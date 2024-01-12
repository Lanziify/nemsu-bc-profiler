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
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { firestore } from "../../firebase";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { IoChevronBack } from "react-icons/io5";

const profileDocRef = collection(firestore, "profiles");

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
  const navigate = useNavigate();
  const location = useLocation();
  const profileValues = location.state;
  const [disableFields, setDisableFields] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

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
      if (!isEditing) return;
      if (isEditing && profileValues === values) return;
      setSubmitting(true);
      Swal.fire({
        title: "Updating Record",
        text: "Updating Student Profile. Please wait...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await updateDoc(doc(profileDocRef, values.docId), {
        ...values,
        updatedAt: serverTimestamp(),
      });
      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        showConfirmButton: false,
        customClass: {
          title: "text-xl",
          htmlContainer: "swal2-text-body",
        },
      });
      setIsEditing(false);
      navigate(-1);
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

  const handleEditClick = () => {
    setIsEditing(true);
    setDisableFields(false);
  };

  const handleCancelClick = async (formProps) => {
    try {
      if (isEditing && profileValues === formProps.values) {
        setDisableFields(true);
        setIsEditing(false);
        return;
      }
      await Swal.fire({
        title: "Are you sure you want to exit?",
        text: "Your changes will not be saved",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Confirm",
        reverseButtons: true,
        confirmButtonColor: "#3b82f6",
        cancelButtonColor: "#6b7280",
        customClass: {
          title: "text-xl",
          htmlContainer: "swal2-text-body",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          setIsEditing(false);
          setDisableFields(true);
          formProps.resetForm();
        }
      });
    } catch (error) {}
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
          <Form className="grid grid-cols-3 items-start gap-2 p-4">
            <NavLink
              to="/settings"
              className="flex items-center gap-1 text-sm font-semibold hover:opacity-50 "
            >
              <IoChevronBack size={18} />
              <div>Return</div>
            </NavLink>
            <div className="col-span-full flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">{formTitle}</h1>
                {!isEditing ? (
                  <div
                    className="hover:text-whit flex cursor-pointer items-center gap-0.5 rounded-sm border border-blue-500 px-2 py-0.5 text-xs text-blue-500 hover:bg-blue-500 hover:text-white"
                    onClick={handleEditClick}
                  >
                    <AiOutlineEdit size={12} />
                    <div className="text-xs font-semibold">Edit Record</div>
                  </div>
                ) : (
                  <div
                    className="hover:text-whit flex cursor-pointer items-center gap-0.5 rounded-sm border border-gray-500 px-2 py-0.5 text-xs text-gray-500 hover:bg-gray-500 hover:text-white"
                    onClick={() => handleCancelClick(formProps)}
                  >
                    <div className="text-xs font-semibold">Cancel</div>
                  </div>
                )}
              </div>
              <span className="text-xs font-bold">
                {step} / {stepTitles.length}
              </span>
            </div>
            <RenderForms {...formProps} disableFields={disableFields} />
            <FormButtons
              step={step}
              onClickPrevStep={prevStep}
              isSubmitting={formProps.isSubmitting}
              onEditPage={true}
              isEditing={isEditing}
              onEditClick={handleEditClick}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Profile;
