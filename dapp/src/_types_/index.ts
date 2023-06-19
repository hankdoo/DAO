import { BigNumber } from "ethers";

export interface IWalletInfo {
  address: string;
  eth: number;
  wda: number;
  busd: number;
}

export interface IRate {
  usdtRate: number;
  bnbRate: number;
}

export enum TOKEN {
  BNB = "BNB",
  USDT = "USDT",
}

export interface IPackage {
  key: string;
  name: string;
  amount: number;
  icon: string;
  bg: string;
  token: TOKEN;
}

export interface IMenu {
  name: string;
  url: string;
}

export interface IAttribute {
  trait_type: string;
  value: string | number;
}

export interface INftItem {
  id: number;
  name?: string;
  description?: string;
  image: string;
  attributes?: IAttribute[];
  //Listing
  price?: number;
  author?: string;  
  isMyNft?: boolean;  
}

export enum Clarity {
  "A",
  "B",
  "C",
  "D",
  "E",
  "S",
  "SS",
  "SSS",
}
export type ActionType = "LIST" | "UNLIST" | "TRANSFER" | "AUCTION"|"SELL"|"BUY"|"SELLOF"|"UPDATE";

export interface IAuctionInfo extends  INftItem {
  auctionId: number;
  auctioneer: string;
  tokenId: number;
  initialPrice: number;
  previousBidder: string;
  lastBid: number;
  lastBidder: string;
  startTime: number;
  endTime: number;
  completed: boolean;
  active: boolean;
}
