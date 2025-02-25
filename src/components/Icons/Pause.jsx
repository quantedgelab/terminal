import React from "react";
import { mappingIconSize } from "../../constant/core";

const Pause = ({ size = "md", classProps }) => {
  return (
    <svg className={`${classProps}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={mappingIconSize[size]} height={mappingIconSize[size]} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9-3a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0V9Zm4 0a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0V9Z" clipRule="evenodd" />
    </svg>
  );
};

export default Pause;
