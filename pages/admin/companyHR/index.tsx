import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";

import CompanyHRRequest, {
  CompanyHR,
} from "@callbacks/admin/companyHR/adminCompanyHR";
import useStore from "@store/store";
import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";

const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
    hide: true,
  },
  {
    field: "name",
    headerName: "Name",
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <div>{params.value}</div>
      </Tooltip>
    ),
  },
  {
    field: "email",
    headerName: "Email",
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
    headerName: "Updated At",
    hide: true,
  },
  {
    field: "phone",
    headerName: "Phone",
  },
  {
    field: "designation",
    headerName: "Designation",
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <div>{params.value}</div>
      </Tooltip>
    ),
  },
];

function Index() {
  const [rows, setRows] = useState<CompanyHR[]>([]);
  const { token } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const companyHR = await CompanyHRRequest.getAll(token).catch(() => []);
      setRows(companyHR);

      setLoading(false);
    };
    fetch();
  }, [token]);

  return (
    <div>
      <Meta title="Master Company-HR Database - Admin" />
      <h2>Master Database (Company HR)</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.ID}
        loading={loading}
      />
    </div>
  );
}

Index.layout = "adminDashBoard";
export default Index;
