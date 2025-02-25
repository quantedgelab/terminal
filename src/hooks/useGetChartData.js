import { useQuery } from "react-query";
import { getChartData } from "../service/backend";
import { RQ_GET_CHART_DATA } from "../constant/core";
import gecko from "../helper/gecko";
import { PublicKey } from "@solana/web3.js";

function useGetChartData(input, publicKey, useMockData, options) {
  const getChartDataFunct = async () => {
    try {
      const res = await getChartData(input, publicKey, useMockData);

      if (res.status === 200) {
        return {
          ...res.data,
          ...(await gecko.get(new PublicKey(input))),
        };
      }

      return null;
    } catch (error) {
      throw error;
    }
  };

  return useQuery([RQ_GET_CHART_DATA, input], getChartDataFunct, {
    cacheTime: 0,
    ...options,
  });
}

export default useGetChartData;
