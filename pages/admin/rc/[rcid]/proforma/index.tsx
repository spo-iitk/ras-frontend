import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Button, Tooltip } from "@mui/material";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import requestProforma, {
  AdminProformaType,
} from "@callbacks/admin/rc/adminproforma";
import useStore from "@store/store";

function Index() {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = rcid as string;

  const { token, rcName } = useStore();

  const [proformas, setProformas] = useState<AdminProformaType[]>([]);

  const columns: GridColDef[] = [
    {
      field: "ID",
      headerName: "ID",
      hide: true,
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
      field: "CreatedAt",
      headerName: "Created At",
      hide: true,
    },
    {
      field: "UpdatedAt",
      headerName: "Last Updated",
      valueGetter: (rowData) => new Date(rowData.value).toLocaleString(),
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "company_id",
      headerName: "Company ID",
      hide: true,
    },
    {
      field: "company_recruitment_cycle_id",
      headerName: "Company RC ID",
      hide: true,
    },
    {
      field: "is_approved",
      headerName: "Status",
      valueGetter: (params) =>
        // eslint-disable-next-line no-nested-ternary
        params.row.is_approved.Valid
          ? params.row.is_approved?.Bool
            ? "Approved"
            : "Rejected"
          : "Pending",
    },
    {
      field: "deadline",
      headerName: "Application Deadline",
      valueGetter(params) {
        return `${
          params.row.deadline === 0
            ? "Date not Set"
            : new Date(params.value).toLocaleString()
        }`;
      },
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "hide_details",
      headerName: "Deatils Hidden",
    },
    {
      field: "action_taken_by",
      headerName: "Action taken By",
      valueParser: (value) => value?.split("@")[0],
      hide: true,
    },
    {
      field: "active_hr",
      headerName: "Active HR",
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
      field: "Actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Button
          onClick={() => {
            router.push(
              `/admin/rc/${params.row.recruitment_cycle_id}/proforma/${params.row.ID}`
            );
          }}
          variant="contained"
          color="primary"
        >
          View Proforma
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await requestProforma.getAll(token, rid);
      setProformas(response);
    };
    if (router.isReady) fetchData();
  }, [rid, router.isReady, token]);

  return (
    <div>
      <Meta title={`Proforma List - ${rcName}`} />
      <h2>Proforma</h2>
      <DataGrid rows={proformas} columns={columns} getRowId={(row) => row.ID} />
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
