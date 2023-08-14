import {
  Modal,
  ModalOverlay,
  ModalProps,
  ModalContent,
  ModalBody,
  Text,
  Button,
  Flex,
  ModalCloseButton,
  Image,
  Input,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { INftItem } from "@/_types_";
import React from "react";
import DatePicker from "react-datepicker";

interface IProps extends Omit<ModalProps, "children"> {
  nft?: INftItem;
  isUpdate?: boolean;
  onUpdate?: (price: number) => void;
}

export default function UpdateModal({
  nft,
  isUpdate,
  onUpdate,
  ...props
}: IProps) {
  const [price, setPrice] = React.useState<string>();
  return (
    <Modal closeOnOverlayClick={false} {...props}>
      <ModalOverlay
        blur="2xl"
        bg="blackAlpha.300"
        backdropFilter="blur(10px)"
      />
      <ModalContent py="30px">
        <ModalCloseButton />
        <ModalBody>
          <Flex alignItems="center" w="full" direction="column">
            <Heading size="md" mb="10px">Update NFT</Heading>
            <Image
              src={nft?.image}
              alt={nft?.name}
              borderRadius="20px"
              w="80%"
              mb="20px"
            />
            <Flex w="full" direction="column">
              <Text fontWeight="bold">
                Price:
              </Text>
              <Flex w="full" my="10px">
                <Input
                  w="full"
                  placeholder="Input price"
                  value={price}
                  min={1}
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Flex>
              <Button
                variant="primary"
                onClick={() => onUpdate && price && onUpdate(price)}
                disabled={!price || isUpdate}
              >
                {isUpdate ? <Spinner /> : 'Update now' }
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
