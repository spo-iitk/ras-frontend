import { Button, Container, Modal, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import ResumeClarification from "@components/Modals/resumeClarification";
import Meta from "@components/Meta";
import adminResumeRequest, {
  AllStudentResumeResponse,
} from "@callbacks/admin/rc/student/resumes";
import useStore from "@store/store";
import { CDN_URL } from "@callbacks/constants";

const transformName = (name: string) => {
  const nameArray = name.split(".");
  const newName = nameArray[0].slice(14, -33);
  const newNameWithExtension = `${newName}.${nameArray[1]}`;
  return newNameWithExtension;
};

const getURL = (url: string) => `${CDN_URL}/view/${url}`;

function AcceptResumeButton(props: { id: string }) {
  const { token } = useStore();
  const { id } = props;
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  return (
    <Button
      variant="contained"
      sx={{
        marginInlineEnd: "0.5rem",
      }}
      onClick={() => {
        adminResumeRequest.putVerify(token, rid, id, { verified: true });
      }}
    >
      Accept
    </Button>
  );
}

function RejectResumeButton(props: { id: string }) {
  const { token } = useStore();
  const { id } = props;
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  return (
    <Button
      variant="contained"
      onClick={() => {
        adminResumeRequest.putVerify(token, rid, id, { verified: false });
      }}
    >
      Reject
    </Button>
  );
}
function Index() {
  const [allResumes, setAllResumes] = useState<AllStudentResumeResponse[]>([]);
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  useEffect(() => {
    const fetchData = async () => {
      if (rid === undefined || rid === "") return;
      const res = await adminResumeRequest.getAll(token, rid);
      setAllResumes(res);
    };
    fetchData();
  }, [token, rid]);

  const columns: GridColDef[] = [
    {
      field: "rsid",
      headerName: "Resume ID",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Student Name",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Student Email",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "resume",
      headerName: "Resume Link",
      sortable: false,
      align: "center",
      width: 400,
      headerAlign: "center",
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={() => {
            window.open(getURL(params.value), "_blank");
          }}
        >
          {transformName(params.value)}
        </Button>
      ),
    },
    {
      field: "verified",
      headerName: "Verification Status",
      align: "center",
      headerAlign: "center",
      valueGetter: ({ value }) => {
        if (value?.Valid) {
          if (value?.Bool) return "Accepted";
          return "Rejected";
        }
        if (!value?.Valid) return "Pending Verification";
        return "Unkown";
      },
    },
    {
      field: "action_taken_by",
      headerName: "Action Taken By",
      align: "center",
      headerAlign: "center",
      hide: true,
    },
    {
      field: "AskClarification",
      headerName: "Ask Clarification",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [openNew, setOpenNew] = useState(false);
        const handleOpenNew = () => {
          setOpenNew(true);
        };
        const handleCloseNew = () => {
          setOpenNew(false);
        };
        return (
          <div>
            <Modal open={openNew} onClose={handleCloseNew}>
              <ResumeClarification
                handleCloseNew={handleCloseNew}
                resumeId={params.row.resumeid}
              />
            </Modal>
            <Button sx={{ height: 30 }} onClick={handleOpenNew}>
              CLICK HERE
            </Button>
          </div>
        );
      },
    },
    {
      field: "options",
      headerName: "",
      align: "center",
      renderCell: (cellValues) => (
        <Container>
          <AcceptResumeButton id={cellValues.id.toString()} />
          <RejectResumeButton id={cellValues.id.toString()} />
        </Container>
      ),
    },
  ];

  return (
    <div className="container">
      <Meta title="Resume Dashboard" />
      <Grid container alignItems="center">
        <h1>Internship 2022-23 Phase 1</h1>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <h2>Resume</h2>
          </Stack>
        </Grid>

        <DataGrid
          rows={allResumes}
          getRowId={(row) => row.rsid}
          columns={columns}
        />
      </Grid>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
