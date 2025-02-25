import React from "react";
import { mappingIconSize } from "../../constant/core";

const Up = ({ size = "md", classProps }) => {
  return (
    <svg className={`${classProps}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={mappingIconSize[size]} height={mappingIconSize[size]} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M5.575 13.729C4.501 15.033 5.43 17 7.12 17h9.762c1.69 0 2.618-1.967 1.544-3.271l-4.881-5.927a2 2 0 0 0-3.088 0l-4.88 5.927Z" clipRule="evenodd" />
    </svg>
  );
};

export default Up;
