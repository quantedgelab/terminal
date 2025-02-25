import axios from "axios";
import axiosInstance from "../config/axios";
import { generateOHLCMock } from "../mock/chart";
import { mockDCAData, mockSummaryData } from "../mock/dca";

export const getQuote = async (payload) => {
  try {
    const endpoint = `${process.env.REACT_APP_BACKEND_ENDPOINT}/order/quote`;
    const response = await axios.post(endpoint, payload);
    return response;
  } catch (error) {
    if (error.response) {
      if (error.response.data?.errors) {
        const messages = error.response.data.errors.map((err) => `${err.field}: ${err.message}`).join("\n");
        error.response.data.message = messages;
      }
      throw error;
    }
  }
};

export const getTokemMetadata = (address) => {
  const endpoint = `${process.env.REACT_APP_BACKEND_ENDPOINT}/token/${address}/metadata`;
  return axios.get(endpoint);
};

export const getOrderDetail = (id) => {
  return axiosInstance.get(`/order/${id}`);
};

export const getActiveWallets = (id) => {
  return axiosInstance.get(`/order/${id}/agents`);
};

export const getAllWallets = (id) => {
  return axiosInstance.get(`/order/${id}/wallets`);
};

export const getOrders = (ownerId, page) => {
  return axiosInstance.get("/order", {
    params: {
      owner: ownerId,
      page: page ? page : 1,
    },
  });
};

export const getTransactions = (id, page, querySearch) => {
  return axiosInstance.get(`/order/${id}/transactions`, {
    params: {
      page: page ? page : 1,
      search: querySearch,
    },
  });
};

export const startPauseOrder = async (id, type) => {
  try {
    const res = await axiosInstance.put(`/order/${id}/${type}`);
    if (res.status === 204) {
      return { code: "success" };
    }
    throw new Error(res?.data?.message || "failed");
  } catch (error) {
    return { code: error?.message || "failed" };
  }
};

export const requestOrder = async (payload) => {
  try {
    const response = await axiosInstance.post("/order/request", {
      ...payload,
      referral: payload.referral || "",
    });
    return response.data;
  } catch (error) {
    console.error("Error requesting order:", error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const signOrder = async (payload) => {
  try {
    const response = await axiosInstance.put("/order/sign", payload);
    return response.data;
  } catch (error) {
    console.error("Error signing order:", error);
    return {
      code: error?.response?.data?.message || "Failed to sign order",
    };
  }
};

export const getReferralCode = async (address) => {
  try {
    const endpoint = `${process.env.REACT_APP_BACKEND_ENDPOINT}/referral`;
    const response = await axios.post(endpoint, { address });
    if (!response.data?.code) {
      throw new Error("Invalid referral code response");
    }
    return response.data;
  } catch (error) {
    console.error("Error getting referral code:", error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to get referral code");
  }
};

export const getReferralCodeStatus = async (code) => {
  const endpoint = `${process.env.REACT_APP_BACKEND_ENDPOINT}/referral/${code}`;
  const response = await axios.get(endpoint);
  return response.data;
};

export const login = async (publicKey) => {
  try {
    const endpoint = `${process.env.REACT_APP_BACKEND_ENDPOINT}/auth/login`;
    const response = await axios.post(endpoint, { publicKey });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const withdrawSol = async (orderId, payload) => {
  try {
    const response = await axiosInstance.post(`/order/${orderId}/withdrawal/sol`, payload);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const withdrawToken = async (orderId, payload) => {
  try {
    const response = await axiosInstance.post(`/order/${orderId}/withdrawal/token`, payload);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const getBundleQuote = async (payload) => {
  try {
    const endpoint = `${process.env.REACT_APP_BACKEND_ENDPOINT}/bundle/quote`;
    const response = await axios.post(endpoint, payload);
    return response;
  } catch (error) {
    if (error.response.status === 422 && error.response.data.errors[0].message === "The owner field must be defined") {
      throw new Error("Please connect your wallet");
    }
    if (error.response) {
      if (error.response.data?.errors) {
        const messages = error.response.data.errors.map((err) => `${err.field}: ${err.message}`).join("\n");
        error.response.data.message = messages;
      }
      throw error;
    }
  }
};

export const requestBundle = async (payload) => {
  try {
    const response = await axiosInstance.post("/bundle/request", {
      ...payload,
      referral: payload.referral || "",
    });
    return response.data;
  } catch (error) {
    console.error("Error requesting bundle:", error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const getBundles = (ownerId, page) => {
  return axiosInstance.get("/bundle", {
    params: {
      owner: ownerId,
      page: page ? page : 1,
    },
  });
};

export const getBundleDetail = (id) => {
  return axiosInstance.get(`/bundle/${id}`);
};

export const getBundleWallets = (id, order, sort) => {
  const params = new URLSearchParams();
  if (order) params.append("order", order);
  if (sort) params.append("sort", sort);

  return axiosInstance.get(`/bundle/${id}/wallets${params.toString() ? `?${params.toString()}` : ""}`);
};

export const withdrawBundleToken = async (bundleId, payload) => {
  try {
    const response = await axiosInstance.post(`/bundle/${bundleId}/withdraw/token`, payload);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const exportBundleWallets = (id) => {
  return axiosInstance.get(`/bundle/${id}/export`);
};

export const checkReferralCode = (code) => {
  return axiosInstance.get(`/referral/${code}`);
};

export const getOrderStatus = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/order/${orderId}/status`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(response?.data?.message || "Failed to get order status");
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const getBundleStatus = async (bundleId) => {
  try {
    const response = await axiosInstance.get(`/bundle/${bundleId}/status`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(response?.data?.message || "Failed to get bundle status");
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const executeBundleOrder = async (bundleId, payload) => {
  try {
    const response = await axiosInstance.put(`/bundle/${bundleId}/execute`, payload);
    if (response.status === 204) {
      return response.data;
    }
    throw new Error(response?.data?.message || "Failed to execute bundle");
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const withdrawBundleSol = async (bundleId, payload) => {
  try {
    const response = await axiosInstance.post(`/bundle/${bundleId}/withdraw/sol`, payload);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const sellBundleToken = async (bundleId, payload) => {
  try {
    const response = await axiosInstance.post(`/bundle/${bundleId}/sell`, payload);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const sellOrderToken = async (orderId, payload) => {
  try {
    const response = await axiosInstance.post(`/order/${orderId}/sell`, payload);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

const mockSample = generateOHLCMock(100);

export const getChartData = async (input, publicKey, useMockData) => {
  try {
    if (useMockData) {
      // mock
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 200,
            data: mockSample,
          });
        }, 1000); // Delay 1 detik
      });

      return response;
    }

    const endpoint = `${process.env.REACT_APP_BACKEND_TERMINAL_ENDPOINT}/price/chart`;

    const response = await axios.get(endpoint, {
      params: {
        inputMint: input,
        wallet: publicKey,
      },
    });

    return response;
  } catch (error) {
    if (error.response) {
      if (error.response.data?.errors) {
        const messages = error.response.data.errors.map((err) => `${err.field}: ${err.message}`).join("\n");
        error.response.data.message = messages;
      }
      throw error;
    }
  }
};

export const getLimitOrders = async (mintAdress, publicKey, useMockData) => {
  try {
    if (useMockData) {
      // mock
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 200,
            data: { buys: mockSample.buys, sells: mockSample.sells },
          });
        }, 1000);
      });
      return response;
    }

    const endpoint = `${process.env.REACT_APP_BACKEND_TERMINAL_ENDPOINT}/price/limit`;

    const response = await axios.get(endpoint, {
      params: {
        mint: mintAdress,
        wallet: publicKey,
      },
    });
    return response;
  } catch (error) {
    if (error.response) {
      if (error.response.data?.errors) {
        const messages = error.response.data.errors.map((err) => `${err.field}: ${err.message}`).join("\n");
        error.response.data.message = messages;
      }
      throw error;
    }
  }
};

export const getDCAOrders = async (input, publicKey, useMockData) => {
  try {
    if (useMockData) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockDCAData);
        }, 1000);
      });
    }

    const endpoint = `${process.env.REACT_APP_BACKEND_TERMINAL_ENDPOINT}/price/dca`;
    const response = await axios.get(endpoint, {
      params: {
        mint: input,
        wallet: publicKey,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response?.data?.errors) {
      const messages = error.response.data.errors.map((err) => `${err.field}: ${err.message}`).join("\n");
      error.response.data.message = messages;
    }
    throw error;
  }
};

export const getSummary = async (input, publicKey, useMockData) => {
  try {
    if (useMockData) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockSummaryData);
        }, 1000);
      });
    }

    const endpoint = `${process.env.REACT_APP_BACKEND_TERMINAL_ENDPOINT}/price/summary`;
    const response = await axios.get(endpoint, {
      params: {
        mint: input,
        wallet: publicKey,
      },
    });

    return {
      ...response.data,
    };
  } catch (error) {
    if (error.response?.data?.errors) {
      const messages = error.response.data.errors.map((err) => `${err.field}: ${err.message}`).join("\n");
      error.response.data.message = messages;
    }
    throw error;
  }
};

// Tambahkan fungsi baru untuk force refresh
export const getActiveWalletsForced = (id) => {
  return axiosInstance.get(`/order/${id}/agents?force=1`);
};

export const getAllWalletsForced = (id) => {
  return axiosInstance.get(`/order/${id}/wallets?force=1`);
};

export const getBundleWalletsForced = (id) => {
  return axiosInstance.get(`/bundle/${id}/wallets?force=1`);
};
