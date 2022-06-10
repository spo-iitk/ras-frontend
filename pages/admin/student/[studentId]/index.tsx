import React from "react";
import { IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Meta from "@components/Meta";
import styles from "@styles/adminPhase.module.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter } from "next/router";
import ActiveButton from "@components/Buttons/ActiveButton";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 100,
  },
  {
    field: "name",
    headerName: "Student Name",
    width: 300,
  },
  {
    field: "rollNo",
    headerName: "Roll No",
    width: 200,
  },
  {
    field: "program",
    headerName: "Program",
    width: 200,
  },
  {
    field: "department",
    headerName: "Department",
    width: 200,
  },
  {
    field: "graduationYear",
    headerName: "Graduation Year",
    width: 200,
  },
  {
    field: "details",
    headerName: "View Details",
    width: 200,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <ActiveButton sx={{ height: 30, width: "100%", borderRadius: "30%" }}>
        {params.value}
      </ActiveButton>
    ),
  },
];

const ROUTE_PATH_ID = "../[rcid]/notice/new";
const rows = [
  {
    id: 1,
    name: "Amandeep",
    rollNo: "210883",
    program: "BS",
    department: "ES",
    graduationYear: "2025",
    details: "#",
  },
];

function Index() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Meta title="Master Database (Students)" />
      <Stack>
        <Stack
          direction="row"
          marginRight={5}
          marginLeft={5}
          alignItems="left"
          justifyContent="space-between"
        >
          <h2>Master Database (Students)</h2>
          <IconButton>
            <Link
              href={{
                pathname: ROUTE_PATH_ID,
                query: { rcid: router.query.rcid },
              }}
              passHref
            >
              <AddIcon />
            </Link>
          </IconButton>
        </Stack>
        <div
          style={{ height: 500, width: 1300, margin: "0px auto" }}
          className={styles.datagridMasterDatabaseStudents}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </div>
      </Stack>
    </div>
  );
}

Index.layout = "adminDashBoard";
export default Index;
