import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import ActiveButton from "@components/Buttons/ActiveButton";
import rcRequest, { RC } from "@callbacks/company/rc/rc";
import useStore from "@store/store";
import companyRequest from "@callbacks/company/company";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "name",
    headerName: "Recruitment Drive Name",
    width: 400,
  },
  {
    field: "is_active",
    headerName: "Status",
    width: 200,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Link href={`/company/rc/${params.row.id}`}>
        <ActiveButton sx={{ height: 30, width: "100%" }}>View</ActiveButton>
      </Link>
    ),
  },
];
function Overview(): JSX.Element {
  const { token, setRCName, setName } = useStore();
  const [rows, setRows] = useState<RC[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(Overview.companyName);
    const getRC = async () => {
      setLoading(true);
      const response = await rcRequest.getAll(token);
      if (response?.length > 0) setRows(response);
      setLoading(false);
    };
    const getCompany = async () => {
      const response = await companyRequest.get(token);
      setName(response.name);
      Object.assign(Overview, { companyName: response.name });
    };

    if (token !== "") {
      getRC();
      getCompany();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="container">
      <Meta title="Company Dashboard - Overview" />
      <Stack>
        <h1>Dashboard</h1>
        <h2>Recruitment Cycle</h2>
        <DataGrid
          rows={rows}
          columns={columns}
          onCellClick={(params) => {
            setRCName(params.row.name);
          }}
          loading={loading}
        />
      </Stack>
    </div>
  );
}

Overview.layout = "companyDashboard";
export default Overview;
