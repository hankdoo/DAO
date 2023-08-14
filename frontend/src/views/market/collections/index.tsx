// import { ActionType, IAuctionInfo, INftItem } from "@/_types_";
// import { SuccessModal } from "@/components";
// import ProcessingModal from "@/components/ProcessingModal";
// import AuctionContract from "@/contracts/AuctionContract";
// import MarketContract from "@/contracts/MarketContract";
// import NftContract from "@/contracts/NftContract";
// import { useAppSelector } from "@/reduxs/hooks";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Divider from "@/components/divider/Divider";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";

import RankingData from "./../../../data/ranking/ranking-data.json";

// import React from "react";
// import NftAuction from "../auctions/components/NftAuction";
// import ListModal from "./components/ListModal";
// import Nft from "./components/Nft";
// import SellModal from "./components/SellModal";
// import UpdateModal from "./components/UpdateModal";

export default function CollectionView() {
  // const { web3Provider, wallet } = useAppSelector((state) => state.account);
  // const [nfts, setnfts] = React.useState<INftItem[]>([]);
  // const [nftsListed, setnftsListed] = React.useState<INftItem[]>([]);
  // const [auctions, setAuctions] = React.useState<IAuctionInfo[]>([]);

  // const [nft, setNft] = React.useState<INftItem>();
  // const [action, setAction] = React.useState<ActionType>();

  // const [isProcessing, setIsProcessing] = useBoolean();
  // const [isOpen, setIsOpen] = useBoolean();
  // const [txHash, setTxHash] = React.useState<string>();
  // const [isUnlist, setIsUnList] = useBoolean();
  // const [modalType, setModalType] = React.useState<"LISTING" | "AUCTION">(
  //   "LISTING"
  // );

  // const [isOpenSellModal, setOpenSellModal] = React.useState<boolean>(false);
  // const [isOpenUpdateModal, setOpenUpdateModal] = React.useState<boolean>(false);

  // const {
  //   isOpen: isSuccess,
  //   onClose: onCloseSuccess,
  //   onOpen: onOpenSuccess,
  // } = useDisclosure();

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

  // const handleListNft = async (price: number, expireDate?: Date | null) => {
  //   // if (!price || !web3Provider || !wallet || !nft) return;
  //   // setIsProcessing.on();
  //   // try {
  //   //   const nftContract = new NftContract(web3Provider);
  //   //   let tx = "";
  //   //   if (modalType === "LISTING") {
  //   //     const marketContract = new MarketContract(web3Provider);
  //   //     await nftContract.approve(marketContract._contractAddress, nft.id);
  //   //     tx = await marketContract.listNft(nft.id, price);
  //   //   } else {
  //   //     if (!expireDate) return;
  //   //     const auctionContract = new AuctionContract(web3Provider);
  //   //     await nftContract.approve(auctionContract._contractAddress, nft.id);
  //   //     const startTime = Math.round((new Date().getTime() / 1000)  + 60);
  //   //     tx = await auctionContract.createAuction(
  //   //       nft.id,
  //   //       price,
  //   //       startTime,
  //   //       Math.round(expireDate.getTime() / 1000)
  //   //     );
  //   //   }
  //   //   setTxHash(tx);
  //   //   onOpenSuccess();
  //   //   setAction(undefined);f
  //   //   setNft(undefined);
  //   //   setIsOpen.off();
  //   //   await getListNft();
  //   // } catch (er: any) {
  //   //   console.log(er);
  //   //   setIsProcessing.off();
  //   // }
  // };

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

  const columns = [
    {
        dataField: 'id',
        text: 'Position',
    },
    {
        dataField: 'title',
        text: 'Title',
        sort: true
    },
    {
        dataField: 'price',
        text: 'Base Price'
    },
    {
        dataField: 'last1day',
        text: 'Last 1 Day',
        sort: true
    },
    {
        dataField: 'weeks',
        text: '7 Days'
    }
];

const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    paginationSize: 5,
    disablePageTitle: true,
    hideSizePerPage: true
});
  return (
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
    <>
    
     
    <Breadcrumb
                breadcrumbTitle="Ranking" 
                breadcrumbNav={[
                    {
                        navText: "Home",
                        path: "/"
                    }
                ]}
            />

            <Divider />

            <div className="activity-wrapper">
                {/* Ranking Table */}
                <div className="container">
                    <div className="ranking-table">
                        <BootstrapTable 
                            keyField="id" 
                            data={RankingData} 
                            columns={columns} 
                            pagination={pagination} 
                            bootstrap4
                            hover
                        />
                    </div>
                </div>
            </div>
            
            <Divider />
    </>
  );
}
