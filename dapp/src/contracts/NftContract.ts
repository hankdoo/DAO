import { IAuctionInfo, INftItem } from "@/_types_";
import { BigNumber, ethers } from "ethers";
import { Erc721 } from "./interfaces";
import { getRPC } from "./utils/common";
import { getCrownNFTAbi, getNFTAbi } from "./utils/getAbis";
import { getCrownNFTAddress, getNFTAddress } from "./utils/getAddress";

export default class NftContract extends Erc721 {
  constructor(provider?: ethers.providers.JsonRpcProvider) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(provider || rpcProvider, getCrownNFTAddress(), getCrownNFTAbi());
    if (!provider) {
      this._contract = new ethers.Contract(
        this._contractAddress,
        this._abis,
        rpcProvider
      );
    }
  }

  private _listTokenIds = async (address: string) => {
    const urls: BigNumber[] = await this._contract.listTokenIds(address);
    return urls.map((id: BigNumber) => id.toString());
  };

  getListNFT = async (address: string): Promise<INftItem[]> => {
    const ids = await this._listTokenIds(address);

    return Promise.all(
      ids.map(async (id) => {
        const tokenUrl = await this._contract.tokenURI(id);
        const obj = await (await fetch(`${tokenUrl}?alt=media`)).json();
        const item: INftItem = { ...obj, id };
        return item;
      })
    );
  };

  getNftInfo = async (nfts: Array<any>) => {
    return Promise.all(
      nfts.map(async (o: any) => {
        const tokenUrl = await this._contract.tokenURI(o.tokenId);
        const obj = await (await fetch(`${tokenUrl}.json`)).json();
        const item: INftItem = {
          ...obj,
          id: o.tokenId,
          author: o.author,
          price: o.price,
        };
        return item;
      })
    );
  };

  getNftAuctionInfo = async (nftsAuctions: IAuctionInfo[]) => {
    return Promise.all(
      nftsAuctions.map(async (o: IAuctionInfo) => {
        const tokenUrl = await this._contract.tokenURI(o.tokenId);
        const obj = await (await fetch(`${tokenUrl}.json`)).json();
        const item: IAuctionInfo = { ...o, ...obj, id: o.tokenId };
        return item;
      })
    );
  };
}
