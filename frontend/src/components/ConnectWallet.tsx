import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { useEffect, useState } from "react";
import CTButton from "./common/CTButton";
// import {apiUrl} from "./../config/contanst";
const ethers = require("ethers");

const ConnectWallet = () => {
  const { open, close, isOpen } = useWeb3Modal();
  const [loading, setLoading] = useState(false);
  const { isConnected, address } = useAccount();
  // const signMessage = useSignMessage();
  const label = isConnected ? "Account" : "Connect Wallet";
  async function getMessage() {
    // const response = await axios.post(
    //   apiUrl.getMessage,
    //   {
    //     publicAddress: address.trim().toLowerCase(),
    //   }
    // );
    // return response.data;
  }

  async function signIn(signature:string) {
    // const response = await axios.post(apiUrl.signIn, {
    //   publicAddress: address.trim().toLowerCase(),
    //   signature: signMessage.data,
    // });
    // console.log({
    //   publicAddress: address.trim().toLowerCase(),
    //   signature: signature,
    // });
    // return response.data;
  }
  async function onConnect() {
    setLoading(true);
    await open();

  }
//   useEffect(()=>{
// //    (async()=>{
// //     const message = await getMessage();
// //     const signature = await signMessage.signMessageAsync({
// //       message: message,
// //     });
// //     await signIn(signature);
// //     setLoading(false);
// //    })()
//   },[address])
//   console.log(signMessage.data);
  return (
    <>
      <CTButton
        className="rounded-pill"
        variant="warning"
        onClick={onConnect}
        text={loading ? "Loading..." : label}
      />
      {/* <Header />

      <Breadcrumb
        breadcrumbTitle="Connect Wallet"
        breadcrumbNav={[
          {
            navText: "Home",
            path: "/",
          },
        ]}
      />

      <Divider />

      <ConnectWalletContent
        heading="Connect with one of our available wallet providers."
        walletCard={[
          {
            id: 1,
            name: "Metamask",
            image: "img/bg-img/metamask.png",
            badgeText: "Hot",
            buttonInfo: [
              {
                text: "Connect",
                color: "warning",
                path: "/login",
                icon: "bi-arrow-right",
              },
            ],
          },
          {
            id: 2,
            name: "Coinbase Wallet",
            image: "img/bg-img/coinbase.png",
            badgeText: "",
            buttonInfo: [
              {
                text: "Connect",
                color: "warning",
                path: "/login",
                icon: "bi-arrow-right",
              },
            ],
          },
          {
            id: 3,
            name: "Kaikas",
            image: "img/bg-img/kaikas.png",
            badgeText: "",
            buttonInfo: [
              {
                text: "Connect",
                color: "warning",
                path: "/login",
                icon: "bi-arrow-right",
              },
            ],
          },
          {
            id: 4,
            name: "Venly",
            image: "img/bg-img/venly.png",
            badgeText: "",
            buttonInfo: [
              {
                text: "Connect",
                color: "warning",
                path: "/login",
                icon: "bi-arrow-right",
              },
            ],
          },
        ]}
      />

      <Divider />

      <Footer /> */}
    </>
  );
};

export default ConnectWallet;
