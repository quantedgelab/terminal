import { useQuery } from "react-query";
import { getDCAOrders } from "../service/backend";
import { toast } from "react-toastify";

const useGetDCAOrders = (source, publicKey, useMockData, options = {}) => {
  return useQuery(["dca-orders", source], () => getDCAOrders(source, publicKey, useMockData), {
    ...options,
    enabled: !!source && options.enabled,
    onError: (error) => {
      toast.error(error?.message || "Failed to fetch DCA orders", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    },
  });
};

export default useGetDCAOrders;
