import { UseToastOptions } from "@chakra-ui/react";
import { BigNumber, BigNumberish, ethers } from "ethers";

export const numberFormat = (number: number | string) =>
  new Intl.NumberFormat().format(Number(number));
export const showSortAddress = (address?: string): string => {
  return `${address?.substring(0, 4)}...${address?.substring(
    address.length - 4,
    address.length - 1
  )}`;
};

export const formatEtherUnit = (number: string): number => {
  return Number(ethers.utils.formatUnits(number));
};

export const formatToEth = (amount: number): BigNumber => {
  return ethers.utils.parseEther(amount.toString());
};

export const showTransactionHash = (tranHash: string) => {
  return `${tranHash?.substring(0, 10)}${"".padStart(
    5,
    "*"
  )}${tranHash?.substring(tranHash.length - 10, tranHash.length)}`;
};

export const getToast = (
  description: string | object,
  status: UseToastOptions["status"] = "error",
  title = "Error"
): UseToastOptions => {
  if (typeof description === "string")
    return {
      title,
      status,
      position: "top-right",
      description,
      duration: 3000,
    };
  let msg = "something wrong!";
  // @ts-ignore no problem in operation, although type error appears.
  if (typeof description === "object" && description["message"]) {
    // @ts-ignore no problem in operation, although type error appears.
    msg = description["message"];
  }
  return {
    title,
    status,
    position: "top-right",
    description: msg,
    duration: 3000,
  };
};
export function timeStampToDatetime(timeStamp: number,pattern:string) {
  let date = new Date(timeStamp*1000)
  pattern= pattern.replace("YYYY",date.getFullYear().toString())
  pattern= pattern.replace("MM",date.getMonth().toString())
  pattern= pattern.replace("DD",date.getDate().toString())
  pattern= pattern.replace("hh",date.getHours().toString())
  pattern= pattern.replace("mm",date.getMinutes().toString())
  pattern= pattern.replace("ss",date.getSeconds().toString())
  
  return pattern;
}

export function curentTimeStamp() {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  return currentTimestamp;
}