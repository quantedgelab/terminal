import React from "react";

const RequiredLabel = ({ children, showError }) => {
  return (
    <div className="flex items-center gap-1">
      {children}
      {showError && <span className="text-red-500">*</span>}
    </div>
  );
};

export default RequiredLabel;
