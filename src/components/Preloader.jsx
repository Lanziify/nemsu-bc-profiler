import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Preloader = () => {
  return (
    <div className="flex h-screen w-screen animate-pulse flex-col items-center justify-center p-16">
      <AiOutlineLoading3Quarters size={38} className="text-blue-500 animate-spin" />
    </div>
  );
};

export default Preloader;
