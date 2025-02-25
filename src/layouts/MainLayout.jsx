import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Logo from "../assets/images/logo.png";

const MainLayout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Set dark mode by default
  useEffect(() => {
    if (!document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark");
    }
    setIsDarkMode(true);
  }, []);

  // Monitor dark mode changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="main-layout-container bg-[#121212] min-h-screen">
      <nav className="fixed top-0 z-50 w-full bg-[#1a1a1a] border-b border-[#333333]">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <div className="flex ms-2 md:me-24 items-center">
                <img src={Logo} className="h-8 me-3" alt="QuantEdge Logo" />
                <div className="flex md:items-center flex-col md:flex-row">
                  <span className="self-center text-xl text-white font-title sm:text-2xl whitespace-nowrap">QuantEdge</span>
                  <span className="md:ml-1 text-[10px] md:text-xs text-white/70 font-medium bg-white/10 px-1.5 py-0.5 rounded-md w-fit">beta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-4 bg-[#121212] text-white">
        <div className="p-4 rounded-lg mt-14 min-h-screen">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
