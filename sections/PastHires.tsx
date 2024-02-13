import { IconButton, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import ActiveButton from "@components/Buttons/ActiveButton";
import {
  getCompanyRecruitCountRequest,
  getCompanyStatsRequest,
} from "@callbacks/admin/rc/proforma";
import useStore from "@store/store";
import { getDeptProgram } from "@components/Parser/parser";
import { getCompanyRCIDRequest } from "@callbacks/admin/rc/rc";

const PastHireColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
  },
  {
    field: "rid",
    headerName: "RecruitmentCycleID",
    width: 150,
  },

  {
    field: "RecruitmentDrive",
    headerName: "Recruitment Drive",
    width: 375,
  },
  {
    field: "TotalHires",
    headerName: "No. of Total Hires",
    width: 300,
  },
  {
    field: "PIOPPO",
    headerName: "No. of PIO/PPO",
    width: 300,
  },
  {
    field: "ViewStudents",
    headerName: "View Students",
    width: 300,
    renderCell: () => (
      <Stack
        direction="row"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
      >
        <ActiveButton sx={{ height: 30 }}>CLICK HERE</ActiveButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Stack>
    ),
  },
];
const PastHireDataColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "profile",
    headerName: "Profile",
    width: 375,
  },
  {
    field: "email",
    headerName: "Email",
    hide: true,
    width: 300,
  },
  {
    field: "roll_no",
    headerName: "Roll No.",
    width: 300,
  },
  {
    field: "Program Department",
    headerName: "Branch",
    sortable: false,
    valueGetter: (params) => getDeptProgram(params.row.program_department_id),
  },
];

function PastHires() {
  const { token } = useStore();
  const router = useRouter();
  const companyId = router.query.companyId?.toString() || "";
  const [showGrid, setShowGrid] = useState(false);
  const [rows, setRows] = useState<any>({ student: [] });
  const [pastHireRows, setPastRows] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  // Add a function to handle button click
  const handleButtonClick = async (id: number, cid: number) => {
    setLoading(true);
    setShowGrid(true);
    let response = await getCompanyStatsRequest.get(
      token,
      id.toString(),
      cid.toString()
    );
    if (response.student) {
      setRows(response);
    } else {
      setRows({ student: [] });
    }
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    const getRCs = async () => {
      let response = await getCompanyRCIDRequest.get(token, companyId);
      const newPastHireRows: {
        id: any;
        rid: any;
        RecruitmentDrive: any;
        TotalHires: any;
        PIOPPO: any;
      }[] = [];

      const cidArray: number[] = [];
      for (let i = 0; i < response.length; i += 1) {
        cidArray.push(response[i].id);
      }
      let countResponse: any = await getCompanyRecruitCountRequest.post(
        token,
        cidArray
      );
      console.log(countResponse);
      for (let i = 0; i < response.length; i += 1) {
        newPastHireRows.push({
          id: response[i].id,
          rid: response[i].recruitment_cycle_id,
          RecruitmentDrive: `${response[i].type} ${response[i].phase}`,
          TotalHires: countResponse.recruitCounts[response[i].id] || 0,
          PIOPPO: countResponse.ppoCount[response[i].id] || 0,
        });
      }
      setPastRows(newPastHireRows);
      setLoading(false);
    };
    getRCs();
  }, [token, companyId]);

  return (
    <div>
      <Stack>
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          justifyContent="space-between"
        >
          <h2>Past Hires</h2>
          <div>
            {showGrid && (
              <IconButton
                onClick={() => {
                  setShowGrid(false);
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
          </div>
        </Stack>
      </Stack>
      {showGrid ? (
        <DataGrid
          rows={rows.student}
          columns={PastHireDataColumns}
          getRowId={(row) => row.id}
          loading={loading}
        />
      ) : (
        <DataGrid
          rows={pastHireRows}
          columns={PastHireColumns}
          onCellClick={(param) => {
            handleButtonClick(param.row.rid, param.row.id);
          }}
          loading={loading}
        />
      )}
    </div>
  );
}
export default PastHires;