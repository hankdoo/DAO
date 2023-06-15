declare var window: any;
import { IPackage, IRate } from "@/_types_";
import { SuccessModal } from "@/components";
import SeedRoundContract from "@/contracts/SeedRoundContract";
import { AccountState } from "@/reduxs/accounts/account.slices";
import { curentTimeStamp, numberFormat, timeStampToDatetime } from "@/utils";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { formatEther } from "ethers/lib/utils";
import { Field, Form, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";

interface IProps {
  account?: AccountState;
}

export default function SeedRound({ account }: IProps) {
  const [txHash, setTxHash] = React.useState<string>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isClaiming, setIsClaiming] = useState(false);
  const [balance, setbalance] = useState(0);
  const [timeToClaim, setTimeToClaim] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [balanceOfSeed, setBalanceOfseed] = useState<number>(0);
  const [totalTokensSold, setTotalTokensSold] = useState<number>(0);
  const [tge, setTge] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [capacity, setCapacity] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [validate, setValidate] = useState<any>({
    min: null,
    max: null,
  });
  useEffect(() => {
    const init = async () => {
      if (account?.web3Provider && account.wallet) {
        const seedRoundContract = new SeedRoundContract(account?.web3Provider);
        Promise.all([
          await seedRoundContract.getBalanceByAddress(account?.wallet?.address),
          await seedRoundContract.getTgeStart(),
          await seedRoundContract.getStartTime(),
          await seedRoundContract.getEndTime(),
          await seedRoundContract.getMin(),
          await seedRoundContract.getMax(),
          await seedRoundContract.getBalanceOfSeed(),
          await seedRoundContract.getTotalTokensSold(),
          await seedRoundContract.getTge(),
          await seedRoundContract.getCost(),
          await seedRoundContract.getCapacity(),
        ]).then((values) => {
          setbalance(Number(formatEther(values[0])));
          setTimeToClaim(Number(values[1].toString()));
          setStartTime(Number(values[2].toString()));
          setEndTime(Number(values[3].toString()));
          setValidate({
            min: Number(formatEther(values[4].toString())),
            max: Number(formatEther(values[5].toString())),
          });
          setBalanceOfseed(Number(formatEther(values[6].toString())));
          setTotalTokensSold(Number(formatEther(values[7].toString())));
          setTge(Number((values[8].toString())));
          setCost(Number(formatEther(values[9].toString())));
          setCapacity(Number(formatEther(values[10].toString())));
        });
      }
    };
    init();
  }, [account, txHash]);

  const handleBuy = useCallback(
    async (values: any) => {
      try {
        const seedRoundContract = new SeedRoundContract(account?.web3Provider);
        const txhHash = await seedRoundContract?.buy(values.amount);
        setTxHash(txhHash);
        onOpen();
      } catch (error) {
        alert(error?.reason);
      }
    },
    [account]
  );

  const handleClaim = useCallback(async () => {
    try {
      const seedRoundContract = new SeedRoundContract(account?.web3Provider);
      const txhHash = await seedRoundContract.claim();
      setTxHash(txhHash);
      onOpen();
    } catch (error) {
      alert(error?.reason);
    }
  }, [account]);

  return (
    <>
      <Formik
        initialValues={{ amount: "" }}
        onSubmit={async (values, actions) => {
          await handleBuy(values);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
            <div>
              Period: {"[ "}
              {startTime == 0 || endTime == 0
                ? " Not initial"
                : timeStampToDatetime(startTime, "YYYY-MM-DD hh:mm:ss") +
                  " ----- " +
                  timeStampToDatetime(endTime, "YYYY-MM-DD hh:mm:ss")}
              {" ]"}
            </div>

            <div>
              Time to claim:{" "}
              {timeToClaim == 0
                ? "Not started yet"
                : timeStampToDatetime(timeToClaim, "YYYY-MM-DD hh:mm:ss")}
            </div>
            <div>Capacity: {numberFormat(capacity)}</div>
            <div>Total token sold: {numberFormat(totalTokensSold)}</div>
            <div>Balance of seed: {numberFormat(balanceOfSeed)}</div>
            <Flex align={"baseline"}>
              <FormLabel alignItems={"center"}>
                Balance: {numberFormat(balance)} WDA
                <div>Value received: {numberFormat((balance*tge)/100)} WDA</div>
              </FormLabel>

              <Button
                mt={4}
                ml={4}
                colorScheme="teal"
                isLoading={isClaiming}
                disabled={
                  !account?.web3Provider ||
                  balance == 0 ||
                  timeToClaim == 0 ||
                  curentTimeStamp() < timeToClaim
                }
                variant="primary"
                onClick={async () => {
                  setIsClaiming(true);
                  await handleClaim();
                  setIsClaiming(false);
                }}
              >
                Claim
              </Button>
            </Flex>
            <Field name="amount">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.name && form.touched.name}
                  mt={4}
                >
                  <FormLabel>Amount</FormLabel>
                  <Flex>
                    <Input
                      {...field}
                      type="number"
                      min={validate.min}
                      max={validate.max}
                    />
                    <Input
                      ml={4}
                      {...field}
                      type="text"
                      value={Number(props.values.amount) / cost + " BUSD"}
                      disabled={true}
                    />
                  </Flex>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
              variant="primary"
              disabled={
                !account?.web3Provider ||
                !(
                  curentTimeStamp() >= startTime && curentTimeStamp() <= endTime
                ) ||
                balanceOfSeed == 0
              }
            >
              {(balanceOfSeed == 0 && "Sold out") || "Buy"}
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
