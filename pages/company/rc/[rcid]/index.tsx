import React, { useEffect, useState } from "react";
import { IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import ActiveButton from "@components/Buttons/ActiveButton";
import useStore from "@store/store";
import proformaRequest, { ProformaType } from "@callbacks/company/proforma";
import InactiveButton from "@components/Buttons/InactiveButton";

const ROUTE_PATH = "/company/rc/[rcid]/proforma/[proformaId]";
const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
  },
  {
    field: "UpdatedAt",
    headerName: "Last Updated",
    valueGetter: ({ value }) => value && `${new Date(value).toLocaleString()}`,
  },
  {
    field: "nature_of_business",
    headerName: "Role Type",
  },
  {
    field: "is_approved",
    headerName: "Status",
    valueGetter: ({ value }) => {
      if (value?.Valid) {
        if (value?.Bool) return "Accepted";
        return "Rejected";
      }
      if (!value?.Valid) return "Pending by SPO";
      return "Unkown";
    },
  },
  {
    field: "proforma",
    headerName: "View Proforma",
    width: 200,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Link
        href={{
          pathname: ROUTE_PATH,
          query: {
            rcid: params.row.recruitment_cycle_id,
            proformaId: params.row.ID,
          },
        }}
        passHref
      >
        <ActiveButton sx={{ height: 30, width: "100%" }}>
          View Proforma
        </ActiveButton>
      </Link>
    ),
  },
  {
    field: "delete",
    headerName: "Delete/Edit",
    width: 200,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      if (params.row?.is_approved?.Valid)
        return (
          <InactiveButton sx={{ height: 30, width: "100%" }}>
            Cannot edit
          </InactiveButton>
        );
      return (
        <>
          <DeleteProforma id={params.row.ID} />
          <Link
            href={{
              pathname: `${ROUTE_PATH}/step1`,
              query: {
                rcid: params.row.recruitment_cycle_id,
                proformaId: params.row.ID,
              },
            }}
            passHref
          >
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>
        </>
      );
    },
  },
];

function DeleteProforma(params: { id: string }) {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  const { id } = params;
  return (
    <IconButton
      onClick={() => {
        if (rid === undefined || rid === "") return;
        proformaRequest.delete(token, rid, id);
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}

function Overview() {
  const { rcName, token } = useStore();

  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();

  const [proformas, setProformas] = useState<ProformaType[]>([]);

  useEffect(() => {
    const getall = async () => {
      const data = await proformaRequest.getAll(token, rid);
      setProformas(data);
    };
    if (router.isReady && rid !== "") getall();
  }, [router.isReady, token, rid]);

  return (
    <div className="container">
      <Meta title="Overview - Company" />
      <Stack>
        <h1 suppressHydrationWarning>{rcName}</h1>
        <h2>Overview</h2>

        <DataGrid
          rows={proformas}
          columns={columns}
          getRowId={(row) => row.ID}
        />
      </Stack>
    </div>
  );
}

Overview.layout = "companyPhaseDashboard";
export default Overview;
