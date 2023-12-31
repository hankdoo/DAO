import { ActionType, IAuctionInfo, INftItem } from "@/_types_";
import { SuccessModal } from "@/components";
import ProcessingModal from "@/components/ProcessingModal";
import AuctionContract from "@/contracts/AuctionContract";
import MarketContract from "@/contracts/MarketContract";
import NftContract from "@/contracts/NftContract";
import { useAppSelector } from "@/reduxs/hooks";
// import {
//   Flex,
//   SimpleGrid,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   useBoolean,
//   useDisclosure,
// } from "@chakra-ui/react";
import React from "react";
import NftAuction from "../auctions/components/NftAuction";
import ListModal from "./components/ListModal";
import Nft from "./components/Nft";
import SellModal from "./components/SellModal";
import UpdateModal from "./components/UpdateModal";
import HeroOne from "@/components/hero/HeroOne";
import Divider from "@/components/divider/Divider";
import FeaturedNFT from "@/components/featuredNFT/FeaturedNFT";
import TodaysDrop from "@/components/todaysDrop/TodaysDrop";
import TopSeller from "@/components/topSeller/top-seller";
import TopBuyer from "@/components/topBuyer/TopBuyer";
import LiveAuction from "@/components/liveAuction/LiveAuction";
import DiscoverItems from "@/components/discover/Discover";
import PopularCollection from "@/components/popularCollection/PopularCollection";
import Process from "@/components/process/Process";
import DiscoverTwo from "@/components/discover/DiscoverTwo";
import Collection from "@/components/collection/Collection";
import CTA from "@/components/cta/CTA";
import AppDownload from "@/components/appDownload/AppDownload";

export default function HomeView() {
  // const { web3Provider, wallet } = useAppSelector((state) => state.account);
  // const [nfts, setnfts] = React.useState<INftItem[]>([]);
  // const [nftsListed, setnftsListed] = React.useState<INftItem[]>([]);
  // const [auctions, setAuctions] = React.useState<IAuctionInfo[]>([]);

  // const [nft, setNft] = React.useState<INftItem>();
  // const [action, setAction] = React.useState<ActionType>();

  // // const [isProcessing, setIsProcessing] = useBoolean();
  // const [isOpen, setIsOpen] = useBoolean();
  // const [txHash, setTxHash] = React.useState<string>();
  // // const [isUnlist, setIsUnList] = useBoolean();
  // const [modalType, setModalType] = React.useState<"LISTING" | "AUCTION">(
  //   "LISTING"
  // );

  // const [isOpenSellModal, setOpenSellModal] = React.useState<boolean>(false);
  // const [isOpenUpdateModal, setOpenUpdateModal] = React.useState<boolean>(false);

  // // const {
  // //   isOpen: isSuccess,
  // //   onClose: onCloseSuccess,
  // //   onOpen: onOpenSuccess,
  // // } = useDisclosure();

  // const getListNft = React.useCallback(async () => {
  //   if (!web3Provider || !wallet) return;
  //   const nftContract = new NftContract(web3Provider);
  //   const nfts = await nftContract.getListNFT(wallet.address);
  //   setnfts(nfts);
  //   const marketContract = new MarketContract(web3Provider);
  //   const listednfts = await marketContract.getListedNft(wallet.address);
  //   setnftsListed(listednfts);

  //   // const auctionContract = new AuctionContract();
  //   // const auctionnfts = await auctionContract.getAuctionByStatus();
  //   // const myAuctions = auctionnfts.filter(
  //   //   (p) => p.auctioneer === wallet.address
  //   // );
  //   // const nftAuctions = await nftContract.getNftAuctionInfo(myAuctions);
  //   // setAuctions(nftAuctions);
  // }, [web3Provider, wallet]);

  // React.useEffect(() => {
  //   getListNft();
  // }, [getListNft]);

  // const selectAction = async (ac: ActionType, item: INftItem) => {
  //   if (!web3Provider) return;
  //   setNft(item);
  //   setAction(ac);
  //   setIsProcessing.off();
  //   switch (ac) {
  //     case "LIST":
  //     case "AUCTION": {
  //       setModalType(ac === "AUCTION" ? "AUCTION" : "LISTING");
  //       setIsOpen.on();
  //       break;
  //     }
  //     case "UNLIST": {
  //       setIsUnList.on();
  //       const marketContract = new MarketContract(web3Provider);
  //       const tx = await marketContract.unListNft(item.id);
  //       setTxHash(tx);
  //       setAction(undefined);
  //       setNft(undefined);
  //       setIsUnList.off();
  //       onOpenSuccess();
  //       await getListNft();
  //       break;
  //     }
  //     case "TRANSFER": {
  //       setOpenSellModal(true);
  //       break;
  //     }
  //     case "SELL": {
  //       setOpenSellModal(true);
  //       break;
  //     }
  //     case "BUY": {
  //       setIsProcessing.on();
  //       await handleBuy(item);
  //       setIsProcessing.off();
  //       break;
  //     }
  //     case "UPDATE": {
  //       setOpenUpdateModal(true);
  //       break;
  //     }
  //     case "SELLOF": {
  //       setIsProcessing.on();
  //       await handleSellOf(item);
  //       setIsProcessing.off();
  //       break;
  //     }
  //     default:
  //       break;
  //   }
  // };

  const handleListNft = async (price: number, expireDate?: Date | null) => {
    // if (!price || !web3Provider || !wallet || !nft) return;
    // setIsProcessing.on();
    // try {
    //   const nftContract = new NftContract(web3Provider);
    //   let tx = "";
    //   if (modalType === "LISTING") {
    //     const marketContract = new MarketContract(web3Provider);
    //     await nftContract.approve(marketContract._contractAddress, nft.id);
    //     tx = await marketContract.listNft(nft.id, price);
    //   } else {
    //     if (!expireDate) return;
    //     const auctionContract = new AuctionContract(web3Provider);
    //     await nftContract.approve(auctionContract._contractAddress, nft.id);
    //     const startTime = Math.round((new Date().getTime() / 1000)  + 60);
    //     tx = await auctionContract.createAuction(
    //       nft.id,
    //       price,
    //       startTime,
    //       Math.round(expireDate.getTime() / 1000)
    //     );
    //   }
    //   setTxHash(tx);
    //   onOpenSuccess();
    //   setAction(undefined);f
    //   setNft(undefined);
    //   setIsOpen.off();
    //   await getListNft();
    // } catch (er: any) {
    //   console.log(er);
    //   setIsProcessing.off();
    // }
  };

  // const handleSell = async (price: number) => {
  //   console.log(price);
  //   if (price <= 0) {
  //     alert("Invalid price");
  //     return

  //   }
  //   setIsProcessing.on();
  //   try {
  //     if (!web3Provider || !nft || !wallet) return;
  //     const marketContract = new MarketContract(web3Provider);
  //     const tx = await marketContract.upToSell(nft.id, price);
  //     setTxHash(tx);
  //     setOpenSellModal(false);
  //     onOpenSuccess();
  //     await getListNft();
  //   } catch (ex: any) {
  //     console.log(ex);
  //     alert(ex?.reason);
  //   }
  //   setIsProcessing.off();
  // };
  // const handleUpdate = async (price: number) => {
  //   console.log(price);
  //   if (price <= 0) {
  //     alert("Invalid price");
  //     return
  //   }
  //   setIsProcessing.on();
  //   try {
  //     if (!web3Provider || !nft || !wallet) return;
  //     const marketContract = new MarketContract(web3Provider);
  //     const tx = await marketContract.updateListedNftPrice(nft.id,price);
  //     setTxHash(tx);
  //     setOpenUpdateModal(false);
  //     onOpenSuccess();
  //     await getListNft();
  //   } catch (ex: any) {
  //     console.log(ex);
  //     alert(ex?.reason);
  //   }
  //   setIsProcessing.off();
  // };
  // const handleBuy = async (nft: INftItem) => {
  //   try {
  //     if (!web3Provider || !nft || !wallet) return;
  //     const marketContract = new MarketContract(web3Provider);
  //     const tx = await marketContract.buyNFT(nft);
  //     setTxHash(tx);
  //     setOpenSellModal(false);
  //     onOpenSuccess();
  //     await getListNft();
  //   } catch (ex: any) {
  //     console.log(ex);
  //     alert(ex?.reason);
  //   }
  // };
  // const handleSellOf = async (nft: INftItem) => {
  //   try {
  //     if (!web3Provider || !nft || !wallet) return;
  //     const marketContract = new MarketContract(web3Provider);
  //     const tx = await marketContract.sellOff(nft.id.toString());
  //     setTxHash(tx);
  //     setOpenSellModal(false);
  //     onOpenSuccess();
  //     await getListNft();
  //   } catch (ex: any) {
  //     console.log(ex);
  //     alert(ex?.reason);
  //   }
  // };
  return (
    <>
     <HeroOne
        heading="Explore, buy, and sell exceptional NFTs."
        subHeading="It's crafted with the latest trend of design & coded with all modern approaches."
        buttonGroup={[
          {
            btnColor: "primary",
            btnText: "Explore Now",
            btnURL: "/explore1",
            btnIcon: "bi-arrow-right",
          },
          {
            btnColor: "minimal",
            btnText: "All Collections",
            btnURL: "/collections",
            btnIcon: "bi-grid-3x3-gap",
          },
        ]}
        welcomeImage="img/illustrator/2.png"
      />

      <Divider />

      <FeaturedNFT heading="Editor's Picks" />

      <Divider />

      {/* <div className="top-seller-wrapper">
        <div className="container">
          <div className="row g-4 g-lg-5 justify-content-center">
            <TodaysDrop
              heading="Today's Drops"
              buttonText="View All Drops"
              buttonURL="/featured-items"
            />

            <TopSeller
              heading="Top Seller"
              buttonText="View All Seller's"
              buttonURL="/top-seller"
            />

            <TopBuyer
              heading="Top Buyer"
              buttonText="View All Buyer's"
              buttonURL="/top-buyer"
            />
          </div>
        </div>
      </div> */}

      <Divider />

      {/* <LiveAuction
        backgroundColor="gray"
        spinnerColor="danger"
        title="Live Auctions"
        buttonText="View All Auctions"
        buttonURL="/live-bidding"
        buttonColor="primary"
      /> */}

      <Divider />

      {/* <DiscoverItems title="Discover" /> */}

      <Divider />

      {/* <PopularCollection title="Popular items in last 15 days" /> */}

      <Divider />

      {/* <Process /> */}

      <Divider />
      <Divider />

      {/* <DiscoverTwo title="Discover Items" /> */}

      <Divider />
      {/* <Collection
        heading="Browse by category"
        buttonText="View All Catagories"
        buttonURL="/collections"
        buttonColor="primary"
      /> */}

      <Divider />

      {/* <CTA
        backgroundColor="primary" // try 'success', 'warning', 'danger', 'info' etc
        text="Resources for getting started with Funto."
        buttonText="Get Started"
        buttonColor="warning"
        buttonURL="/help-center"
        buttonIcon=""
      /> */}

      <Divider />

      <Divider />

      <Divider />

      {/* <AppDownload
        heading="Stay connected <br /> to all your devices."
        subHeading="Download our mobile apps today."
        qrCodeImage="img/core-img/qr-code.svg"
        appDownloadButtons={[
          {
            id: 1,
            icon: "img/core-img/google-play.png",
            path: "#",
          },
          {
            id: 2,
            icon: "img/core-img/app-store.png",
            path: "#",
          },
        ]}
        rightSideImage="img/illustrator/2.png"
      />
 */}
      <Divider />
    </>
    // <Flex w="full">
    //   <Tabs>
    //     <TabList borderBottomColor="#5A5A5A" borderBottomRadius={2} mx="15px">
    //       <Tab
    //         textTransform="uppercase"
    //         color="#5A5A5A"
    //         _selected={{ borderBottomColor: "white", color: "white" }}
    //       >
    //         My NFT
    //       </Tab>
    //       <Tab
    //         textTransform="uppercase"
    //         color="#5A5A5A"
    //         _selected={{ borderBottomColor: "white", color: "white" }}
    //       >
    //         listings
    //       </Tab>
    //       <Tab
    //         textTransform="uppercase"
    //         color="#5A5A5A"
    //         _selected={{ borderBottomColor: "white", color: "white" }}
    //       >
    //         Live Auctions
    //       </Tab>
    //     </TabList>
    //     <TabPanels>
    //       <TabPanel>
    //         <SimpleGrid w="full" columns={4} spacing={10}>
    //           {nfts.map((nft, index) => (
    //             <Nft
    //               item={nft}
    //               key={index}
    //               index={index}
    //               isMyList
    //               onAction={(a) => selectAction(a, nft)}
    //             />
    //           ))}
    //         </SimpleGrid>
    //       </TabPanel>

    //       <TabPanel>
    //         <SimpleGrid w="full" columns={4} spacing={10}>
    //           {nftsListed.map((nft, index) => (
    //             <Nft
    //               item={nft}
    //               key={index}
    //               index={index}
    //               isList
    //               onAction={(a) => selectAction(a, nft)}
    //             />
    //           ))}
    //         </SimpleGrid>
    //       </TabPanel>

    //       <TabPanel>
    //         <SimpleGrid w="full" columns={4} spacing={10}>
    //           {auctions.map((nft, index) => (
    //             <NftAuction
    //               item={nft}
    //               key={index}
    //               isCancel
    //               onAction={async (a) => {
    //                 setIsUnList.on();
    //                 try {
    //                   const auctionContract = new AuctionContract(web3Provider);
    //                   const tx = await auctionContract.cancelAuction(
    //                     nft.auctionId
    //                   );
    //                   setTxHash(tx);
    //                   onOpenSuccess();
    //                   await getListNft();
    //                 } catch (ex) {
    //                   console.log(ex);
    //                 }
    //                 setIsUnList.off();
    //               }}
    //             />
    //           ))}
    //         </SimpleGrid>
    //       </TabPanel>
    //     </TabPanels>
    //   </Tabs>

    //   <ProcessingModal isOpen={isProcessing} onClose={() => {}} />
    //   <ListModal
    //     type={modalType}
    //     isOpen={isOpen}
    //     nft={nft}
    //     isListing={isProcessing}
    //     onClose={() => setIsOpen.off()}
    //     onList={(amount, expireDate) => handleListNft(amount, expireDate)}
    //   />

    //   <SellModal
    //     isOpen={isOpenSellModal}
    //     nft={nft}
    //     isSell={isProcessing}
    //     onClose={() => setOpenSellModal(false)}
    //     onSell={(price: number) => handleSell(price)}
    //   />
    //    <UpdateModal
    //     isOpen={isOpenUpdateModal}
    //     nft={nft}
    //     isUpdate={isProcessing}
    //     onClose={() => setOpenUpdateModal(false)}
    //     onUpdate={(price: number) => handleUpdate(price)}
    //   />


    //   <SuccessModal
    //     hash={txHash}
    //     title="SUCCESS"
    //     isOpen={isSuccess}
    //     onClose={onCloseSuccess}
    //   />
    // </Flex>
  );
}
