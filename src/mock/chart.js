// dataUtils.js
import * as echarts from "echarts";

export function generateOHLC(count) {
  let data = [];
  let xValue = +new Date(2011, 0, 1);
  let minute = 60 * 1000;
  let baseValue = Math.random() * 12000;
  let boxVals = new Array(4);
  let dayRange = 12;

  for (let i = 0; i < count; i++) {
    baseValue = baseValue + Math.random() * 20 - 10;
    for (let j = 0; j < 4; j++) {
      boxVals[j] = (Math.random() - 0.5) * dayRange + baseValue;
    }
    boxVals.sort();
    let openIdx = Math.round(Math.random() * 3);
    let closeIdx = Math.round(Math.random() * 2);
    if (closeIdx === openIdx) {
      closeIdx++;
    }
    let volumn = boxVals[3] * (1000 + Math.random() * 500);
    data[i] = [
      echarts.format.formatTime("yyyy-MM-dd\nhh:mm:ss", (xValue += minute)),
      +boxVals[openIdx].toFixed(2),
      +boxVals[3].toFixed(2),
      +boxVals[0].toFixed(2),
      +boxVals[closeIdx].toFixed(2),
      +volumn.toFixed(0),
      getSign(data, i, +boxVals[openIdx], +boxVals[closeIdx], 4),
    ];
  }
  return data;

  function getSign(data, dataIndex, openVal, closeVal, closeDimIdx) {
    var sign;
    if (openVal > closeVal) {
      sign = -1;
    } else if (openVal < closeVal) {
      sign = 1;
    } else {
      sign = dataIndex > 0 ? (data[dataIndex - 1][closeDimIdx] <= closeVal ? 1 : -1) : 1;
    }
    return sign;
  }
}

export function generateOHLCMock(count) {
  let data = [];
  let xValue = +new Date(2011, 0, 1);
  let minute = 60 * 1000;
  let baseValue = 10000;
  let boxVals = new Array(4);
  let dayRange = 12;

  for (let i = 0; i < count; i++) {
    baseValue = baseValue + Math.random() * 20 - 10;
    for (let j = 0; j < 4; j++) {
      boxVals[j] = (Math.random() - 0.5) * dayRange + baseValue;
    }
    boxVals.sort();
    let openIdx = Math.round(Math.random() * 3);
    let closeIdx = Math.round(Math.random() * 2);
    if (closeIdx === openIdx) {
      closeIdx++;
    }
    let volumn = boxVals[3] * (1000 + Math.random() * 500);
    data[i] = {
      t: (xValue += minute),
      o: boxVals[openIdx],
      h: boxVals[3],
      l: boxVals[0],
      c: boxVals[closeIdx],
      v: volumn,
    };
  }

  // Generate buys and sells with a limit of 30 items each
  const buys = [];
  const sells = [];

  data.forEach((item) => {
    if (buys.length < 30 && Math.random() < 0.5) {
      buys.push({
        from: {
          address: "So11111111111111111111111111111111111111112",
          symbol: "SOL",
          amount: Math.random() * 500 + 1,
        },
        to: {
          address: "3X6WNs7SoqhqcrChKmyxTaXTcRS4km1z3ARJHS32pump",
          symbol: "NINJAPUMP",
          amount: Math.random() * 1000 + 1,
        },
        trigger: item.l, // Lowest price in the chart range
        price: item.o, // Opening price
        marketCap: item.o, // Random value in range [l, h]
        amount: Math.random() * 10000,
        weight: Math.random(),
      });
    }

    if (sells.length < 30 && Math.random() < 0.5) {
      sells.push({
        from: {
          address: "3X6WNs7SoqhqcrChKmyxTaXTcRS4km1z3ARJHS32pump",
          symbol: "NINJAPUMP",
          amount: Math.random() * 10000 + 1,
        },
        to: {
          address: "So11111111111111111111111111111111111111112",
          symbol: "SOL",
          amount: Math.random() * 500 + 1,
        },
        trigger: item.h, // Highest price in the chart range
        price: item.c, // Closing price
        marketCap: item.c, // Random value in range [l, h]
        amount: Math.random() * 1000,
        weight: Math.random(),
      });
    }
  });

  const mapping = {
    inputMint: {
      name: "Ninja Pump",
      symbol: "NINJAPUMP",
      decimals: 6,
    },
    price: 0.00030957776298717464,
    marketCap: 309577.5400911853,
    chart: data,
    buys: buys.slice(0, 30),
    sells: sells.slice(0, 30),
  };

  return mapping;
}

export function generateLimitOrderMock(count) {
  let data = [];
  let xValue = +new Date(2011, 0, 1);
  let minute = 60 * 1000;
  let baseValue = 10000;
  let boxVals = new Array(4);
  let dayRange = 12;

  for (let i = 0; i < count; i++) {
    baseValue = baseValue + Math.random() * 20 - 10;
    for (let j = 0; j < 4; j++) {
      boxVals[j] = (Math.random() - 0.5) * dayRange + baseValue;
    }
    boxVals.sort();
    let openIdx = Math.round(Math.random() * 3);
    let closeIdx = Math.round(Math.random() * 2);
    if (closeIdx === openIdx) {
      closeIdx++;
    }
    let volumn = boxVals[3] * (1000 + Math.random() * 500);
    data[i] = {
      t: (xValue += minute),
      o: boxVals[openIdx],
      h: boxVals[3],
      l: boxVals[0],
      c: boxVals[closeIdx],
      v: volumn,
    };
  }

  // Generate buys and sells with a limit of 30 items each
  const buys = [];
  const sells = [];

  data.forEach((item) => {
    if (buys.length < 30 && Math.random() < 0.5) {
      buys.push({
        from: {
          address: "So11111111111111111111111111111111111111112",
          symbol: "SOL",
          amount: Math.random() * 500 + 1,
        },
        to: {
          address: "3X6WNs7SoqhqcrChKmyxTaXTcRS4km1z3ARJHS32pump",
          symbol: "NINJAPUMP",
          amount: Math.random() * 1000 + 1,
        },
        trigger: item.l, // Lowest price in the chart range
        price: item.o, // Opening price
        marketCap: item.o, // Random value in range [l, h]
        amount: Math.random() * 10000,
        weight: Math.random(),
      });
    }

    if (sells.length < 30 && Math.random() < 0.5) {
      sells.push({
        from: {
          address: "3X6WNs7SoqhqcrChKmyxTaXTcRS4km1z3ARJHS32pump",
          symbol: "NINJAPUMP",
          amount: Math.random() * 10000 + 1,
        },
        to: {
          address: "So11111111111111111111111111111111111111112",
          symbol: "SOL",
          amount: Math.random() * 500 + 1,
        },
        trigger: item.h, // Highest price in the chart range
        price: item.c, // Closing price
        marketCap: item.c, // Random value in range [l, h]
        amount: Math.random() * 1000,
        weight: Math.random(),
      });
    }
  });

  const mapping = {
    buys: buys.slice(0, 30),
    sells: sells.slice(0, 30),
  };

  return mapping;
}
