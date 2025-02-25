import React from "react";
import { mappingIconSize } from "../../constant/core";

const Down = ({ size = "md", classProps }) => {
  return (
    <svg className={`${classProps}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={mappingIconSize[size]} height={mappingIconSize[size]} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clipRule="evenodd" />
    </svg>
  );
};

export default Down;
