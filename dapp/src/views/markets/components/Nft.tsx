import { Clarity, INftItem, ActionType } from "@/_types_";
import { formatEtherUnit, numberFormat, showSortAddress } from "@/utils";
import {
  Flex,
  Image,
  Box,
  Text,
  HStack,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { formatUnits } from "ethers/lib/utils";
import React from "react";

interface IProps {
  item: INftItem;
  index: number;
  isUnList?: boolean;
  isList?: boolean;
  isMyList?: boolean;
  isAuction?: boolean;
  onAction?: (action: ActionType) => void;
}

export default function Nft({
  item,
  index,
  isAuction,
  isList,
  isUnList,
  isMyList,
  onAction,
}: IProps) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bg="#151D14"
      px="10px"
      py="10px"
      borderRadius="10px"
    >
      <Box position="relative">
        <Image
          src={item.image}
          alt={item.name}
          objectFit="cover"
          height={200}
          width={250}
          borderRadius="10px"
        />
        {/* <Box position="absolute" top={5} right={10}>
          <Text fontWeight="bold" fontSize="40px" fontStyle="italic">
            {
             1111
            }
          </Text>
        </Box> */}
        <HStack bg="rgba(0,0,0,0.4)" position="absolute" top={5} px="10px">
          <Text>ID: {item.id.toString().padStart(5, "0")}</Text>
        </HStack>
      </Box>
      <Text fontWeight="bold" py="5px">
        {item.name}
      </Text>
      {isList && (
        <>
          <Text color={"Highlight"} py="5px" fontSize={15}>
            {(item.isMyNft && "Me") || showSortAddress(item.author)}
          </Text>
        <Box alignItems={'center'} height={100}>
        <Text color={"yellow"} py="5px" fontSize={15} textAlign={'center'}>
            {numberFormat(formatEtherUnit(item?.price))} WDA
          </Text>

          {item.isMyNft && (
            <Button
              variant={"outline"}
              w="full"
              m="5px"
              size={"xs"}
              onClick={() => onAction && onAction("UPDATE")}
            >
              Update Price
            </Button>
          )}
        </Box>
        </>
      )}
      <Text p="5px" fontSize={14}>
        {item.description}
      </Text>
      {isList && isAuction && (
        <SimpleGrid w="full" columns={2} spacingX="10px">
          <Button
            variant="primary"
            onClick={() => onAction && onAction("LIST")}
          >
            List
          </Button>
          <Button
            variant="primary"
            onClick={() => onAction && onAction("AUCTION")}
          >
            Auction
          </Button>
        </SimpleGrid>
      )}

      {isList && (
        <Button
          variant={"primary"}
          w="full"
          mt="10px"
          onClick={() =>
            onAction && item.isMyNft ? onAction("SELLOF") : onAction("BUY")
          }
        >
          {(item.isMyNft && "SellOf") || "Buy"}
        </Button>
      )}

      {isMyList && (
        <Button
          variant="primary"
          w="full"
          mt="10px"
          onClick={() => onAction && onAction("SELL")}
        >
          Sell
        </Button>
      )}
    </Flex>
  );
}
