declare var window: any;
import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { ConnectWallet, SuccessModal, WalletInfo } from "../../components";
import { IPackage, IRate, IWalletInfo, TOKEN } from "../../_types_";
import { ethers } from "ethers";
import { packages } from "../../constants";
import InvestCard from "./components/InvestCard";
import CrowSaleContract from "../../contracts/CrowdSaleContract";
import UsdtContract from "../../contracts/UsdtContract";
import { useAppSelector } from "@/reduxs/hooks";
import Transfer from "./components/Transfer";
export default function InvestView() {
  const [rate, setRate] = React.useState<IRate>({ bnbRate: 0, usdtRate: 0 });
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [pak, setPak] = React.useState<IPackage>();
  const [txHash, setTxHash] = React.useState<string>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [toAddress, setToAddress] = useState("");
  const { wallet } = useAppSelector((state) => state.account);

  const [web3Provider, setWeb3Provider] =
    React.useState<ethers.providers.Web3Provider>();

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
            <Transfer />
          </TabPanel>

          <TabPanel p={4} key={2}>
            <SimpleGrid columns={{ base: 1, lg: 3 }} mt="50px" spacingY="20px">
              {packages.map((pk, index) => (
                <InvestCard
                  pak={pk}
                  key={String(index)}
                  isBuying={isProcessing && pak?.key === pk.key}
                  rate={pk.token === TOKEN.BNB ? rate.bnbRate : rate.usdtRate}
                  walletInfo={wallet}
                  onBuy={() => handleBuyIco(pk)}
                />
              ))}
            </SimpleGrid>

            <SuccessModal
              isOpen={isOpen}
              onClose={onClose}
              hash={txHash}
              title="BUY ICO"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

const tabData = [
  {
    label: "Transfer",
    content: "Perhaps the greatest dish ever invented.",
  },
  {
    label: "Buy",
    content:
      "Perhaps the surest dish ever invented but fills the stomach more than rice.",
  },
];
