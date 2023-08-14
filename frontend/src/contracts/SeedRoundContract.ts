import { IAuctionInfo, IWalletInfo } from "@/_types_";
import { ethers } from "ethers";
import { BaseInterface } from "./interfaces";
import { getRPC } from "./utils/common";
import { getAuctionAbi, getSeedWalletAbi, getWinDaoAbi } from "./utils/getAbis";
import { getAuctionAddress, getSeedWalletAddress, getWinDaoAddress } from "./utils/getAddress";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { formatToEth } from "@/utils";
import BusdContract from "./BusdContract";

export default class SeedRoundContract extends BaseInterface {
  constructor(provider?: ethers.providers.JsonRpcProvider) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(provider || rpcProvider, getSeedWalletAddress(), getSeedWalletAbi());
    if (!provider) {
      this._contract = new ethers.Contract(
        this._contractAddress,
        this._abis,
        rpcProvider
      );
    }
  }

  getBalanceByAddress = async (address: string): Promise<any> => {
    const user = await this._contract.users(address);
    return user.balance
  };
  getTgeStart = async (): Promise<number> => {
    return await this._contract.tgeStart();
  };

  getStartTime = async (): Promise<number> => {
    return await this._contract.startAt();
  };
  getEndTime = async (): Promise<number> => {
    return await this._contract.endAt();
  };
  getMin = async (): Promise<number> => {
    return await this._contract.min();
  };
  getMax = async (): Promise<number> => {
    return await this._contract.max();
  };
  getBalanceOfSeed = async (): Promise<number> => {
    return await this._contract.getBalanceOfSeed();
  };
  getTotalTokensSold = async (): Promise<number> => {
    return await this._contract.totalTokensSold();
  };
  getTge = async (): Promise<number> => {
    return await this._contract.tge();
  };
  getCost = async (): Promise<number> => {
    return await this._contract.cost();
  };
  getCapacity = async (): Promise<number> => {
    return await this._contract.cap();
  };
  buy = async (amount: number): Promise<any> => {
    const busdContract = new BusdContract(this._provider)

    await busdContract.approve(getSeedWalletAddress(),amount);

    const signer = await this._provider.getSigner();
    this._contract = new ethers.Contract(
      this._contractAddress,
      this._abis,
      signer
    );
    const tx: TransactionResponse = await this._contract.buy(
      formatToEth(amount)
    );
    return this._handleTransactionResponse(tx);
  };

  claim = async (): Promise<any> => {
    const signer = await this._provider.getSigner();
    this._contract = new ethers.Contract(
      this._contractAddress,
      this._abis,
      signer
    );
    const tx: TransactionResponse = await this._contract.claimTGE();
    return this._handleTransactionResponse(tx);
  };
}
