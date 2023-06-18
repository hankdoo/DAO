import { INftItem } from "@/_types_";
import { ethers } from "ethers";
import { Erc721 } from "./interfaces";
import { getRPC } from "./utils/common";
import { getMarketAbi } from "./utils/getAbis";
import { getMarketAddress } from "./utils/getAddress";

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

  getListedNft = async (): Promise<INftItem[]> => {
    const listed = await this._contract.getListedNft();
    // const ids = await this._listTokenIds(address);
    // const tokenUrl = await this._contract.tokenURI(id);
    console.log(listed);

    return Promise.all(
      listed.map(async (nft: any) => {
        const tokenUrl = await this._contract.tokenURI(nft?.tokenId);
        const obj = await (await fetch(`${tokenUrl}?alt=media`)).json();
        const item: INftItem = { ...obj, ...nft };
        return item;
      })
    );
  };

  upToSell = async (tokenId: number, price: number) => {
    const tx = await this._contract.upToSell(tokenId, this._numberToEth(price));
    return this._handleTransactionResponse(tx);
  };

  sellOff = async (tokenId: number) => {
    const tx = await this._contract.sellOff(tokenId, this._option);
    return this._handleTransactionResponse(tx);
  };

  updateListedNftPrice = async () => {
    const items = await this._contract.getListedNft();
    const nfts = items.map((item: any) => ({
      tokenId: this._toNumber(item.tokenId),
      author: item.author,
      price: this._toNumber(item.price),
    }));
    return nfts;
  };

  buyNFT = async (tokenId: number, price: number) => {
    const tx = await this._contract.buyNft(
      tokenId,
      this._numberToEth(price),
      this._option
    );
    return this._handleTransactionResponse(tx);
  };
}
