declare var window: any;
import { useAppSelector } from "@/reduxs/hooks";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import PrivateRound from "./components/PrivateRound";
import SeedRound from "./components/SeedRound";
export default function TokenomicView() {
  const account = useAppSelector((state) => state.account);
  return (
    <>
      <Tabs>
        <TabList>
          {tabData.map((tab, index) => (
            <Tab key={index}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel p={4} key={1}>
            <SeedRound account={account} />
          </TabPanel>

          <TabPanel p={4} key={2}>
            <PrivateRound account={account} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

const tabData = [
  {
    label: "Seed round",
  },
  {
    label: "Private round",
  },
];
