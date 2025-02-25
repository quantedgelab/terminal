import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import dayjs from "dayjs";
import millify from "millify";

export const lamportToSol = (lamport) => {
  try {
    if (isNaN(lamport)) {
      throw Error;
    }
    return lamport / LAMPORTS_PER_SOL;
  } catch (error) {
    return 0;
  }
};

export const solToLamport = (sol) => {
  try {
    if (isNaN(sol)) {
      throw Error;
    }
    return sol * LAMPORTS_PER_SOL;
  } catch (error) {
    return 0;
  }
};

export const getQuoteMapping = ({ contract, targetTradingVolume, timeframeInSecond, durationInSecond, transactionPerMinute, agents, holders, buyPerWalletHolding, referral }, owner) => {
  return {
    owner,
    contract,
    targetVolumeInLamports: parseInt(targetTradingVolume * LAMPORTS_PER_SOL),
    timeframeInSecond,
    durationInSecond,
    transactionPerMinute,
    agents,
    holders: holders || 0,
    buyPerWalletHolding: parseInt(buyPerWalletHolding * LAMPORTS_PER_SOL),
    referral: referral || "",
  };
};

export const formatSol = (lamports) => {
  const sol = lamports / LAMPORTS_PER_SOL;

  // Handle 0 case
  if (sol === 0) return "0 SOL";

  // If it's a whole number, don't show decimals
  if (Number.isInteger(sol)) {
    return `${sol.toLocaleString()} SOL`;
  }

  // For decimal numbers, trim unnecessary trailing zeros
  const formatted = sol.toFixed(4).replace(/\.?0+$/, "");
  return `${formatted} SOL`;
};

export const formatNumber = (number) => {
  if (!number && number !== 0) return "-";

  // Format angka dengan 2 desimal dan pemisah ribuan
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export const transformChartData = (sample) => {
  if (sample.length === 0) return { time: [], data: [] };

  const data = [];

  for (let i = 0; i < sample.length; i++) {
    const { t, o, c, l, h, v } = sample[i];

    // Format time
    let formattedTime = dayjs(t).format("D MMM YY\nHH:mm:ss");

    const formatedOpen = o.toFixed(3);
    const formatedClose = c.toFixed(3);
    const formatedLow = l.toFixed(3);
    const formatedHihg = h.toFixed(3);
    const formatedVolume = v.toFixed(3);

    // Generate sign value
    let sign = 0;
    if (o < c) {
      sign = 1; // price up
    } else if (o > c) {
      sign = -1; // price down
    } else {
      sign = 0; // price stable
    }

    data.push([formattedTime, formatedOpen, formatedHihg, formatedLow, formatedClose, formatedVolume, sign]);
  }

  return data;
};

export const transformLimitOrder = (limitOrder) => {
  const transformItem = (item) => {
    const formatedFromAmount = millify(item.from.amount);
    const formatedToAmount = millify(item.to.amount);
    const formatedTrigger = millify(item.trigger);
    const formattedAmount = millify(item.amount);

    return {
      price: `$${item.price.toFixed(5)}`,
      amount: formattedAmount,
      from: `${formatedFromAmount} ${item.from.symbol}`,
      to: `${formatedToAmount} ${item.to.symbol}`,
      trigger: `${item.trigger.toFixed(3)}`,
      mcap: item.marketCap,
      weight: item.weight,
    };
  };

  return {
    buys: limitOrder.buys.map(transformItem).sort((a, b) => parseFloat(a.price) - parseFloat(b.price)),
    sells: limitOrder.sells.map(transformItem).sort((a, b) => parseFloat(a.price) - parseFloat(b.price)),
  };
};
