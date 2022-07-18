import { Button, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import sProformaRequest, {
  ProformaParams,
} from "@callbacks/student/rc/proforma";
import useStore from "@store/store";

const BASE_ROUTE = "/student/rc/[rcId]/proforma";

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
      field: "Actions",
      headerName: "Actions",
      width: 200,
      renderCell: (rowdata) => (
        <Link
          href={{
            pathname: `${BASE_ROUTE}/${rowdata.id}`,
            query: {
              rcId: rid,
            },
          }}
        >
          <Button variant="contained" color="primary">
            View Proforma
          </Button>
        </Link>
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
      <Meta title="Proforma" />
      <Stack>
        <h2>Proforma</h2>
        <DataGrid rows={rows} columns={columns} getRowId={(row) => row.ID} />
      </Stack>
    </div>
  );
}

Proforma.layout = "studentPhaseDashboard";
export default Proforma;
