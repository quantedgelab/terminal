const TokenGateModal = ({ isOpen, onClose }) => {
  // This component is no longer needed as we've removed the market cap limitation
  // But we'll keep it with a different message in case it's still referenced elsewhere
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

          <div className="relative bg-[#1E1E2E] text-white rounded-lg p-6 max-w-sm w-full border border-[#374151] shadow-xl">
            <h3 className="text-lg font-medium mb-4 border-b border-[#374151] pb-2">Token Information</h3>
            <p className="text-sm text-gray-300 mb-6">All tokens are now accessible without any market cap limitations.</p>

            <div className="flex justify-end">
              <button 
                onClick={onClose} 
                className="px-4 py-2 text-sm font-medium text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TokenGateModal;
