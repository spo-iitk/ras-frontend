import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import { IconButton, Modal, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";

import DataGrid from "@components/DataGrid";
import ActiveButton from "@components/Buttons/ActiveButton";
import Meta from "@components/Meta";
import addCompanyRequest, { Company } from "@callbacks/admin/company/company";
import useStore from "@store/store";
import AddCompanyMD from "@components/Modals/AddCompanyAdminMD";

const columns: GridColDef[] = [
  { field: "ID", headerName: "ID" },
  {
    field: "name",
    headerName: "Company Name",
  },
  {
    field: "tags",
    headerName: "Tags",
  },
  {
    field: "website",
    headerName: "Website",
  },
  {
    field: "description",
    headerName: "Description",
    hide: true,
  },
  {
    field: "view_details",
    headerName: "View Details",

    renderCell: (params) => (
      <Stack
        direction="row"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
      >
        <Link href={`/admin/company/${params.row.id}`}>
          <ActiveButton sx={{ height: 30 }}>CLICK HERE</ActiveButton>
        </Link>
      </Stack>
    ),
  },
];

function Index() {
  const { token } = useStore();
  const [rows, setRows] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCompanydata = async () => {
      let response = await addCompanyRequest.getall(token);
      setRows(response);
      setLoading(false);
    };
    getCompanydata();
  }, [token]);
  const [openNew, setOpenNew] = useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };

  return (
    <div className="container">
      <Meta title="Master Company Database - Admin" />
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Stack
            spacing={3}
            justifyContent="space-between"
            direction="row"
            alignItems="center"
          >
            <div>
              <h1>Master Database (Company)</h1>
            </div>
            <div>
              <Stack direction="row" spacing={3}>
                <IconButton onClick={handleOpenNew}>
                  <AddIcon />
                </IconButton>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Stack>
            </div>
          </Stack>
        </Grid>

        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.ID}
        />
      </Grid>
      <Modal open={openNew} onClose={handleCloseNew}>
        <AddCompanyMD handleCloseNew={handleCloseNew} />
      </Modal>
    </div>
  );
}

Index.layout = "adminDashBoard";
export default Index;
