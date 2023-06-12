import { Button, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react'
import { numberFormat, showSortAddress } from '../utils';

interface IProps {
  address?: string;
  amountETH: number;
  amountWDA: number;
}

export default function WalletInfo({address, amountETH,amountWDA}: IProps) {
  return (
    <Button variant="outline" ml="10px">
      <HStack>
        <Text>{showSortAddress(address)}</Text>
        <Image src='/eth.png' w="25px" alt="eth" ml="20px" borderRadius={100} />        
        <Text>{numberFormat(amountETH)}</Text>
      </HStack>
      <HStack>
        <Image src='/wda.jfif' w="25px" alt="wda" ml="20px" borderRadius={100} />        
        <Text>{numberFormat(amountWDA)}</Text>
      </HStack>
    </Button>
  )
}
