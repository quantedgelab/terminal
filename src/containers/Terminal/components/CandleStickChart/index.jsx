import React, { useEffect, useState, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { Oval } from "react-loader-spinner";

import { transformChartData } from "../../../../helper/transform";

import millify from "millify";

// Updated colors for better contrast in dark mode
const upColor = "#00ff7f"; // Brighter green
const upBorderColor = "#00cc66"; // Slightly darker green for border
const downColor = "#ff3333"; // Brighter red
const downBorderColor = "#cc0000"; // Slightly darker red for border

const CandleStickChart = ({ chartdata, isLoading, limitOrdersData, hilightedOrder }) => {
  const [ohlcInfo, setOhlcInfo] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartdata) {
      const data = transformChartData(chartdata.chart);

      const lastCandle = data[0];
      setOhlcInfo({
        o: lastCandle[1],
        h: lastCandle[2],
        l: lastCandle[3],
        c: lastCandle[4],
        v: lastCandle[5],
      });

      const limitOrderMarkerLines = [];

      if (limitOrdersData) {
        Object.entries(limitOrdersData).forEach(([key, value]) => {
          value.forEach((val) => {
            const weightInDecimal = val.weight / 100;
            const width = 1 + weightInDecimal * 7;
            const opacity = weightInDecimal <= 0.5 ? weightInDecimal * 2 : 1;

            limitOrderMarkerLines.push({
              yAxis: val.mcap,
              lineStyle: {
                color: hilightedOrder === val.mcap ? "#3B82F6" : key === "buys" ? "#10B981" : "#EF4444",
                width: width,
                type: "solid",
                cap: "round",
                opacity: hilightedOrder === val.mcap ? 1 : Math.max(0.2, opacity),
              },
              label: {
                show: hilightedOrder === val.mcap,
                position: "end",
                color: "white",
                fontSize: "10px",
                backgroundColor: "#1A1A1A",
                padding: [2, 4],
                borderRadius: 2,
              },
            });
          });
        });
      }

      const newOptions = {
        backgroundColor: 'transparent',
        dataset: {
          source: data.reverse(),
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false,
            type: "cross",
            lineStyle: {
              color: "#3B82F6",
              width: 2,
              opacity: 1,
            },
          },
          backgroundColor: "#1A1A1A",
          borderColor: "#374151",
          textStyle: {
            color: "#E5E7EB"
          },
          formatter: function (params) {
            const item = params[0];
            if (item) {
              const data = item.data;
              return `
                <div style="font-size: 12px;">
                  <div>Date: ${data[0]}</div>
                  <div>Open: ${data[1]}</div>
                  <div>Close: ${data[4]}</div>
                  <div>Low: ${data[3]}</div>
                  <div>High: ${data[2]}</div>
                  <div>Volume: ${millify(data[5])}</div>
                </div>
              `;
            }
            return '';
          }
        },
        grid: [
          {
            left: 10,
            right: 50,
            top: 15,
            bottom: 30,
            backgroundColor: 'rgba(26, 26, 26, 0.2)',
            borderColor: '#374151',
            show: true
          },
        ],
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: { 
              onZero: false,
              lineStyle: {
                color: '#4B5563'
              }
            },
            splitLine: { 
              show: false 
            },
            min: "dataMin",
            max: "dataMax",
            axisLabel: {
              color: '#9CA3AF',
              fontSize: 10
            }
          }
        ],
        yAxis: [
          {
            scale: true,
            position: "right",
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(30, 30, 46, 0.2)', 'rgba(26, 26, 26, 0.2)']
              }
            },
            axisLine: {
              lineStyle: {
                color: '#4B5563'
              }
            },
            axisLabel: {
              formatter: (value) => millify(value),
              color: '#9CA3AF',
              fontSize: 10
            },
            splitLine: {
              lineStyle: {
                color: '#2D3748',
                opacity: 0.5
              }
            }
          }
        ],
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            filterMode: 'filter',
            start: 0,
            end: 100
          }
        ],
        series: [
          {
            type: "candlestick",
            itemStyle: {
              color: upColor,
              color0: downColor,
              borderColor: upBorderColor,
              borderColor0: downBorderColor,
            },
            markLine: {
              symbol: ["none", "none"],
              silent: true,
              data: limitOrderMarkerLines,
              label: {
                normal: {
                  show: false,
                },
              },
            },
            encode: {
              x: 0,
              y: [1, 4, 3, 2],
            },
          },
        ],
      };

      setChartOptions(newOptions);
    } else {
      setChartOptions(null);
    }
  }, [chartdata, limitOrdersData, hilightedOrder]);

  useEffect(() => {
    if (chartOptions && chartRef.current) {
      const chartInstance = chartRef.current.getEchartsInstance();

      chartInstance.on("mouseover", (params) => {
        if (params.componentType === "series") {
          const { data } = params;

          setOhlcInfo({
            o: data[1],
            h: data[2],
            l: data[3],
            c: data[4],
            v: data[5],
          });
        }
      });

      chartInstance.on("mouseout", () => {
        // document.getElementById("ohlc-info").innerHTML = "";
      });
    }
  }, [chartOptions]);

  if (!isLoading && !chartOptions) {
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

  return (
    <div>
      <div className="w-full h-[300px] md:h-[500px]">
        {/* token meta */}
        {chartdata?.inputMint?.logo && (
          <div className="w-full flex gap-2 items-center mb-2">
            <div id="token-icon">
              <img src={chartdata.inputMint.logo} alt={chartdata.inputMint.symbol} width={40} height={40} className="rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-white">{chartdata.inputMint.symbol}</p>
                <p className="font-normal text-gray-400 text-xs">{chartdata.inputMint.name}</p>
              </div>

              <p className="font-normal text-gray-400 text-xs">
                <span className="font-bold text-white">O</span>
                <span>{`:${ohlcInfo?.o || ""} `}</span>
                <span className="font-bold text-white">H</span>
                <span>{`:${ohlcInfo?.h || ""} `}</span>
                <span className="font-bold text-white">L</span>
                <span>{`:${ohlcInfo?.l || ""} `}</span>
                <span className="font-bold text-white">C</span>
                <span>{`:${ohlcInfo?.c || ""} `}</span>
              </p>
              <p className="font-normal text-gray-400 text-xs">
                <span className="font-bold text-white">Volume</span>
                <span>{`:${ohlcInfo?.v || ""} `}</span>
              </p>
            </div>
          </div>
        )}

        <ReactECharts option={chartOptions} style={{ height: "100%", width: "100%" }} ref={chartRef} />
      </div>
    </div>
  );
};

export default CandleStickChart;
