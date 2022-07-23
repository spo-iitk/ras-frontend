import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import useStore from "@store/store";
import companySideApplicantsRequest from "@callbacks/company/rc/proforma/applicants";
import { getDeptProgram } from "@components/Parser/parser";
import { CDN_URL } from "@callbacks/constants";

const transformName = (name: string) => {
  const nname = name.replace(`${CDN_URL}/view/`, "");
  const nameArray = nname.split(".");
  const newName = nameArray[0].slice(14, -33);
  const newNameWithExtension = `${newName}.${nameArray[1]}`;
  return newNameWithExtension;
};

const getURL = (url: string) => `${CDN_URL}/view/${url}`;

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 300,
  },
  {
    field: "email",
    headerName: "Email.",
    width: 200,
  },
  {
    field: "roll_no",
    headerName: "Roll No.",
  },
  {
    field: "cpi",
    headerName: "CPI",
  },
  {
    field: "primaryProgram",
    headerName: "Primary Program/Department",
    width: 200,
    valueGetter: (params) => getDeptProgram(params.row.program_department_id),
  },
  {
    field: "secondaryDept",
    headerName: "Secondary Program/Department",
    width: 200,
    valueGetter: (params) =>
      getDeptProgram(params.row.secondary_program_department_id),
  },
  {
    field: "resume",
    headerName: "Resume Link",
    sortable: false,
    align: "center",
    width: 400,
    headerAlign: "center",
    valueGetter: (params) => getURL(params?.value),
    renderCell: (params) => (
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        onClick={() => {
          window.open(params.value, "_blank");
        }}
      >
        {transformName(params.value)}
      </Button>
    ),
  },
  {
    field: "status_name",
    headerName: "Status",
    width: 100,
  },
];
function Application() {
  const { token } = useStore();

  const router = useRouter();
  const { rcid, openingid } = router.query;
  const rid = (rcid || "").toString();
  const [rows, setRows] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getall = async () => {
      if (openingid) {
        const data = await companySideApplicantsRequest.get(
          token,
          rid,
          openingid?.toString()
        );
        if (data && data.length > 0) setRows(data);
        setLoading(false);
      }
    };
    if (router.isReady && rid !== "" && openingid) getall();
  }, [router.isReady, token, rid, openingid]);

  return (
    <div>
      <Meta title="Opening - Applicants" />
      <Stack>
        <h2>Applicants</h2>
        <DataGrid rows={rows} columns={columns} loading={loading} />
      </Stack>
    </div>
  );
}

Application.layout = "companyPhaseDashboard";
export default Application;
