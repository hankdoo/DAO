import CrowdSaleAbi from '../abis/crowd_sale.json';
import UsdtAbi from '../abis/usdt.json';
import NftAbi from '../abis/nft.json';
import MarketAbi from '../abis/market.json';
import AuctionAbi from '../abis/auction.json';
import WinDaoAbi from './../../../../artifacts/contracts/WinDAO.sol/WINDAO.json';
import SeedWalletAbi from './../../../../artifacts/contracts/SeedWallet.sol/SeedWallet.json';
import BUSDAbi from './../../../../artifacts/contracts/BUSD.sol/BUSD.json';
import IptAbi from '../abis/ipt.json';


export const getCrowdSaleAbi = () => CrowdSaleAbi;
export const getUsdtAbi = () => UsdtAbi;
export const getNFTAbi = () => NftAbi;
export const getMarketAbi = () => MarketAbi;
export const getAuctionAbi = () => AuctionAbi;
export const getIptAbi = () => IptAbi;
export const getWinDaoAbi = () => WinDaoAbi.abi;
export const getSeedWalletAbi = () => SeedWalletAbi.abi;
export const getBUSDAbi = () => BUSDAbi.abi;
