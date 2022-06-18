import React from "react";
import { Grid, IconButton, Modal, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Link from "next/link";

import ActiveButton from "@components/Buttons/ActiveButton";
import styles from "@styles/adminPhase.module.css";
import Meta from "@components/Meta";
import AddCompany from "@components/Modals/AddCompanyAdmin";

const BASE_ROUTE = "/admin/rc/[rcid]/company";

const gridMain = {
  width: "100%",
  display: "flex",
  alignItems: "right",
  justifyContent: "right",
};

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "company",
    headerName: "Company",
    width: 300,
  },
  {
    field: "registered_on",
    headerName: "Registered on",
    width: 300,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "viewdetails",
    headerName: "View Details",
    width: 400,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Link
        href={{
          pathname: `${BASE_ROUTE}/[companyId]`,
          query: {
            rcid: params.row.id,
            companyId: "1",
          },
        }}
      >
        <ActiveButton sx={{ height: 30, width: "50%" }}>Click</ActiveButton>
      </Link>
    ),
  },
];

const rows = [
  {
    id: "1",
    company: "Company 1",
    registered_on: "June 10th,2022",
    viewdetails: "",
  },
  {
    id: "2",
    company: "Company 2",
    registered_on: "June 15th,2022",
    viewdetails: "",
  },
];

function Index() {
  const [openNew, setOpenNew] = React.useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };
  return (
    <div className={styles.container}>
      <Meta title="Company - Admin" />
      <h1>Internship 2022-23 Phase 1</h1>
      <Stack>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6}>
            <h2>Company</h2>
          </Grid>
          <Grid item xs={6} style={gridMain}>
            <div>
              <Tooltip TransitionComponent={Zoom} title="Download Excel">
                <IconButton>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <IconButton onClick={handleOpenNew}>
                <AddIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <div
          style={{ height: 500, margin: "0px auto" }}
          className={styles.datagridCompanyStudent}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </div>
      </Stack>
      <Modal open={openNew} onClose={handleCloseNew}>
        <AddCompany handleCloseNew={handleCloseNew} />
      </Modal>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
