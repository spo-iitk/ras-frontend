import { IconButton, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React , { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/router";
import useStore from "@store/store";


import DataGrid from "@components/DataGrid";
import ActiveButton from "@components/Buttons/ActiveButton";
import StudentRequest from "@callbacks/admin/rc/proforma/students";


const PastHireColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
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
// const { token } = useStore();
// const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoid2ViMjMuYXNoaXNoQHNwby5paXRrIiwicm9sZV9pZCI6MTAyLCJleHAiOjE2OTM0NzgzNDQsImlhdCI6MTY5MzQ2NjM0NCwiaXNzIjoicmFzIn0.exqa0Nm-OCVfgFWCgdmQGcbmdPutzoNiotCxO1wD13k"
// const router = useRouter();
// const {  proformaid } = router.query;
// // const proformaid=965
// const rcid=5;
// const rid = rcid as string;
  // const pid = proformaid as string;

// const [pastHireRows,setPastHire]=useState<any>([]);;
// const fetch=async()=>{
//   const response = await StudentRequest.get(token, "5", "965");
//       if (response) setPastHire(response);
// }
const pastHireRows= [{
  id: "5",
  RecruitmentDrive:"5",
  TotalHires:"644",
  PIOPPO:"674",


}];
// useEffect(()=>{
//   console.log(token);
// },[token])
function PastHires(params: { data: []; isLoading: boolean }) {
  return (
    <div>
      <h2>Past Hires</h2>
      <DataGrid rows={pastHireRows} columns={PastHireColumns} />
    </div>
  );
}
export default PastHires;
