import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Link from "next/link";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import useStore from "@store/store";
import sProformaRequest, {
  ProformaParams,
} from "@callbacks/student/rc/proforma";
import resumeRequest, {
  AllStudentResumeResponse,
} from "@callbacks/student/rc/resume";

const ROUTE_PREFIX = "/student/rc/[rcid]";

function Openings() {
  // const [age, setAge] = useState("");
  const { token } = useStore();
  const router = useRouter();
  const { rcid } = router.query;
  const rid = rcid as string;
  const [rows, setRows] = useState<ProformaParams[]>([]);
  const [resumes, setResume] = useState<AllStudentResumeResponse[]>([]);
  const [selected, setSelected] = useState<string[]>(
    Array(rows.length).fill("")
  );
  const columns: GridColDef[] = [
    {
      field: "ID",
      headerName: "ID",
      hide: true,
    },
    { field: "company_name", headerName: "Company Name" },
    { field: "role", headerName: "Role Name" },
    { field: "profile", headerName: "Profile" },
    {
      field: "deadline",
      headerName: "Application Deadline",
      renderCell(params) {
        return new Date(params.value).toLocaleString();
      },
    },
    {
      field: "proforma",
      headerName: "Proforma",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Button
          sx={{ width: "100%" }}
          href={`/student/rc/${rid}/proforma/${params.row.ID}`}
          variant="contained"
          color="primary"
        >
          View{" "}
        </Button>
      ),
    },
    {
      field: "resume",
      headerName: "Select Resume",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            id={params.row.ID.toString()}
            name={params.row.ID.toString()}
            defaultValue=""
            label="Resume"
            value={selected[params.row.ID]}
            onChange={(e) => {
              let temp = [...selected];
              temp[params.row.ID] = e.target.value;
              setSelected(temp);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {resumes.map((resume) => {
              if (resume.verified.Bool && resume.verified.Valid) {
                return <MenuItem value={resume.ID}>{resume.ID}</MenuItem>;
              }
              return null;
            })}
          </Select>
        </FormControl>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Link
          href={{
            pathname: `${ROUTE_PREFIX}/opening/[openingId]/apply`,
            query: {
              rcid: rid,
              openingId: params.row.ID,
              rsid: selected[params.row.ID],
            },
          }}
        >
          <Button
            disabled={selected[params.row.ID] === ""}
            sx={{ width: "100%" }}
            variant="contained"
            color="primary"
          >
            Apply
          </Button>
        </Link>
      ),
    },
  ];

  useEffect(() => {
    const getProforma = async () => {
      const res = await sProformaRequest.getAllOpenings(token, rid);
      setRows(res);
      setSelected(Array(res.length).fill(""));
    };
    const getResume = async () => {
      const resume = await resumeRequest.get(token, rid);
      setResume(resume);
    };
    if (router.isReady) {
      getProforma();
      getResume();
    }
  }, [rid, router.isReady, token]);
  return (
    <div>
      <Meta title="RC - Openings" />
      <Stack>
        <h2>Job Openings</h2>
        <DataGrid rows={rows} columns={columns} getRowId={(row) => row.ID} />
      </Stack>
    </div>
  );
}

Openings.layout = "studentPhaseDashboard";
export default Openings;
