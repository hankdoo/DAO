import CrowdSaleAbi from '../abis/crowd_sale.json';
import UsdtAbi from '../abis/usdt.json';
import NftAbi from '../abis/nft.json';
import AuctionAbi from '../abis/auction.json';
import WinDaoAbi from './../../../../artifacts/contracts/WinDAO.sol/WINDAO.json';
import SeedWalletAbi from './../../../../artifacts/contracts/SeedWallet.sol/SeedWallet.json';
import PrivateWalletAbi from './../../../../artifacts/contracts/PrivateWallet.sol/PrivateWallet.json';
import CrownNFTAbi from './../../../../artifacts/contracts/Crown.sol/CrownNFT.json';
import MarketAbi from './../../../../artifacts/contracts/Market.sol/Market.json';
import BUSDAbi from './../../../../artifacts/contracts/BUSD.sol/BUSD.json';
import IptAbi from '../abis/ipt.json';


export const getCrowdSaleAbi = () => CrowdSaleAbi;
export const getUsdtAbi = () => UsdtAbi;
export const getNFTAbi = () => NftAbi;
export const getAuctionAbi = () => AuctionAbi;
export const getIptAbi = () => IptAbi;
export const getWinDaoAbi = () => WinDaoAbi.abi;
export const getBUSDAbi = () => BUSDAbi.abi;
export const getSeedWalletAbi = () => SeedWalletAbi.abi;
export const getPrivateWalletAbi = () => PrivateWalletAbi.abi;
export const getCrownNFTAbi = () => CrownNFTAbi.abi;
export const getMarketAbi = () => MarketAbi.abi;

