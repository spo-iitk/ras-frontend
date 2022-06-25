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
  return (
    <IconButton
      onClick={() => {
        requestCompany.deleteCompany(token, rid, id);
      }}
    >
      <DeleteIcon />
    </IconButton>
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
    renderCell: (cellValues) => {
      console.log(cellValues.row.ID);
      return <DeleteComapny id={cellValues.row.ID.toString()} />;
    },
  },
];

function Index() {
  const [openNew, setOpenNew] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
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
      let toset: CompanyRc[] = response.map((company) => ({
        ID: company.company_id,
        CreatedAt: company.CreatedAt,
        company_id: company.company_id,
        company_name: company.company_name,
        recruitment_cycle_id: company.recruitment_cycle_id,
        hr1: company.hr1,
        hr2: company.hr2,
        hr3: company.hr3,
        comments: company.comments,
      }));
      setRow(toset);
      setLoading(false);
    };
    if (rid !== "") getCompanydata();
  }, [token, rid]);
  return (
    <div className="container">
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
