import "./../src/assets/css/animate.css";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../src/assets/css/bootstrap-icons.css";
import "tiny-slider/dist/tiny-slider.css";
import "react-datepicker/dist/react-datepicker.css";
import "./../src/assets/scss/style.scss";

import type { AppProps } from "next/app";
import MainLayout from "@/layouts";
import { Provider } from "react-redux";
import store from "@/reduxs/store";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { Web3Modal } from "@web3modal/react";
const chains = [arbitrum, mainnet, polygon];
const projectId =
  process.env.WALLET_CONNECT_PROJECT_ID || "44289d2de96b77f001de5e36a7a74cd2";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>

    <Provider store={store}>
        <MainLayout >
          <Component {...pageProps} />
        </MainLayout>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </Provider>
    </WagmiConfig>

  );
}

export default MyApp;
