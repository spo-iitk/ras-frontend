import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Link from "next/link";

import eventRequest, { Event } from "@callbacks/admin/rc/overview";
import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import useStore from "@store/store";

const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
    hide: true,
  },
  {
    field: "company_name",
    headerName: "Company Name",
  },
  {
    field: "role",
    headerName: "Role",
  },
  {
    field: "name",
    headerName: "Event Name",
  },
  {
    field: "CreatedAt",
    headerName: "Created At",
    renderCell: (params) => new Date(params.row.CreatedAt).toLocaleDateString(),
    hide: true,
  },
  {
    field: "UpdatedAt",
    headerName: "Updated At",
    renderCell: (params) => new Date(params.row.UpdatedAt).toLocaleDateString(),
  },
  {
    field: "duration",
    headerName: "Event Duration",
  },
  {
    field: "start_time",
    headerName: "Start Time",
    renderCell: (params) => new Date(params.row.start_time).toLocaleString(),
  },
  {
    field: "sequence",
    headerName: "Sequence",
  },
  {
    field: "View Details",
    renderCell: (params) => (
      <Link
        href={{
          pathname: `/admin/rc/${params.row.recruitment_cycle_id}/event/${params.row.ID}`,
        }}
      >
        <Button variant="contained" style={{ width: "100%" }}>
          View Details
        </Button>
      </Link>
    ),
  },
];
function Index() {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = rcid as string;

  const { token, rcName } = useStore();

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (router.isReady) {
        let response = await eventRequest.getAll(token, rid);
        for (let i = 0; i < response.length; i += 1) {
          response[i].recruitment_cycle_id = rid;
        }
        setEvents(response);
      }
    };
    if (router.isReady) fetchData();
  }, [rid, router.isReady, token]);

  return (
    <div>
      <Meta title={`Events - ${rcName}`} />
      <h2>Events</h2>
      <DataGrid rows={events} columns={columns} getRowId={(row) => row.ID} />
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
