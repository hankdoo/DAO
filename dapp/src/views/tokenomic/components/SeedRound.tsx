declare var window: any;
import { IPackage, IRate } from "@/_types_";
import { SuccessModal } from "@/components";
import CrowSaleContract from "@/contracts/CrowdSaleContract";
import SeedRoundContract from "@/contracts/SeedRoundContract";
import WinDaoContract from "@/contracts/WinDaoContract";
import { useAppSelector } from "@/reduxs/hooks";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

interface IProps {
  web3Provider: ethers.providers.JsonRpcProvider;
}
export default function SeedRound({ web3Provider }: IProps) {
  const [rate, setRate] = React.useState<IRate>({ bnbRate: 0, usdtRate: 0 });
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [pak, setPak] = React.useState<IPackage>();
  const [txHash, setTxHash] = React.useState<string>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [toAddress, setToAddress] = useState("");

  const getRate = React.useCallback(async () => {
    const crowdContract = new CrowSaleContract();
    const bnbRate = await crowdContract.getBnbRate();
    const usdtRate = await crowdContract.getUsdtRate();
    setRate({ bnbRate, usdtRate });
  }, []);

  const handleBuy = async (values: any) => {
    console.log(values);

    try {
      const seedRoundContract = new SeedRoundContract(web3Provider);
      const txhHash = await seedRoundContract.buy(values.amount);
      console.log(txhHash);
      setTxHash(txhHash);
    } catch (error) {
      alert(error?.reason);
      console.log(error);
      
    }
  };
  return (
    <>
      <Formik
        initialValues={{ toAddress: "" }}
        onSubmit={async (values, actions) => {
          await handleBuy(values);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
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
              Buy
            </Button>
          </Form>
        )}
      </Formik>
      <SuccessModal
        isOpen={isOpen}
        onClose={onClose}
        hash={txHash}
        title="BUY token"
      />{" "}
    </>
  );
}
