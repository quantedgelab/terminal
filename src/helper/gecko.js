/* eslint-disable no-undef */
import {
  getMint,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";

const rpc = new Connection(process.env.REACT_APP_RPC_ENDPOINT);
const base = `https://api.geckoterminal.com`;

export const pool = async (mint) => {
  const url = new URL(
    `/api/v2/networks/solana/tokens/${mint.toBase58()}/pools`,
    base
  );
  const { data } = await fetch(url, {
    headers: {
      accept: "application/json",
    },
  }).then((r) => r.json());

  for (const d of data) {
    return {
      usd: Number(d.attributes.base_token_price_usd),
      address: new PublicKey(d.attributes.address),
    };
  }

  return null;
};

export const getTokenInfo = async (mint) => {
  try {
    const { supply, decimals } = await getMint(
      rpc,
      mint,
      undefined,
      TOKEN_PROGRAM_ID
    );

    return {
      decimals,
      circulated: BigInt(supply) / BigInt(Math.pow(10, decimals)),
    };
  } catch (_e) {
    const { supply, decimals } = await getMint(
      rpc,
      mint,
      undefined,
      TOKEN_2022_PROGRAM_ID
    );

    return {
      decimals,
      circulated: BigInt(supply) / BigInt(Math.pow(10, decimals)),
    };
  }
};

export const get = async (mint) => {
  const p = await pool(mint);

  if (!p) {
    throw new PoolNotExists(mint);
  }

  const url = new URL(
    `/api/v2/networks/solana/pools/${p.address.toBase58()}/ohlcv/hour`,
    base
  );

  url.searchParams.append("limit", "1000");

  const { data } = await fetch(url, {
    headers: {
      accept: "application/json",
    },
  }).then((r) => r.json());

  const info = await getTokenInfo(mint);
  const supply = Number(info.circulated);
  const price = p.usd;
  const marketCap = p.usd * supply;
  const chart = data.attributes.ohlcv_list.map(([t, o, h, l, c, v]) => ({
    t: t * 1000,
    o: o * supply,
    h: h * supply,
    l: l * supply,
    c: c * supply,
    v,
  }));

  return {
    price,
    marketCap,
    chart,
  };
};

export class PoolNotExists extends Error {
  name = "PoolNotExists";

  constructor(mint) {
    super(`Pool for ${mint.toBase58()} doesn't exists`);
  }
}

export default {
  pool,
  get,
};
