import React, { useEffect, useState } from "react";
import { Button, Grid, IconButton, Modal, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import EditCompany from "@components/Modals/EditCompanyAdmin";
import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import AddCompany from "@components/Modals/AddCompanyAdmin";
import useStore from "@store/store";
import requestCompany, { CompanyRc } from "@callbacks/admin/rc/company";
import DeleteConfirmation from "@components/Modals/DeleteConfirmation";

const BASE_ROUTE = "/admin/rc";

const gridMain = {
  width: "100%",
  display: "flex",
  alignItems: "right",
  justifyContent: "right",
};

function DeleteComapny(props: { id: string }) {
  const { token } = useStore();
  const { id } = props;
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const handleOpenDeleteModal = () => {
    setDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };
  useEffect(() => {
    if (confirmation) {
      requestCompany.deleteCompany(token, rid, id);
      window.location.reload();
    }
  }, [confirmation, id, rid, token]);
  return (
    <>
      <IconButton
        onClick={() => {
          handleOpenDeleteModal();
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DeleteConfirmation
          handleClose={handleCloseDeleteModal}
          setConfirmation={setConfirmation}
        />
      </Modal>
    </>
  );
}

const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
    width: 90,
  },
  {
    field: "company_name",
    headerName: "Company",
    width: 300,
  },
  {
    field: "CreatedAt",
    headerName: "Registered on",
    valueGetter: ({ value }) =>
      value &&
      `${new Date(value).toLocaleDateString()} ${new Date(
        value
      ).toLocaleTimeString()}`,
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
          pathname: `${BASE_ROUTE}/${params.row.recruitment_cycle_id}/company/${params.row.ID}`,
        }}
      >
        <Button variant="contained" sx={{ width: "80%" }}>
          View
        </Button>
      </Link>
    ),
  },
  {
    field: "options",
    headerName: "",
    width: 100,
    align: "center",
    hide: true,
    renderCell: (cellValues) => (
      <DeleteComapny id={cellValues.row.ID.toString()} />
    ),
  },
];

function Index() {
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  const [rows, setRow] = useState<CompanyRc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCompanydata = async () => {
      if (rid === undefined || rid === "") return;
      let response = await requestCompany.getall(token, rid);
      setRow(response);
      setLoading(false);
    };
    if (rid !== "") getCompanydata();
  }, [token, rid]);
  return (
    <div>
      <Meta title="Company" />
      <Stack>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6}>
            <h2>Company</h2>
          </Grid>
          <Grid item xs={6} style={gridMain}>
            <Stack direction="row">
              <IconButton onClick={handleOpenEdit}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleOpenNew}>
                <AddIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        <DataGrid
          rows={rows}
          getRowId={(row) => row.ID}
          columns={columns}
          loading={loading}
        />
      </Stack>
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <EditCompany
          handleCloseEdit={handleCloseEdit}
          setRows={setRow}
          companyData={rows}
        />
      </Modal>
      <Modal open={openNew} onClose={handleCloseNew}>
        <AddCompany handleCloseNew={handleCloseNew} />
      </Modal>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
