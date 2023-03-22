import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";


import useStore from "@store/store";
import userDetailsRequest, { returnUserDetailsType, userDetailsType } from "@callbacks/admin/rc/userDetails";
import { GridColDef } from "@mui/x-data-grid";
import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import { Button } from "@mui/material";

const allRole: number[] = [100, 101, 102, 103];

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
const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
  },
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "role_id",
    headerName: "Role",
  },
  {
    field: "is_active",
    headerName: "Active Status",
    sortable: false,
  },
  {
    field: "last_login",
    headerName: "Last Login",
    width: 150,
    sortable: false,
  },
  {
    field: "button",
    headerName: "View Details",
    renderCell: (params) => (
      <Button href={`users/${params.row.ID}`} variant="contained" fullWidth>
        Click
      </Button>
    ),
  }
];
function Users() {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = rcid as string;
  const { token } = useStore();

  const [tabRole, setTabRole] = useState(0);
  const [userData, setUserData] = useState<userDetailsType[]>([] as userDetailsType[]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.SyntheticEvent,newValue: number) => {
    setTabRole(newValue);
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res :returnUserDetailsType = await userDetailsRequest.getAll(token);
      console.log(res.users)
      setUserData(res.users);
      setIsLoading(false);
    };
    if (router.isReady) getData();
  }, [router.isReady, rid, token]);
  return (
    <div>
      <Meta title="User Details" />
      <h2>Stats</h2>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabRole}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="GOD" />
            <Tab label="OPC" />
            <Tab label="APC" />
            <Tab label="CHAIR" />
          </Tabs>
        </Box>
        {
          isLoading == false &&
          allRole.map((role,index) => {
            if(userData.length > 0)
              return(
                <TabPanel value={tabRole} index={index}>
                  <div>
                    <h2>Users&gt;</h2>
                    <DataGrid
                      rows={userData.filter((user) => user.role_id === role)}
                      columns={columns}
                      loading={isLoading}
                      getRowId={(row) => row.ID}
                    />
                  </div>
                </TabPanel>
              )
            return (
              <TabPanel value={tabRole} index={index}>
              <div>
                <h2>Users&gt;</h2>
                <DataGrid
                  rows={[]}
                  columns={columns}
                  loading={isLoading}
                  getRowId={(row) => row.ID}
                />
              </div>
            </TabPanel>
            )
            })
        }
      </Box>
    </div>
  );
}
Users.layout = "adminDashBoard";
export default Users;
