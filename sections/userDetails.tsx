import React from "react";
import { GridColDef } from "@mui/x-data-grid";

import Meta from "@components/Meta";
import DataGrid from "@components/DataGrid";
import { userDetailsType } from "@callbacks/admin/rc/userDetails";
import { Button } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "user_id",
    headerName: "ID",
    hide: true,
  },
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "role_id",
    headerName: "Role",
    // Add value getter here
  },
  {
    field: "is_active",
    headerName: "Active Status",
  },
  {
    field: "last_login",
    headerName: "Last Login",
    width: 150,
    sortable: false,
  },
];

function userDetails(params: { data: userDetailsType[]; isLoading: boolean ; title : string}) {
  const { data, isLoading } = params;
  if (data && data.length > 0)
    return (
      <div>
        <Meta title="User Details" />
        <h2>Users&gt; {params.title}</h2>
        <DataGrid
          rows={data}
          columns={columns}
          loading={isLoading}
          getRowId={(row) => row.user_id}
        />
      </div>
    );
}

userDetails.layout = "adminPhaseDashBoard";
export default userDetails;
