import React from "react";

import { mappingIconSize } from "../../constant/core";

const Copy = ({ size = "md", classProps }) => {
  return (
    <svg className={`${classProps}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={mappingIconSize[size]} height={mappingIconSize[size]} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
    </svg>
  );
};

export default Copy;
