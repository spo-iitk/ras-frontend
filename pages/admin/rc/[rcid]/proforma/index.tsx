import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import requestProforma, {
  AdminProformaType,
} from "@callbacks/admin/rc/adminproforma";
import useStore from "@store/store";

const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
    hide: true,
  },
  { field: "company_name", headerName: "Company Name" },
  {
    field: "CreatedAt",
    headerName: "Created At",
    hide: true,
  },
  {
    field: "UpdatedAt",
    headerName: "Last Updated",
    renderCell: (rowData) => new Date(rowData.value).toLocaleString(),
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
    renderCell: (params) =>
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
    renderCell(params) {
      return `${
        params.row.deadline === 0
          ? "Date not Set"
          : new Date(params.value).toLocaleString()
      }`;
    },
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
  { field: "active_hr", headerName: "Active HR" },
  { field: "role", headerName: "Role Name" },
  { field: "profile", headerName: "Profile" },
  {
    field: "Actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => (
      <Link
        href={{
          pathname: `/admin/rc/[rcid]/proforma/[pid]`,
          query: {
            rcid: params.row.recruitment_cycle_id,
            pid: params.row.ID,
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
function Index() {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = rcid as string;

  const { token } = useStore();

  const [proformas, setProformas] = useState<AdminProformaType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await requestProforma.getAll(token, rid);
      setProformas(response);
    };
    if (router.isReady) fetchData();
  }, [rid, router.isReady, token]);

  return (
    <div className="container">
      <Meta title="Proforma" />
      <h2>Proforma</h2>
      <DataGrid rows={proformas} columns={columns} getRowId={(row) => row.ID} />
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
