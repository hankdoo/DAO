declare var window: any;
import { useAppSelector } from "@/reduxs/hooks";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure
} from "@chakra-ui/react";
import { ethers } from "ethers";
import React, { useState } from "react";
import { IPackage, IRate, TOKEN } from "../../_types_";
import CrowSaleContract from "../../contracts/CrowdSaleContract";
import UsdtContract from "../../contracts/UsdtContract";
import PrivateRound from "./components/PrivateRound";
import SeedRound from "./components/SeedRound";
export default function TokenomicView() {
  const [rate, setRate] = React.useState<IRate>({ bnbRate: 0, usdtRate: 0 });
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [pak, setPak] = React.useState<IPackage>();
  const [txHash, setTxHash] = React.useState<string>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [toAddress, setToAddress] = useState("");
  const { wallet,web3Provider } = useAppSelector((state) => state.account);

 

  const getRate = React.useCallback(async () => {
    const crowdContract = new CrowSaleContract();
    const bnbRate = await crowdContract.getBnbRate();
    const usdtRate = await crowdContract.getUsdtRate();
    setRate({ bnbRate, usdtRate });
  }, []);

  // React.useEffect(() => {
  //   getRate();
  // }, [getRate]);

  const handleBuyIco = async (pk: IPackage) => {
    if (!web3Provider) return;
    setPak(pk);
    setIsProcessing(true);
    let hash = "";
    const crowdContract = new CrowSaleContract(web3Provider);
    if (pk.token === TOKEN.USDT) {
      const usdtContract = new UsdtContract(web3Provider);
      await usdtContract.approve(
        crowdContract._contractAddress,
        pk.amount / rate.bnbRate
      );
      hash = await crowdContract.buyTokenByUSDT(pk.amount);
    } else {
      hash = await crowdContract.buyTokenByBNB(pk.amount);
    }
    setTxHash(hash);
    onOpen();
    try {
    } catch (er: any) {}
    setPak(undefined);
    setIsProcessing(false);
  };

  return (
    <>
      <Tabs>
        <TabList>
          {tabData.map((tab, index) => (
            <Tab key={index}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel p={4} key={1}>
            <SeedRound web3Provider={web3Provider}/>
          </TabPanel>

          <TabPanel p={4} key={2}>
          <PrivateRound />
          
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

const tabData = [
  {
    label: "Seed round"
  },
  {
    label: "Private round"
  },
];
