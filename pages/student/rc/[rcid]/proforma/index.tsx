import { Button, Stack, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import sProformaRequest, {
  ProformaParams,
} from "@callbacks/student/rc/proforma";
import useStore from "@store/store";

function Proforma() {
  const [rows, setRows] = useState<ProformaParams[]>([]);
  const { token } = useStore();
  const router = useRouter();
  const { rcid } = router.query;
  const rid = rcid as string;

  const columns: GridColDef[] = [
    {
      field: "ID",
      headerName: "ID",
    },
    {
      field: "company_name",
      headerName: "Company Name",
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "role",
      headerName: "Role Name",
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "profile",
      headerName: "Profile",
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "deadline",
      headerName: "Application Deadline",
      renderCell: ({ value }) => `${new Date(value).toLocaleString("en-GB")}`,
      type: "dateTime",
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 200,
      renderCell: (rowdata) => (
        <Button
          href={`/student/rc/${rid}/proforma/${rowdata.id}`}
          variant="contained"
          color="primary"
        >
          View Proforma
        </Button>
      ),
    },
  ];
  useEffect(() => {
    const getProforma = async () => {
      const res = await sProformaRequest.getAllProforma(token, rid);
      setRows(res);
    };
    if (router.isReady) getProforma();
  }, [rid, router.isReady, token]);
  return (
    <div>
      <Meta title="RC - Proformas" />
      <Stack>
        <h2>Proforma</h2>
        <DataGrid rows={rows} columns={columns} getRowId={(row) => row.ID} />
      </Stack>
    </div>
  );
}

Proforma.layout = "studentPhaseDashboard";
export default Proforma;
