declare var window: any;
import { ConnectWallet, WalletInfo } from "@/components";
import { menus } from "@/constants";
import AuctionContract from "@/contracts/AuctionContract";
import BusdContract from "@/contracts/BusdContract";
import WinDaoContract from "@/contracts/WinDaoContract";
import { getRPC } from "@/contracts/utils/common";
import {
  setWalletInfo,
  setWeb3Provider,
} from "@/reduxs/accounts/account.slices";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { formatEtherUnit, numberFormat } from "@/utils";
import { ethers } from "ethers";
import React, { ReactNode, useEffect } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
interface IProps {
  children: ReactNode;
}

export default function MainLayout({ children }: IProps) {
  // const router = useRouter();
  // console.log(router.pathname);
  // console.log("dfdfd");

  const dispatch = useAppDispatch();
  const { wallet, web3Provider, balanceChange } = useAppSelector(
    (state) => state.account
  );

  const onConnectMetamask = async () => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // dispatch(setWeb3Provider(provider));
  };

  useEffect(() => {
    const init = async () => {
      if (!web3Provider) return;
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      const bigBalance = await signer.getBalance();
      const ethBalance = Number.parseFloat(
        ethers.utils.formatEther(bigBalance)
      );
      const winDaoContract = new WinDaoContract(web3Provider || undefined);
      const busdContract = new BusdContract(web3Provider || undefined);
      const balanceWDA = await winDaoContract.getBalanceByAddress(address);
      const balanceBUSD = await busdContract.getBalanceByAddress(address);
      dispatch(
        setWalletInfo({
          address,
          eth: ethBalance,
          wda: formatEtherUnit(balanceWDA.toString()),
          busd: formatEtherUnit(balanceBUSD.toString()),
        })
      );
    };

    init();
  }, [web3Provider, balanceChange]);

  return (
    <>
      <Header />
        {children}
        <Footer />
      {/* <Flex
      w={{ base: "full", lg: "70%" }}
      flexDirection="column"
      margin="50px auto"
    >
      <Flex w="full" alignItems="center" justifyContent="center">
        <Heading size="lg" fontWeight="bold">
          DAO
        </Heading>
        <Spacer />
        {menus.map((menu) => (
          <Link href={menu.url} key={menu.url}>
            <a>
              <Text mx="20px" fontSize="20px" textDecoration="underline">
                {menu.name}
              </Text>
            </a>
          </Link>
        ))}

        {!wallet && <ConnectWallet onClick={onConnectMetamask} />}
        {wallet && (
          <WalletInfo
            address={wallet?.address}
            amountETH={wallet?.eth || 0}
            amountWDA={wallet?.wda || 0}
            amountBUSD={wallet?.busd || 0}
          />
        )}
      </Flex>
     
    </Flex> */}
    </>
  );
}
