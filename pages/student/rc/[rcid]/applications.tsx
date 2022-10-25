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
import { CDN_URL } from "@callbacks/constants";

const sideTextStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
};

function Withdraw({ params }: any) {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();

  const handleWithdraw = () => {
    if (rid) {
      applicationViewRequest.delete(token, rid, params.row.id).finally(() => {
        window.location.reload();
      });
    }
  };
  return (
    <Button
      variant="contained"
      sx={{ width: "100%" }}
      onClick={() => handleWithdraw()}
    >
      Withdraw
    </Button>
  );
}

// const transformName = (name: string) => {
//   const nname = name.replace(`${CDN_URL}/view/`, "");
//   const nameArray = nname.split(".");
//   const newName = nameArray[0].slice(14, -33);
//   const newNameWithExtension = `${newName}.${nameArray[1]}`;
//   return newNameWithExtension;
// };

const getURL = (url: string) => `${CDN_URL}/view/${url}`;

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    hide: true,
  },
  {
    field: "company_name",
    headerName: "Company Name",
  },
  {
    field: "role",
    headerName: "Role",
    hide: true,
  },
  {
    field: "profile",
    headerName: "Profile",
  },
  {
    field: "deadline",
    headerName: "Application Deadline",
    valueGetter: ({ value }) =>
      value && `${new Date(value).toLocaleString("en-GB")}`,
    width: 200,
  },
  {
    field: "applied_on",
    headerName: "Applied On",
    valueGetter: ({ value }) =>
      value && `${new Date(value).toLocaleString("en-GB")}`,
  },
  {
    field: "resume",
    headerName: "Applied Resume",
    sortable: false,
    align: "center",
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
        Resume Id: {params.row.resume_id}
      </Button>
    ),
  },
  {
    field: "withdraw",
    headerName: "Actions",
    sortable: false,
    width: 200,
    renderCell: (params) => {
      if (new Date().getTime() > params.row.deadline) {
        return (
          <Button
            variant="outlined"
            sx={{ borderRadius: "10px", width: "100%", color: "green" }}
            color="success"
          >
            {params.row.status}
          </Button>
        );
      }
      return <Withdraw params={params} />;
    },
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
    <div>
      <Meta title="RC - Applications" />
      <Grid
        container
        spacing={1}
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        <Grid item xs={12} md={6}>
          <h2>Your Applications</h2>
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
