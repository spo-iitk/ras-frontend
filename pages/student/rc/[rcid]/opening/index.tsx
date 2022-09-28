import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import useStore from "@store/store";
import sProformaRequest, {
  ProformaParams,
} from "@callbacks/student/rc/proforma";

function Openings() {
  const { token } = useStore();
  const router = useRouter();
  const { rcid } = router.query;
  const rid = rcid as string;
  const [rows, setRows] = useState<ProformaParams[]>([]);
  const columns: GridColDef[] = [
    {
      field: "ID",
      headerName: "ID",
      hide: true,
    },
    { field: "company_name", headerName: "Company Name" },
    { field: "role", headerName: "Role Name" },
    { field: "profile", headerName: "Profile" },
    {
      field: "deadline",
      headerName: "Application Deadline",
      renderCell(params) {
        return new Date(params.value).toLocaleString();
      },
    },
    {
      field: "proforma",
      headerName: "Proforma",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Button
          sx={{ width: "100%" }}
          href={`/student/rc/${rid}/proforma/${params.row.ID}`}
          variant="contained"
          color="primary"
        >
          View{" "}
        </Button>
      ),
    },
    {
      field: "action",
      headerName: "Apply",
      width: 200,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Button
          href={`/student/rc/${rid}/opening/${params.row.ID}/apply`}
          sx={{ width: "100%" }}
          variant="contained"
          color="primary"
        >
          Apply
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const getProforma = async () => {
      const res = await sProformaRequest.getAllOpenings(token, rid);
      setRows(res);
    };
    if (router.isReady) {
      getProforma();
    }
  }, [rid, router.isReady, token]);
  return (
    <div>
      <Meta title="RC - Openings" />
      <Stack>
        <h2>Job Openings</h2>
        <DataGrid rows={rows} columns={columns} getRowId={(row) => row.ID} />
      </Stack>
    </div>
  );
}

Openings.layout = "studentPhaseDashboard";
export default Openings;
