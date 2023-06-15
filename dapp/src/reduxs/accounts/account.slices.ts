import { IWalletInfo } from "@/_types_"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ethers } from "ethers";

export interface AccountState {
  wallet?: IWalletInfo;
  web3Provider?: ethers.providers.JsonRpcProvider;
  balanceChange?: boolean;
}

const initialState: AccountState = {}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setWeb3Provider: (state, action: PayloadAction<ethers.providers.JsonRpcProvider>) => {      
      state.web3Provider = action.payload;
    },
    setWalletInfo: (state, action: PayloadAction<IWalletInfo>) => {
      state.wallet = action.payload;
    },   
    setBalanceChange: (state, action: PayloadAction<boolean>) => {
      state.balanceChange = action.payload;
    },   
  },
})

export const { setWalletInfo, setWeb3Provider,setBalanceChange } = accountSlice.actions;
export default accountSlice.reducer;


