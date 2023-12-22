import React from "react";

const NotFound = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center text-center">
      <div>
        <h1 className="text-2xl font-black">Oops! Page Not Found</h1>
        <p>The page you are trying to access could not be found or does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;