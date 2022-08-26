import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import InactiveButton from "@components/Buttons/InactiveButton";
import rcRequest, { RC } from "@callbacks/student/rc/rc";
import ActiveButton from "@components/Buttons/ActiveButton";
import useStore from "@store/store";
import enrollmentRequest from "@callbacks/student/rc/enrollQuestion";

function LinkButton({ params }: any) {
  const { token } = useStore();
  const [frozen, setFrozen] = useState(false);
  const [frozenStr, setFrozenStr] = useState("Frozen");
  useEffect(() => {
    const fetch = async () => {
      const student = await enrollmentRequest.getStudentRC(
        token,
        params.row.ID
      );
      setFrozen(student.is_frozen || !params.row.is_active);
      if (student.comment !== "") setFrozenStr(student.comment);
    };
    fetch();
  }, [token, params]);
  return (
    <Button
      variant="contained"
      sx={{ width: "100%" }}
      disabled={frozen}
      href={`rc/${params.row.ID}`}
    >
      {frozen ? frozenStr : "View Details"}
    </Button>
  );
}
const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
    hide: true,
  },
  {
    field: "start_date",
    headerName: "Start Date",
  },
  {
    field: "academic_year",
    headerName: "Academic Year",
  },
  {
    field: "name",
    headerName: "Recruitment Drive Name",
  },
  {
    field: "type",
    headerName: "Type of Recruitment",
    hide: true,
  },
  {
    field: "is_active",
    headerName: "Status",

    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <>
        {!params.value && (
          <InactiveButton sx={{ height: 30, width: "100%" }}>
            INACTIVE
          </InactiveButton>
        )}
        {params.value && (
          <ActiveButton sx={{ height: 30, width: "100%" }}>ACTIVE</ActiveButton>
        )}
      </>
    ),
  },
  {
    field: "button",
    headerName: "View Details",
    headerAlign: "center",
    renderCell: (params) => <LinkButton params={params} />,
  },
];

function Overview() {
  const [rows, setRows] = useState<RC[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useStore();
  useEffect(() => {
    const getRC = async () => {
      const response = await rcRequest.getAll(token);

      setLoading(false);
      for (let i = 0; i < response.length; i += 1) {
        response[i].name = `${response[i].type} ${response[i].phase}`;
        response[i].start_date = new Date(
          response[i].start_date
        ).toLocaleDateString("en-GB");
      }
      setRows(response);
    };
    getRC();
  }, [token]);
  return (
    <div>
      <Meta title="Overview - Student Dashboard " />
      <Stack>
        <h2>Recruitment Cycle</h2>

        <DataGrid
          rows={rows}
          getRowId={(row) => row.ID}
          columns={columns}
          loading={loading}
        />
      </Stack>
    </div>
  );
}

Overview.layout = "studentDashboard";
export default Overview;
