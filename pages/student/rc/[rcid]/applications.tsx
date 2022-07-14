import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Button, Grid, Stack } from "@mui/material";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import useStore from "@store/store";
import applicationViewRequest, {
  ApplicationType,
} from "@callbacks/student/rc/applications";

const sideTextStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
};
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 100,
  },
  {
    field: "companyName",
    headerName: "Company Name",
    width: 250,
  },
  {
    field: "role",
    headerName: "Role",
    width: 200,
  },
  {
    field: "deadline",
    headerName: "Application Deadline",
    width: 200,
  },
  {
    field: "resume",
    headerName: "Applied Resume",
    sortable: false,
    width: 200,
  },
  {
    field: "withdraw",
    headerName: "Actions",
    sortable: false,
    width: 200,
    renderCell: () => (
      <Button variant="contained" color="primary" sx={{ width: "100%" }}>
        Withdraw
      </Button>
    ),
  },
];

function Applications() {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  const [applications, setApplications] = useState<ApplicationType[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (rid === undefined || rid === "") return;
      const allApplications: ApplicationType[] =
        await applicationViewRequest.get(token, rid);
      if (allApplications && allApplications.length > 0)
        setApplications(allApplications);
      setLoading(false);
    };
    fetch();
  }, [rid, token]);

  return (
    <div className="container">
      <Meta title="Applications" />
      <Grid
        container
        spacing={1}
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        <Grid item xs={12} md={6}>
          <h1>Your Applications</h1>
        </Grid>
        <Grid item xs={12} md={6} sx={sideTextStyle}>
          <h2>
            Total Applications : {applications ? applications?.length : 0}
          </h2>
        </Grid>
      </Grid>
      <Stack>
        <DataGrid rows={applications} columns={columns} loading={loading} />
      </Stack>
    </div>
  );
}
Applications.layout = "studentPhaseDashboard";
export default Applications;
