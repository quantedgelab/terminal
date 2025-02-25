import React from "react";
import { Oval } from "react-loader-spinner";

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}

export default LoadingScreen;
