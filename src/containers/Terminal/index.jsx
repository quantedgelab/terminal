import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RequiredLabel from "../../components/RequiredLabel";
import CandlestickChart from "./components/CandleStickChart";
import LimitOrder from "./components/LimitOrder";
import useGetChartData from "../../hooks/useGetChartData";
import useGetLimitOrders from "../../hooks/useGetLimitOrders";
import ActiveDCA from "./components/ActiveDCA";
import Summary from "./components/Summary";
import useGetDCAOrders from "../../hooks/useGetDCAOrders";
import useGetSummary from "../../hooks/useGetSummary";
import TokenGateModal from "../../components/TokenGateModal";
import AnalyzeTokenModal from "../../components/AnalyzeTokenModal";
import { useWallet } from "@solana/wallet-adapter-react";

// const mockSource = "3X6WNs7SoqhqcrChKmyxTaXTcRS4km1z3ARJHS32pump";

const NinjaTerminal = () => {
  const [source, setSource] = useState("6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN");
  const [inputValue, setInputValue] = useState("6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN");
  const [errors, setErrors] = useState("");
  const [hilightedOrder, setHiglightedOrder] = useState(null);
  const [useMockData, setUseMockData] = useState(false);
  const [showTokenGateModal, setShowTokenGateModal] = useState(false);
  const [showAnalyzeModal, setShowAnalyzeModal] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const { publicKey } = useWallet();

  const {
    data: chartdata,
    isLoading: loadingChartData,
    isFetching: fetchingChartData,
    refetch: refetchChartData,
  } = useGetChartData(source, publicKey, useMockData, {
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60,
    enabled: !!source,
    onError: (e) => {
      const errorMessage = e?.response?.data?.errors[0].message || "Failed To Get Chart Data";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    },
  });

  const {
    data: newTokenData,
    isLoading: loadingNewToken,
    isFetching: fetchingNewToken,
  } = useGetChartData(inputValue !== source ? inputValue : null, publicKey, useMockData, {
    enabled: !!inputValue && inputValue !== source,
    refetchOnWindowFocus: false,
  });

  const {
    data: limitOrdersData,
    isLoading: loadingLimitOrders,
    isFetching: fetchingLimitOrders,
  } = useGetLimitOrders(source, publicKey, useMockData, {
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60,
    enabled: !!source,
    onError: (e) => {
      const errorMessage = "Failed To Get Limit Order Data";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    },
  });

  const { data: dcaData, isLoading: loadingDCA } = useGetDCAOrders(source, publicKey, useMockData, {
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60,
    enabled: !!source,
  });

  const { data: summaryData, isLoading: loadingSummary } = useGetSummary(source, publicKey, useMockData, {
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60,
    enabled: !!source,
  });

  const handleSubmit = async () => {
    setErrors("");

    // validate
    if (!inputValue) {
      setErrors({ input: "Please input mint address" });
      return;
    }

    // Jika masih loading validasi, tunggu dulu
    if (loadingNewToken || fetchingNewToken) {
      return;
    }

    // Market cap limitation removed
    setSource(inputValue);
  };

  const handleAnalyzeToken = (tokenAddress) => {
    setInputValue(tokenAddress);
    setSource(tokenAddress);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <>
      {/* Token Gate Modal */}
      <TokenGateModal isOpen={showTokenGateModal} onClose={() => setShowTokenGateModal(false)} />
      
      {/* Analyze Token Modal */}
      <AnalyzeTokenModal 
        isOpen={showAnalyzeModal} 
        onClose={() => setShowAnalyzeModal(false)} 
        onSubmit={handleAnalyzeToken}
      />

      <div className="terminal-container max-w-[1800px] mx-auto px-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl md:text-2xl font-semibold text-white">Quant Terminal</h1>
            <button
              onClick={() => setShowAnalyzeModal(true)}
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
              className={`flex items-center justify-center gap-2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] hover:from-[#F97316] hover:to-[#F59E0B] text-white font-medium h-[38px] px-6 rounded-lg shadow-lg transition-all duration-300 transform ${buttonHover ? 'scale-105 shadow-xl' : ''}`}
              style={{
                animation: "pulse 2s infinite",
                boxShadow: buttonHover ? "0 0 15px rgba(249, 115, 22, 0.6)" : "0 0 10px rgba(249, 115, 22, 0.3)"
              }}
            >
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
              Analyze Token
            </button>
          </div>
        </div>

        {/* Chart and Limit Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <div className="lg:col-span-3 bg-[#1E1E2E] p-5 rounded-lg border border-[#374151] shadow-lg min-h-[500px]">
            <CandlestickChart 
              chartdata={chartdata} 
              isLoading={loadingChartData || (!chartdata && fetchingChartData)} 
              limitOrdersData={limitOrdersData} 
              hilightedOrder={hilightedOrder} 
            />
          </div>
          <div className="lg:col-span-2 bg-[#1E1E2E] p-5 rounded-lg border border-[#374151] shadow-lg min-h-[500px]">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-[#374151] pb-2">Limit Orders</h2>
            <div className="text-xs">
              <LimitOrder
                limitOrdersData={limitOrdersData}
                isLoading={loadingLimitOrders || (!limitOrdersData && fetchingLimitOrders)}
                hilightedOrder={hilightedOrder}
                setHiglightedOrder={setHiglightedOrder}
                currentPrice={chartdata?.price || 0}
              />
            </div>
          </div>
        </div>

        {/* Trading Box - Coming Soon - Moved below chart & limit orders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Buy & Sell Box */}
          <div className="md:col-span-2 relative rounded-lg border border-[#374151] bg-[#1E1E2E] p-4 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <span className="text-white text-2xl font-bold opacity-70 transform -rotate-12">COMING SOON</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Buy Button */}
              <div className="flex flex-col gap-2">
                <button className="w-full py-3 bg-[#10B981] text-white font-medium rounded-lg opacity-50 cursor-not-allowed">
                  Buy
                </button>
                <div className="space-y-2">
                  <div className="bg-[#2D3748] rounded-lg p-3">
                    <label className="block text-xs text-gray-400 mb-1">Amount</label>
                    <input 
                      type="text" 
                      disabled
                      className="w-full bg-[#1A1A1A] border border-[#374151] rounded p-2 text-white"
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="bg-[#2D3748] rounded-lg p-3">
                    <label className="block text-xs text-gray-400 mb-1">Price</label>
                    <input 
                      type="text" 
                      disabled
                      className="w-full bg-[#1A1A1A] border border-[#374151] rounded p-2 text-white"
                      placeholder="$100"
                    />
                  </div>
                </div>
              </div>
              
              {/* Sell Button */}
              <div className="flex flex-col gap-2">
                <button className="w-full py-3 bg-[#EF4444] text-white font-medium rounded-lg opacity-50 cursor-not-allowed">
                  Sell
                </button>
                <div className="bg-[#2D3748] rounded-lg p-3">
                  <label className="block text-xs text-gray-400 mb-1">Swap</label>
                  <div className="flex items-center justify-center h-[100px] bg-[#1A1A1A] border border-[#374151] rounded text-gray-400">
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* AI Trading Box */}
          <div className="relative rounded-lg border border-[#374151] bg-[#1E1E2E] p-4 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <span className="text-white text-2xl font-bold opacity-70 transform -rotate-12">COMING SOON</span>
            </div>
            
            <div className="flex flex-col h-full">
              <h3 className="text-white font-medium mb-2">AI Assisted Trading</h3>
              <p className="text-xs text-gray-400 mb-2">Set trading conditions and AI executes trade when conditions are met.</p>
              <div className="bg-[#2D3748] rounded-lg p-3 flex-grow">
                <div className="bg-[#1A1A1A] border border-[#374151] rounded p-3 h-full flex items-center justify-center text-gray-400">
                  <p className="text-center">Chat AI Assistant</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-[#1E1E2E] p-5 rounded-lg border border-[#374151] shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-[#374151] pb-2">Summary</h2>
            <div className="text-white">
              <Summary data={summaryData} isLoading={loadingSummary} />
            </div>
          </div>
          <div className="bg-[#1E1E2E] p-5 rounded-lg border border-[#374151] shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-[#374151] pb-2">Active DCA</h2>
            <div className="text-white">
              <ActiveDCA data={dcaData} isLoading={loadingDCA} />
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalSlide {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(249, 115, 22, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(249, 115, 22, 0);
          }
        }
      `}</style>
    </>
  );
};

export default NinjaTerminal;
