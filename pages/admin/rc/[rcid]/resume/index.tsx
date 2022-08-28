import { Button, Container, Modal, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import Clarification from "@components/Modals/clarification";
import Meta from "@components/Meta";
import adminResumeRequest, {
  AllStudentResumeResponse,
} from "@callbacks/admin/rc/student/resumes";
import useStore from "@store/store";
import { CDN_URL } from "@callbacks/constants";

const transformName = (name: string) => {
  const nname = name.replace(`${CDN_URL}/view/`, "");
  const nameArray = nname.split(".");
  const newName = nameArray[0].slice(14, -33);
  const newNameWithExtension = `${newName}.${nameArray[1]}`;
  return newNameWithExtension;
};

const getURL = (url: string) => `${CDN_URL}/view/${url}`;

function AcceptResumeButton(props: {
  id: string;
  updateCallback: () => Promise<void>;
}) {
  const { token } = useStore();
  const { id, updateCallback } = props;
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
        adminResumeRequest
          .putVerify(token, rid, id, { verified: true })
          .then(() => {
            updateCallback();
          });
      }}
    >
      Accept
    </Button>
  );
}

function RejectResumeButton(props: {
  id: string;
  updateCallback: () => Promise<void>;
}) {
  const { token } = useStore();
  const { id, updateCallback } = props;
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  return (
    <Button
      variant="contained"
      onClick={() => {
        adminResumeRequest
          .putVerify(token, rid, id, { verified: false })
          .then(() => {
            updateCallback();
          });
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
  const { token, rcName } = useStore();
  useEffect(() => {
    const fetchData = async () => {
      if (rid === undefined || rid === "") return;
      const res = await adminResumeRequest.getAll(token, rid);
      if (res !== null && res?.length > 0) setAllResumes(res);
      else setAllResumes([]);
    };
    fetchData();
  }, [token, rid]);

  const updateTable = React.useCallback(async () => {
    if (rid === undefined || rid === "") return;
    const res = await adminResumeRequest.getAll(token, rid);
    if (res !== null && res?.length > 0) setAllResumes(res);
    else setAllResumes([]);
  }, [token, rid]);

  const columns: GridColDef[] = [
    {
      field: "rsid",
      headerName: "Resume ID",
    },
    {
      field: "CreatedAt",
      headerName: "Created At",
      hide: true,
    },
    {
      field: "UpdatedAt",
      headerName: "Updated At",
      hide: true,
    },
    {
      field: "name",
      headerName: "Student Name",
    },
    {
      field: "email",
      headerName: "Student Email",
    },
    {
      field: "roll_no",
      headerName: "Student Roll No",
    },
    {
      field: "resume",
      headerName: "Resume Link",
      sortable: false,
      align: "center",
      width: 400,
      headerAlign: "center",
      valueGetter: (params) => getURL(params?.value),
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={() => {
            window.open(params.value, "_blank");
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
              <Clarification
                handleCloseNew={handleCloseNew}
                studentID={params.row.sid}
                context={`Your resume ${getURL(params?.row?.resume)}`}
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
          <AcceptResumeButton
            id={cellValues.id as string}
            updateCallback={updateTable}
          />
          <RejectResumeButton
            id={cellValues.id.toString()}
            updateCallback={updateTable}
          />
        </Container>
      ),
    },
  ];

  return (
    <div>
      <Meta title={`Resume Dashboard - ${rcName}`} />
      <Grid container alignItems="center">
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
