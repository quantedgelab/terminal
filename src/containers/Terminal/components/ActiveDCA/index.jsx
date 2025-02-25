import React from "react";
import { formatNumber } from "../../../../helper/transform";

const ActiveDCA = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-[#2D3748] rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-[#2D3748] rounded"></div>
          <div className="h-4 bg-[#2D3748] rounded"></div>
          <div className="h-4 bg-[#2D3748] rounded"></div>
        </div>
      </div>
    );
  }

  const renderDCARow = (item, type) => {
    const bgColor = type === "buys" ? "bg-[#132F21]" : "bg-[#2D1A1A]";
    const amountColor = type === "buys" ? "text-[#10B981]" : "text-[#EF4444]";
    const roundedProgress = parseFloat(item.progress).toFixed(2);

    return (
      <tr className={`${bgColor} border-b border-[#2D3748]`}>
        <td className={`px-2 py-1 text-[10px] ${amountColor}`}>${formatNumber(item.amount)}</td>
        <td className={`px-2 py-1 text-[10px] ${amountColor}`}>${formatNumber(item.rate)}</td>
        <td className="px-2 py-1 text-[10px] text-gray-300">
          {formatNumber(item.selling.amount)} {item.selling.symbol}
        </td>
        <td className="px-2 py-1 text-[10px] text-gray-300">
          {formatNumber(item.buying.amount)} {item.buying.symbol}
        </td>
        <td className="px-2 py-1 text-[10px] text-gray-300">{roundedProgress}%</td>
      </tr>
    );
  };

  const TableHeader = () => (
    <thead className="sticky top-0 bg-[#1A1A1A]">
      <tr>
        <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-300 uppercase border-b border-[#374151]">Amount</th>
        <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-300 uppercase border-b border-[#374151]">Rate/min</th>
        <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-300 uppercase border-b border-[#374151]">Selling</th>
        <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-300 uppercase border-b border-[#374151]">Bought</th>
        <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-300 uppercase border-b border-[#374151]">Progress</th>
      </tr>
    </thead>
  );

  const hasNoData = !data?.buys?.length && !data?.sells?.length;

  return (
    <div>
      {hasNoData ? (
        <div className="text-center py-8 text-gray-400 text-sm">No active DCA orders</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Buy Orders */}
          <div>
            <h4 className="text-sm font-medium text-[#10B981] mb-2">Buy Orders</h4>
            <div className="overflow-x-auto border border-[#374151] rounded-lg">
              <div className="max-h-[200px] overflow-y-auto">
                {!data?.buys?.length ? (
                  <div className="text-center py-4 text-gray-400 text-sm">No active buy orders</div>
                ) : (
                  <table className="min-w-full">
                    <TableHeader />
                    <tbody>{data.buys.map((item, index) => renderDCARow(item, "buys"))}</tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* Sell Orders */}
          <div>
            <h4 className="text-sm font-medium text-[#EF4444] mb-2">Sell Orders</h4>
            <div className="overflow-x-auto border border-[#374151] rounded-lg">
              <div className="max-h-[200px] overflow-y-auto">
                {!data?.sells?.length ? (
                  <div className="text-center py-4 text-gray-400 text-sm">No active sell orders</div>
                ) : (
                  <table className="min-w-full">
                    <TableHeader />
                    <tbody>{data.sells.map((item, index) => renderDCARow(item, "sells"))}</tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveDCA;
