declare var window: any;
import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useAppSelector } from "@/reduxs/hooks";
import { IPackage, IRate, TOKEN } from "@/_types_";
import { ethers } from "ethers";
import CrowSaleContract from "@/contracts/CrowdSaleContract";
import UsdtContract from "@/contracts/UsdtContract";
import WinDaoContract from "@/contracts/WinDaoContract";
import { formatToEth } from "@/utils";
export default function InvestView() {
  const [rate, setRate] = React.useState<IRate>({ bnbRate: 0, usdtRate: 0 });
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [pak, setPak] = React.useState<IPackage>();
  const [txHash, setTxHash] = React.useState<string>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [toAddress, setToAddress] = useState("");
  const { wallet,web3Provider } = useAppSelector((state) => state.account);

 

  const getRate = React.useCallback(async () => {
    const crowdContract = new CrowSaleContract();
    const bnbRate = await crowdContract.getBnbRate();
    const usdtRate = await crowdContract.getUsdtRate();
    setRate({ bnbRate, usdtRate });
  }, []);

  // React.useEffect(() => {
  //   getRate();
  // }, [getRate]);

  const handleTransfer = async (values: any) => {
    console.log(values);
    
    try {
      const windaoContract = new WinDaoContract(web3Provider);
      const txhHash = await windaoContract.transfer(
        values.toAddress,
        values.amount
      );
      console.log(txhHash);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={{ toAddress: "" }}
      onSubmit={async (values, actions) => {
        await handleTransfer(values);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Field name="toAddress">
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.name && form.touched.name}
                mt={4}
              >
                <FormLabel>To Address</FormLabel>
                <Input {...field} placeholder="To Address" />
                <FormErrorMessage>{form.errors.toAddress}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="amount">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.name && form.touched.name}
                mt={4}
              >
                <FormLabel>Amount</FormLabel>
                <Input {...field} />
                <FormErrorMessage>{form.errors.amount}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
            variant="primary"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
