/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import useStore from "@store/store";
import proformaRequest, { ProformaType } from "@callbacks/company/proforma";

const columns: GridColDef[] = [
  { field: "ID", headerName: "ID" },
  {
    field: "role",
    headerName: "Role name",
  },
  {
    field: "profile",
    headerName: "Profile",
  },
  {
    field: "deadline",
    headerName: "Application Deadline",
    renderCell(params) {
      return `${
        params.row.hide_details
          ? "--/ -- / ---- ,  -- : -- : --"
          : params.row.deadline === 0
          ? "Date not Set"
          : new Date(params.value).toLocaleString()
      }`;
    },
  },
  {
    field: "proforma",
    headerName: "Proforma",
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Button
        href={`/company/rc/${params.row.recruitment_cycle_id}/proforma/${params.row.ID}`}
        sx={{ height: 30, width: "100%" }}
        variant="contained"
      >
        View Proforma
      </Button>
    ),
  },
  {
    field: "applicants",
    headerName: "View Applicants",
    sortable: false,
    width: 200,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Button
        href={`/company/rc/${params.row.recruitment_cycle_id}/opening/${params.row.ID}`}
        sx={{ height: 30, width: "100%" }}
        disabled={params.row.hide_details}
        variant="contained"
      >
        View Applicants
      </Button>
    ),
  },
];

function Applications() {
  const { token } = useStore();

  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();

  const [proformas, setProformas] = useState<ProformaType[]>([]);

  useEffect(() => {
    const getall = async () => {
      let data = await proformaRequest.getAll(token, rid);
      data = data.filter((item) => item.is_approved.Bool);

      setProformas(data);
    };
    if (router.isReady && rid !== "") getall();
  }, [router.isReady, token, rid]);
  return (
    <div>
      <Meta title="Applications" />
      <Stack>
        <h2>Applications</h2>
        <DataGrid
          rows={proformas}
          columns={columns}
          getRowId={(row) => row.ID}
        />
      </Stack>
    </div>
  );
}

Applications.layout = "companyPhaseDashboard";
export default Applications;
