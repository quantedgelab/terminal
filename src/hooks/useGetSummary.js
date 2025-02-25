import { useQuery } from "react-query";
import { getSummary } from "../service/backend";
import { toast } from "react-toastify";

const useGetSummary = (source, publicKey, useMockData, options = {}) => {
  return useQuery(["summary", source], () => getSummary(source, publicKey, useMockData), {
    ...options,
    enabled: !!source && options.enabled,
    onError: (error) => {
      toast.error(error?.message || "Failed to fetch summary data", {
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

export default useGetSummary;
