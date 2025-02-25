import React from "react";
import { mappingIconSize } from "../../constant/core";

const UpDown = ({ size = "md", classProps }) => {
  return (
    <svg className={`${classProps}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={mappingIconSize[size]} height={mappingIconSize[size]} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12.832 3.445a1 1 0 0 0-1.664 0l-4 6A1 1 0 0 0 8 11h8a1 1 0 0 0 .832-1.555l-4-6Zm-1.664 17.11a1 1 0 0 0 1.664 0l4-6A1 1 0 0 0 16 13H8a1 1 0 0 0-.832 1.555l4 6Z" clipRule="evenodd" />
    </svg>
  );
};

export default UpDown;
