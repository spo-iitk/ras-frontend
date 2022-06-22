import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import BranchStatsAdmin from "sections/BranchStatsAdmin";
import StudentStatsAdmin from "sections/StudentStatsAdmin";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function Stats() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="container">
      <h2>Stats</h2>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Studentwise" />
            <Tab label="Branchwise" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <StudentStatsAdmin />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <BranchStatsAdmin />
        </TabPanel>
      </Box>
    </div>
  );
}
Stats.layout = "adminPhaseDashBoard";
export default Stats;
