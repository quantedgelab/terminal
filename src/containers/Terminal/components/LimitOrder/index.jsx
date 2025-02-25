import React from "react";
import { Oval } from "react-loader-spinner";

const LimitOrder = ({ limitOrdersData, isLoading, hilightedOrder, setHiglightedOrder, currentPrice }) => {
  if (!isLoading && !limitOrdersData) {
    return (
      <div className="flex justify-center items-center w-full h-[300px] md:h-[500px] bg-[#1A1A1A] text-gray-300 text-xs">
        <p>No data</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[300px] md:h-[500px] bg-[#1A1A1A]">
        <Oval height={30} width={30} color="#3B82F6" wrapperStyle={{}} wrapperClass="" visible={true} ariaLabel="oval-loading" secondaryColor="#2563EB" strokeWidth={2} strokeWidthSecondary={2} />
      </div>
    );
  }

  // Define column widths to ensure alignment
  const columnWidths = {
    price: "w-[20%]",
    amount: "w-[20%]",
    from: "w-[20%]",
    to: "w-[20%]",
    at: "w-[20%]"
  };

  return (
    <div id="limit-orders-containers" className="flex flex-col text-[10px]">
      {/* Sell Orders - dengan scroll dari bawah */}
      <div className="relative">
        {/* Header tetap di atas */}
        <table className="w-full text-[10px] text-left rtl:text-right table-fixed">
          <thead className="text-[10px] text-gray-300 border-b border-[#374151] sticky top-0 bg-[#1A1A1A] z-10">
            <tr>
              <th scope="col" className={`px-1 py-1 ${columnWidths.price}`}>Price</th>
              <th scope="col" className={`px-1 py-1 ${columnWidths.amount}`}>Amount</th>
              <th scope="col" className={`px-1 py-1 ${columnWidths.from}`}>From</th>
              <th scope="col" className={`px-1 py-1 ${columnWidths.to}`}>To</th>
              <th scope="col" className={`px-1 py-1 ${columnWidths.at}`}>At</th>
            </tr>
          </thead>
        </table>

        {/* Body dengan scroll dari bawah */}
        <div className="overflow-auto max-h-[250px] flex flex-col-reverse">
          <table className="w-full text-[10px] text-left rtl:text-right table-fixed">
            {limitOrdersData?.sells.length === 0 ? (
              <div className="flex justify-center items-center w-full h-[100px] bg-[#1A1A1A]">
                <p className="text-[10px] text-gray-400">No sell orders</p>
              </div>
            ) : (
              <tbody className="border-collapse">
                {limitOrdersData.sells.map((sell, index) => (
                  <tr key={index} onClick={() => setHiglightedOrder(sell.mcap)} className={`border-b border-[#2D3748] text-[#EF4444] text-[10px] hover:bg-[#2D1A1A] cursor-pointer ${hilightedOrder === sell.mcap ? "bg-[#3A2426]" : ""}`}>
                    <td className={`px-1 py-1 ${columnWidths.price}`}>{sell.price}</td>
                    <td className={`px-1 py-1 ${columnWidths.amount}`}>{`$${sell.amount}`}</td>
                    <td className={`px-1 py-1 ${columnWidths.from}`}>{sell.from}</td>
                    <td className={`px-1 py-1 ${columnWidths.to}`}>{sell.to}</td>
                    <td className={`px-1 py-1 ${columnWidths.at}`}>{sell.trigger}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {/* Current Price */}
      <div className="flex justify-between py-2 text-[14px] text-yellow-400 font-bold bg-[#1A1A1A] border-y border-[#374151]">
        <p>{currentPrice.toFixed(5)}</p>
        <p>CURRENT PRICE</p>
      </div>

      {/* Buy Orders */}
      <div className="relative overflow-auto max-h-[250px]">
        <table className="w-full text-[10px] text-left rtl:text-right table-fixed">
          {limitOrdersData?.buys.length === 0 ? (
            <div className="flex justify-center items-center w-full h-[100px] bg-[#1A1A1A]">
              <p className="text-[10px] text-gray-400">No buy orders</p>
            </div>
          ) : (
            <tbody className="border-collapse">
              {limitOrdersData.buys.map((buy, index) => (
                <tr key={index} onClick={() => setHiglightedOrder(buy.mcap)} className={`border-b border-[#2D3748] text-[#10B981] text-[10px] hover:bg-[#132F21] cursor-pointer ${hilightedOrder === buy.mcap ? "bg-[#1C3F2C]" : ""}`}>
                  <td className={`px-1 py-1 ${columnWidths.price}`}>{buy.price}</td>
                  <td className={`px-1 py-1 ${columnWidths.amount}`}>{`$${buy.amount}`}</td>
                  <td className={`px-1 py-1 ${columnWidths.from}`}>{buy.from}</td>
                  <td className={`px-1 py-1 ${columnWidths.to}`}>{buy.to}</td>
                  <td className={`px-1 py-1 ${columnWidths.at}`}>{buy.trigger}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default LimitOrder;
