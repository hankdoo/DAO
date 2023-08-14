import { INftItem } from "@/_types_";
import { ethers } from "ethers";
import { Erc721 } from "./interfaces";
import { getRPC } from "./utils/common";
import { getMarketAbi } from "./utils/getAbis";
import { getMarketAddress } from "./utils/getAddress";
import { formatEtherUnit, formatToEth } from "@/utils";
import WinDaoContract from "./WinDaoContract";
import NftContract from "./NftContract";

export default class MarketContract extends Erc721 {
  constructor(provider?: ethers.providers.JsonRpcProvider) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(provider || rpcProvider, getMarketAddress(), getMarketAbi());
    if (!provider) {
      this._contract = new ethers.Contract(
        this._contractAddress,
        this._abis,
        rpcProvider
      );
    }
  }

  getListedNft = async (address:string): Promise<INftItem[]> => {
    const listed = await this._contract.getListedNft();
    const nftContract = new NftContract(this._provider);
    return Promise.all(
      listed.map(async (nft: any) => {
        const tokenUrl = await nftContract.tokenURI(nft?.tokenId);
        const obj = await (await fetch(`${tokenUrl}?alt=media`)).json();
        const item: INftItem = { ...obj, ...nft,id:(nft?.tokenId),isMyNft:address==nft?.author };
        return item;
      })
    );
  };

  upToSell = async (tokenId: number, price: number) => {
    const nftContract = new NftContract(this._provider);
    await nftContract.approve(getMarketAddress(), tokenId);
    const tx = await this._contract.upToSell(tokenId, formatToEth(price));
    return this._handleTransactionResponse(tx);
  };

  sellOff = async (tokenId: string) => {
    const tx = await this._contract.sellOff(tokenId);
    return await this._handleTransactionResponse(tx);
  };

  updateListedNftPrice = async (tokenId: number, price: number) => {
    const tx = await this._contract.updateListedNftPrice(tokenId.toString(),formatToEth(price) );
    return  this._handleTransactionResponse(tx);
  };

  buyNFT = async (nft: INftItem) => {
    const windaoContract = new WinDaoContract(this._provider);
    await windaoContract.approve(getMarketAddress(),nft.price)
    const tx = await this._contract.buyNFT(
      nft.id.toString()
    );
    return await this._handleTransactionResponse(tx);
  };
}
