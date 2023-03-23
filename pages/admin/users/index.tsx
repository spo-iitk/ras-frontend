import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { GridColDef } from "@mui/x-data-grid";
import { Button, Modal, Switch } from "@mui/material";

import useStore from "@store/store";
import userDetailsRequest, {
  returnUsersDetailsType,
  userDetailsType,
} from "@callbacks/admin/rc/userDetails";
import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import ChangeUserRole from "@components/Modals/changeUserRole";

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
function Users() {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = rcid as string;
  const { token } = useStore();

  const [tabRole, setTabRole] = useState(0);
  const [userData, setUserData] = useState<userDetailsType[]>(
    [] as userDetailsType[]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [userId, setUserId] = useState(0);
  const [role, setRole] = useState(0);
  const handleActivityStatusChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    user_id: number
  ) => {
    const toggle = await userDetailsRequest.toggleActive(token, user_id);
    if (toggle) {
      setUserData(
        userData.map((user) => {
          let temp = user;
          if (user.ID === user_id) {
            temp.is_active = !user.is_active;
          }
          return temp;
        })
      );
    }
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabRole(newValue);
  };

  const handleOpenRoleModal = () => {
    setOpenRoleModal(true);
  };
  const handleCloseRoleModal = async (newRole: number) => {
    if (newRole > 0) {
      const succ = await userDetailsRequest.updateRole(token, userId, newRole);
      if (succ) {
        setUserData(
          userData.map((user) => {
            let temp = user;
            if (user.ID === userId) {
              temp.role_id = newRole;
            }
            return temp;
          })
        );
      }
    }
    setOpenRoleModal(false);
  };
  const handleEdit = (ID: number, editRole: number) => {
    setUserId(ID);
    setRole(editRole);
    handleOpenRoleModal();
  };

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
      valueGetter: ({ value }) =>
        value && `${new Date(value).toLocaleString()}`,
    },
    {
      field: "button_role",
      headerName: "Edit Role",
      renderCell: (params) => (
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            handleEdit(params.row.ID, params.row.role_id);
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "button_active",
      headerName: "Toggle Active Status",
      renderCell: (params) => (
        <Switch
          checked={params.row.is_active}
          onChange={(event) => handleActivityStatusChange(event, params.row.ID)}
          inputProps={{ "aria-label": "controlled" }}
        />
      ),
    },
  ];

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res: returnUsersDetailsType = await userDetailsRequest.getAll(
        token
      );
      console.log(res.users);
      setUserData(res.users);
      setIsLoading(false);
    };
    if (router.isReady) getData();
  }, [router.isReady, rid, token]);
  return (
    <div>
      <Meta title="User Details" />
      <Box sx={{ width: "100%" }}>
        <Modal open={openRoleModal} onClose={handleCloseRoleModal}>
          <ChangeUserRole role={role} handleClose={handleCloseRoleModal} />
        </Modal>
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
        {isLoading === false &&
          allRole.map((r, index) => {
            if (userData.length > 0)
              return (
                <TabPanel value={tabRole} index={index}>
                  <div>
                    <h2>Users&gt; {r}</h2>
                    <DataGrid
                      rows={userData.filter((user) => user.role_id === r)}
                      columns={columns}
                      loading={isLoading}
                      getRowId={(row) => row.ID}
                    />
                  </div>
                </TabPanel>
              );
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
            );
          })}
      </Box>
    </div>
  );
}
Users.layout = "adminDashBoard";
export default Users;
