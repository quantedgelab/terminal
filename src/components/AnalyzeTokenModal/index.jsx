import React, { useState } from "react";

const AnalyzeTokenModal = ({ isOpen, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!inputValue) {
      setError("Please input token address");
      return;
    }
    
    onSubmit(inputValue);
    setInputValue("");
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 overflow-y-auto" style={{ animation: "fadeIn 0.3s ease-out" }}>
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

          <div 
            className="relative bg-[#1E1E2E] text-white rounded-lg p-6 max-w-md w-full border border-[#374151] shadow-xl"
            style={{ animation: "modalSlide 0.3s ease-out" }}
          >
            <h3 className="text-lg font-medium mb-4 border-b border-[#374151] pb-2">Analyze Token</h3>
            
            <div className="mb-4">
              <label htmlFor="token-address" className="block text-sm font-medium text-gray-300 mb-1">
                Token Address
              </label>
              <input
                type="text"
                id="token-address"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setError("");
                }}
                placeholder="Enter token address"
                className={`w-full text-sm border h-[38px] px-3 bg-[#1A1A1A] text-white border-[#374151] rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:outline-none ${error ? "border-red-500" : "border-[#374151]"}`}
              />
              {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>

            <div className="flex justify-end space-x-3">
              <button 
                onClick={onClose} 
                className="px-4 py-2 text-sm font-medium text-gray-300 bg-[#2D3748] hover:bg-[#374151] rounded-md transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit} 
                className="px-4 py-2 text-sm font-medium text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-md transition-colors"
              >
                Analyze
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AnalyzeTokenModal; 