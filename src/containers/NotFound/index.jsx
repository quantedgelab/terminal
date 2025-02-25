import React from "react";
import Logo from "../../assets/images/logo.png";

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="text-center">
        <img src={Logo} alt="Not Found" className="w-48 h-48 mx-auto mb-4" />
        <h1 className="text-3xl font-semibold text-gray-700">Page Not Found</h1>
        <p className="text-gray-500 mt-2">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
