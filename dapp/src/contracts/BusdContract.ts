import { IAuctionInfo, IWalletInfo } from "@/_types_";
import { ethers } from "ethers";
import { BaseInterface } from "./interfaces";
import { getRPC } from "./utils/common";
import { getAuctionAbi, getBUSDAbi, getSeedWalletAbi, getWinDaoAbi } from "./utils/getAbis";
import { getAuctionAddress, getBUSDAddress, getSeedWalletAddress, getWinDaoAddress } from "./utils/getAddress";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { formatToEth } from "@/utils";

export default class BusdContract extends BaseInterface {
  constructor(provider?: ethers.providers.JsonRpcProvider) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(provider || rpcProvider, getBUSDAddress(), getBUSDAbi());
    if (!provider) {
      this._contract = new ethers.Contract(
        this._contractAddress,
        this._abis,
        rpcProvider
      );
    }
  }

  approve = async (spender:string,amount: number): Promise<any> => {
    const signer = await this._provider.getSigner();
    this._contract = new ethers.Contract(
      this._contractAddress,
      this._abis,
      signer
    );

    console.log(this._contract);
    

    const tx: TransactionResponse = await this._contract.approve(spender,amount);
    return this._handleTransactionResponse(tx);
  };

  // getBalanceByAddress = async (): Promise<IAuctionInfo[]> => {
  //   const rs = await this._contract.getAuctionByStatus(true);
  //   const results: IAuctionInfo[] = [];
  //   for (let i =0; i< rs.length; i+=1) {
  //     const o = rs[i];
  //     const item: IAuctionInfo = {
  //       auctioneer: o[0],
  //       tokenId: this._toNumber(o[1]),
  //       initialPrice: this._toEther(o[2]),
  //       previousBidder: o[3],
  //       lastBid: this._toEther(o[4]),
  //       lastBidder: o[5],
  //       startTime: this._toNumber(o[6]),
  //       endTime: this._toNumber(o[7]),
  //       completed: o[8],
  //       active: o[9],
  //       id: this._toNumber(o[1]),
  //       image: "",
  //       auctionId: this._toNumber(o[10]),
  //     }
  //     results.push(item);
  //   }
  //   return results;
  // }
  // createAuction = async(tokenId: number, initialPrice: number, startTime: number, endTime: number) => {
  //   console.log({ startTime, endTime})
  //   const tx = await this._contract.createAuction(tokenId, this._numberToEth(initialPrice), startTime, endTime, this._option);
  //   return this._handleTransactionResponse(tx);
  // }

  // cancelAuction = async (auctionId: number) => {
  //   const tx = await this._contract.cancelAuction(auctionId, this._option);
  //   return this._handleTransactionResponse(tx);
  // }

  // joinAuction = async(auctionId: number, bid: number) => {
  //   console.log({auctionId, bid})
  //   const tx = await this._contract.joinAuction(auctionId, this._numberToEth(bid), this._option);
  //   return this._handleTransactionResponse(tx);
  // }
}
