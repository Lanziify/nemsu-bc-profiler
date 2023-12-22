import React from 'react'

const FormButtons = (props) => {
  return (
    <div className="col-span-full flex items-center gap-2">
    {props.step != 1 && (
      <button
        type="button"
        onClick={props.onClickPrevStep}
        disabled={props.isSubmitting}
        className="w-full rounded-md bg-gray-500 p-1 text-sm font-semibold text-white disabled:opacity-10"
      >
        Back
      </button>
    )}
    <button
      type="submit"
      disabled={props.isSubmitting}
      className="w-full rounded-md bg-blue-500 p-1 text-sm font-semibold text-white disabled:opacity-10"
    >
      {props.step === 1 || props.step != 8 ? "Next" : "Submit"}
    </button>
  </div>
  )
}

export default FormButtons