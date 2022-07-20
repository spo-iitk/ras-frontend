import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

import statRequest from "@callbacks/student/rc/stats";
// import BranchStats from "sections/BranchStats";
import StudentStats from "sections/StudentStats";
import { Stats as StatsType } from "@callbacks/admin/rc/stats";
import useStore from "@store/store";

interface TabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function Stats() {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = rcid as string;
  const { token } = useStore();

  const [value, setValue] = useState(0);
  const [statsData, setStatsData] = useState<StatsType>({
    student: [],
    branch: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await statRequest.getAll(token, rid);
      setStatsData(res);
      setIsLoading(false);
    };
    if (router.isReady) getData();
  }, [router.isReady, rid, token]);

  return (
    <div>
      <h2>Stats</h2>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Studentwise" />
            {/* <Tab label="Branchwise" /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <StudentStats data={statsData.student} isLoading={isLoading} />
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
          <BranchStats data={statsData.branch} isLoading={isLoading} />
        </TabPanel> */}
      </Box>
    </div>
  );
}

Stats.layout = "studentPhaseDashboard";
export default Stats;
