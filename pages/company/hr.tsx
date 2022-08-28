import React, { useEffect, useState } from "react";
import { Grid, IconButton, Modal, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";

import AddCompanyHR from "@components/Modals/AddCompanyHR";
import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import companyHRRequest, { HR } from "@callbacks/company/hr";
import useStore from "@store/store";

const gridMain = {
  width: "100%",
  display: "flex",
  alignItems: "right",
  justifyContent: "right",
};
function Overview(): JSX.Element {
  const { token } = useStore();
  const [rows, setRows] = useState<HR[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getRC = async () => {
      setLoading(true);
      const response = await companyHRRequest.get(token);
      if (response?.length > 0) setRows(response);
      setLoading(false);
    };

    if (token !== "") {
      getRC();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const columns: GridColDef[] = [
    {
      field: "ID",
      headerName: "ID",
      hide: true,
    },
    {
      field: "CreatedAt",
      headerName: "Registered On",
      valueGetter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "UpdatedAt",
      headerName: "Updated At",
      valueGetter: (params) => new Date(params.value).toLocaleDateString(),
      hide: true,
    },
    {
      field: "name",
      headerName: "HR Name",
    },
    {
      field: "email",
      headerName: "Email",
    },
    {
      field: "designation",
      headerName: "Designation",
    },
  ];

  return (
    <div>
      <Meta title="Registered HRs" />
      <Stack>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6}>
            <h2>Registered HRs</h2>
          </Grid>
          <Grid item xs={6} style={gridMain}>
            <div>
              <IconButton onClick={handleOpen}>
                <AddIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.ID}
        />
        <Modal open={open} onClose={handleClose}>
          <AddCompanyHR handleCloseNew={handleClose} />
        </Modal>
      </Stack>
    </div>
  );
}

Overview.layout = "companyDashboard";
export default Overview;
