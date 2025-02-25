import { useQuery } from "react-query";
import { getLimitOrders } from "../service/backend";
import { RQ_GET_LIMIT_ORDERS } from "../constant/core";
import { transformLimitOrder } from "../helper/transform";

function useGetLimitOrders(mintAddress, publicKey, useMockData, options) {
  const getLimitOrdersFunct = async () => {
    const res = await getLimitOrders(mintAddress, publicKey, useMockData);
    if (res.status === 200) {
      return transformLimitOrder(res.data);
    }

    return null;
  };

  return useQuery([RQ_GET_LIMIT_ORDERS, mintAddress], getLimitOrdersFunct, {
    cacheTime: 0,
    ...options,
  });
}

export default useGetLimitOrders;
