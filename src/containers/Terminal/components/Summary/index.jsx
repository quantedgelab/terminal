import React from "react";
import { formatNumber } from "../../../../helper/transform";

const DCAOrderSummary = ({ data = {} }) => {
  const { minute = {}, hour = {}, day = {}, week = {} } = data || {};

  const renderSummaryRow = (title, unit, data = {}) => {
    const { inflow = 0, outflow = 0, nett = 0 } = data;
    // Outflow selalu dianggap negatif
    const adjustedOutflow = outflow > 0 ? -outflow : outflow;
    const getFlowColor = (value) => (value >= 0 ? "text-[#10B981]" : "text-[#EF4444]");

    // Helper untuk format angka dengan tanda minus di depan
    const formatWithSign = (value) => {
      return value >= 0 ? `$${formatNumber(value)}` : `-$${formatNumber(Math.abs(value))}`;
    };

    return (
      <tr className="border-b border-[#2D3748]">
        <td className="whitespace-nowrap px-2 py-1 text-[10px] text-gray-300">$/{unit}</td>
        <td className="whitespace-nowrap px-2 py-1 text-[10px] text-[#10B981]">{formatWithSign(inflow)}</td>
        <td className={`whitespace-nowrap px-2 py-1 text-[10px] ${getFlowColor(nett)}`}>{formatWithSign(nett)}</td>
        <td className="whitespace-nowrap px-2 py-1 text-[10px] text-[#EF4444]">{formatWithSign(adjustedOutflow)}</td>
      </tr>
    );
  };

  return (
    <div>
      <h3 className="text-base font-semibold mb-4 text-white">Active DCA</h3>
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#1A1A1A]">
                  <th className="whitespace-nowrap px-2 py-1 text-left text-[10px] font-medium text-gray-300 uppercase border-b border-[#374151]">Volume</th>
                  <th className="whitespace-nowrap px-2 py-1 text-left text-[10px] font-medium text-gray-300 uppercase border-b border-[#374151]">Inflow</th>
                  <th className="whitespace-nowrap px-2 py-1 text-left text-[10px] font-medium text-gray-300 uppercase border-b border-[#374151]">Netflow</th>
                  <th className="whitespace-nowrap px-2 py-1 text-left text-[10px] font-medium text-gray-300 uppercase border-b border-[#374151]">Outflow</th>
                </tr>
              </thead>
              <tbody>
                {renderSummaryRow(1000, "min", minute)}
                {renderSummaryRow(5000, "hour", hour)}
                {renderSummaryRow(10000, "day", day)}
                {renderSummaryRow(50000, "week", week)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const LimitOrderSummary = ({ data = [] }) => {
  // Helper untuk format angka dengan tanda minus di depan
  const formatWithSign = (value) => {
    return value >= 0 ? `$${formatNumber(value)}` : `-$${formatNumber(Math.abs(value))}`;
  };

  return (
    <div className="mt-6">
      <h3 className="text-base font-semibold mb-4 text-white">Active Limit Orders</h3>
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            {data.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">No active limit orders</div>
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr className="bg-[#1A1A1A]">
                    <th className="whitespace-nowrap px-2 py-1 text-left text-[10px] font-medium text-gray-300 uppercase border-b border-[#374151]">Range From Price</th>
                    <th className="whitespace-nowrap px-2 py-1 text-left text-[10px] font-medium text-gray-300 uppercase border-b border-[#374151]">Buys</th>
                    <th className="whitespace-nowrap px-2 py-1 text-left text-[10px] font-medium text-gray-300 uppercase border-b border-[#374151]">Net Pressure</th>
                    <th className="whitespace-nowrap px-2 py-1 text-left text-[10px] font-medium text-gray-300 uppercase border-b border-[#374151]">Sells</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    const getValueColor = (value) => (value >= 0 ? "text-[#10B981]" : "text-[#EF4444]");
                    // Sells selalu dianggap negatif
                    const adjustedSell = item.sell > 0 ? -item.sell : item.sell;

                    return (
                      <tr key={index} className="border-b border-[#2D3748]">
                        <td className="whitespace-nowrap px-2 py-1 text-[10px] text-gray-300">
                          {item.from}% to +{item.to}%
                        </td>
                        <td className="whitespace-nowrap px-2 py-1 text-[10px] text-[#10B981]">{formatWithSign(item.buy)}</td>
                        <td className={`whitespace-nowrap px-2 py-1 text-[10px] ${getValueColor(item.nett)}`}>{formatWithSign(item.nett)}</td>
                        <td className="whitespace-nowrap px-2 py-1 text-[10px] text-[#EF4444]">{formatWithSign(adjustedSell)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Summary = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        {/* Summary Title Loading */}
        <div className="h-5 bg-[#2D3748] rounded w-1/6 mb-6"></div>
        {/* DCA Summary Loading */}
        <div>
          <div className="h-4 bg-[#2D3748] rounded w-1/4 mb-4"></div>
          <div className="h-48 bg-[#2D3748] rounded"></div>
        </div>
        {/* Limit Orders Loading */}
        <div>
          <div className="h-4 bg-[#2D3748] rounded w-1/4 mb-4"></div>
          <div className="h-48 bg-[#2D3748] rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6">
        <DCAOrderSummary data={data?.dca} />
        <LimitOrderSummary data={data?.limit || []} />
      </div>
    </div>
  );
};

export default Summary;
