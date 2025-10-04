import React, { useEffect, useState } from "react";
import { Button, Stack, Tooltip } from "@mui/material";
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
import { ProformaEvent } from "@callbacks/company/proforma";

const ROUTE_PREFIX = "/student/rc/[rcid]";

function Openings() {
  // const [age, setAge] = useState("");
  const { token } = useStore();
  const router = useRouter();
  const { rcid } = router.query;
  const rid = rcid as string;
  const [rows, setRows] = useState<ProformaParams[]>([]);
  const [row2, setRow2] = useState<
    (ProformaEvent & { company_name: string })[]
  >([]);
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
    {
      field: "company_name",
      headerName: "Company Name",
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "role",
      headerName: "Role Name",
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "profile",
      headerName: "Profile",
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "deadline",
      headerName: "Application Deadline",
      renderCell: ({ value }) => `${new Date(value).toLocaleString("en-GB")}`,
      type: "dateTime",
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
              if (
                resume.verified.Bool &&
                resume.verified.Valid &&
                resume.resume_type === "SINGLE"
              ) {
                return (
                  <MenuItem value={resume.ID} key={resume.ID}>
                    {`${resume.ID}${
                      (resume as any).resume_tag
                        ? `_${(resume as any).resume_tag}`
                        : ""
                    }`}
                  </MenuItem>
                );
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
            pathname: `${ROUTE_PREFIX}/opening/[openingId]/application`,
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
  const walkInColumns: GridColDef[] = [
    {
      field: "ID",
      headerName: "ID",
      hide: true,
    },
    {
      field: "company_name",
      headerName: "Company Name",
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "start_time",
      headerName: "Start Time",
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "duration",
      headerName: "Duration",
      renderCell: ({ value }) => `${value}`,
      type: "dateTime",
    },
    {
      field: "proforma_id",
      headerName: "Proforma",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Button
          sx={{ width: "100%" }}
          href={`/student/rc/${rid}/proforma/${params.row.proforma_id}`}
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
              if (
                resume.verified.Bool &&
                resume.verified.Valid &&
                resume.resume_type === "SINGLE"
              ) {
                return (
                  <MenuItem value={resume.ID} key={`m2-${resume.ID}`}>
                    {`${resume.ID}${
                      (resume as any).resume_tag
                        ? `_${(resume as any).resume_tag}`
                        : ""
                    }`}
                  </MenuItem>
                );
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
            pathname: `${ROUTE_PREFIX}/opening/[openingId]/walkin`,
            query: {
              rcid: rid,
              openingId: params.row.proforma_id,
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
    const getEvents = async (res: ProformaParams[]) => {
      let walkIns: (ProformaEvent & { company_name: string })[] = [];
      await Promise.all(
        res.map(async (proforma) => {
          const ID = (proforma.ID || "").toString();
          const events = await sProformaRequest.getEvent(token, rid, ID);
          events.forEach((event) => {
            if (event.name === "Walk In") {
              walkIns.push({ ...event, company_name: proforma.company_name });
            }
          });
        })
      );
      setRow2(walkIns);
    };
    const getProforma = async () => {
      const res = await sProformaRequest.getAllOpenings(token, rid);
      setRows(res);
      setSelected(Array(res.length).fill(""));
      getEvents(res);
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
      <Stack spacing={2}>
        <h2>Job Openings</h2>
        <DataGrid
          heighted
          rows={rows}
          columns={columns}
          getRowId={(row) => row.ID}
        />
        <h2>Walk Ins</h2>
        <DataGrid
          heighted
          rows={row2}
          columns={walkInColumns}
          getRowId={(row) => row.ID}
        />
      </Stack>
    </div>
  );
}

Openings.layout = "studentPhaseDashboard";
export default Openings;
