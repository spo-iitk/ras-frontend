/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Card,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import AddPPO from "@components/Modals/addPPO";
import useStore from "@store/store";
import requestProforma, { ProformaType } from "@callbacks/admin/rc/proforma";
import requestCompany, { CompanyRc } from "@callbacks/admin/rc/company";

const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
    width: 100,
  },
  {
    field: "role",
    headerName: "Designation",
    width: 200,
  },
  {
    field: "profile",
    headerName: "Profile",
    width: 200,
  },
  {
    field: "is_approved",
    headerName: "Status",
    width: 200,

    renderCell(params) {
      // eslint-disable-next-line no-nested-ternary
      return params.row.is_approved.Valid
        ? params.row.is_approved?.Bool
          ? "Approved"
          : "Rejected"
        : "Pending";
    },
  },
  {
    field: "deadline",
    headerName: "Deadline",
    width: 200,

    renderCell(params) {
      return `${
        params.row.deadline === 0
          ? "Date not Set"
          : new Date(params.value).toLocaleString()
      }`;
    },
  },
  {
    field: "active_hr",
    headerName: "Active HR",
  },
  {
    field: "button",
    headerName: "View Details",
    headerAlign: "center",
    renderCell: (params) => (
      <Button
        href={`/admin/rc/${params.row.recruitment_cycle_id}/proforma/${params.row.ID}`}
        variant="contained"
        sx={{ width: "100%" }}
      >
        View
      </Button>
    ),
  },
];

function Index() {
  const router = useRouter();
  const CID = router.query.companyId;
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const ID = (CID || "").toString();
  const [openNew, setOpenNew] = useState(false);
  const [rows, setRows] = useState<ProformaType[]>([]);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };
  const { token, rcName, role } = useStore();
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [row, setRow] = useState<CompanyRc>({
    ID: 0,
    CreatedAt: "",
    company_id: 0,
    company_name: "",
    recruitment_cycle_id: 0,
    hr1: "",
    hr2: "",
    hr3: "",
    comments: "",
  });
  const info1 = [
    {
      field: "Name",
      value: row.company_name,
    },
    {
      field: "Company ID",
      value: row.company_id,
    },
    {
      field: "Comments",
      value: row.comments,
    },
  ];
  const info2 = [
    {
      field: "HR1",
      value: row.hr1,
    },
    {
      field: "HR2",
      value: row.hr2,
    },
    {
      field: "HR3",
      value: row.hr3,
    },
  ];

  useEffect(() => {
    const getCompanydata = async () => {
      if (rid === undefined || rid === "") return;
      if (ID === undefined || ID === "") return;
      let response = await requestCompany.get(token, rid, ID);
      setRow(response);
    };

    const getProforma = async () => {
      if (rid === undefined || rid === "") return;
      if (ID === undefined || ID === "") return;
      let response = await requestProforma.getall(token, rid, ID);

      setRows(response);
    };
    if (role !== 103) {
      setShowExtraContent(true);
    }
    getProforma();
    getCompanydata();
  }, [token, rid, ID, role]);

  const handleClick = () => {
    router.push(`/admin/company/${row.company_id}`);
  };
  return (
    <div>
      <Meta title={`${row.company_name} - ${rcName}`} />
      <h2>{row.company_name}</h2>
      <Stack spacing={5} justifyContent="center" alignItems="center">
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={2}
          direction={{ lg: "row", xs: "column" }}
        >
          {showExtraContent && (
            <Stack spacing={2} direction={{ sm: "row", xs: "column" }}>
              <Button
                sx={{ width: { xs: "280px" } }}
                variant="contained"
                onClick={handleClick}
              >
                Go to Company Master DB
              </Button>

              <Button
                sx={{ width: { xs: "280px" } }}
                variant="contained"
                onClick={handleOpenNew}
              >
                ADD PPO/PIO
              </Button>
              <Modal open={openNew} onClose={handleCloseNew}>
                <AddPPO
                  handleCloseNew={handleCloseNew}
                  cname={row.company_name}
                />
              </Modal>
            </Stack>
          )}
        </Stack>
        <div>
          <Card
            elevation={5}
            sx={{ width: { xs: "300px", md: "500px" }, padding: 4 }}
          >
            <Grid container>
              {info1.map((item) => (
                <Grid item xs={12} md={6} key="">
                  <h3>{item.field}</h3>
                  <Typography variant="body1">{item.value}</Typography>
                </Grid>
              ))}
            </Grid>
            <hr />
            <Grid container>
              {info2.map((item) => (
                <Grid item xs={12} md={12} key="">
                  <h3>{item.field}</h3>
                  <Typography variant="body1">{item.value}</Typography>
                </Grid>
              ))}
            </Grid>
          </Card>
        </div>
      </Stack>
      <br />
      <br />
      <Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <h2>Company Proformas</h2>
          <Stack direction="row" spacing={3}>
            <IconButton href={`/admin/rc/${rid}/proforma/new`}>
              <AddIcon />
            </IconButton>
          </Stack>
        </Stack>

        <DataGrid rows={rows} columns={columns} getRowId={(rows) => rows.ID} />
      </Stack>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
