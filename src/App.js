import React, { lazy, Suspense, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "react-query";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter, CoinbaseWalletAdapter } from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./styles/wallet.css";
import MainLayout from "./layouts/MainLayout";
import ScreenLoading from "./components/ScreenLoading";
import NotFound from "./containers/NotFound";

const Terminal = lazy(() => import("./containers/Terminal"));
// Landing page is no longer needed
// const Landing = lazy(() => import("./containers/Landing"));


const App = () => {
  const queryClient = new QueryClient();

  const endpoint = useMemo(() => process.env.REACT_APP_RPC_ENDPOINT, []);

  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new CoinbaseWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <ToastContainer position="top-center" theme="colored" className="toast-position" />
              <Routes>
                {/* Redirect root to terminal */}
                <Route
                  path="/"
                  element={<Navigate to="/terminal" replace />}
                />

                {/* Direct terminal route without nesting */}
                <Route
                  path="/terminal"
                  element={
                    <Suspense fallback={<ScreenLoading />}>
                      <MainLayout>
                        <Terminal />
                      </MainLayout>
                    </Suspense>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </QueryClientProvider>
          </BrowserRouter>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
