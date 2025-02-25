export const mockDCAData = {
  buys: [
    {
      selling: {
        address: "So11111111111111111111111111111111111111112",
        symbol: "SOL",
        amount: 5,
      },
      buying: {
        address: "8XtRWb4uAAJFMP4QQhoYYCWR6XXb7ybcCdiqPwz9s5WS",
        symbol: "ALON",
        amount: 2158.973957,
      },
      amount: 1299.5597878971835,
      rate: 0.9024720749285997,
      progress: "25.00000000000000000000",
    },
  ],
  sells: [
    {
      selling: {
        address: "8XtRWb4uAAJFMP4QQhoYYCWR6XXb7ybcCdiqPwz9s5WS",
        symbol: "ALON",
        amount: 2278828.137281,
      },
      buying: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        symbol: "USDC",
        amount: 0,
      },
      amount: 86492.9418983762,
      rate: 8649.294189833825,
      progress: "0.00000000000000000000000000000000",
    },
  ],
};

export const mockSummaryData = {
  dca: {
    minute: {
      inflow: 2159.7126948178056,
      outflow: 27729.237674566564,
      nett: -25569.52497974876,
    },
    hour: {
      inflow: 112319.44622674509,
      outflow: 321781.19459004456,
      nett: -209461.74836329947,
    },
    day: {
      inflow: 114153.6734946903,
      outflow: 339489.12773707224,
      nett: -225335.45424238194,
    },
    week: {
      inflow: 114153.6734946903,
      outflow: 339489.12773707224,
      nett: -225335.45424238194,
    },
  },
};
