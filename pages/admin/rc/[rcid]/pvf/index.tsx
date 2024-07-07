import {
  Box,
  Button,
  Container,
  FormControl,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CheckIcon from "@mui/icons-material/Check";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import CloseIcon from "@mui/icons-material/Close";

import adminPvfRequest, {
  AllStudentPvfResponse,
} from "@callbacks/admin/rc/pvf";
import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import useStore from "@store/store";
import { CDN_URL } from "@callbacks/constants";
import InactiveButton from "@components/Buttons/InactiveButton";
import ActiveButton from "@components/Buttons/ActiveButton";

const transformName = (name: string) => {
  const nname = name.replace(`${CDN_URL}/view/`, "");
  const nameArray = nname.split(".");
  const newName = nameArray[0].slice(14, -33);
  const newNameWithExtension = `${newName}.${nameArray[1]}`;
  return newNameWithExtension;
};

interface Params {
  row: AllStudentPvfResponse;
}
interface RejectParams {
  open: boolean;
  id: string;
  remarks: string;
}
const getURL = (url: string) => `${CDN_URL}/view/${url}`;
const boxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "white solid 2px",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function RejectPvfButton(props: {
  id: string;
  remarks: string;
  setOpenDeny: React.Dispatch<React.SetStateAction<RejectParams>>;
  updateCallback: () => Promise<void>;
}) {
  const { token } = useStore();
  const { id, remarks, setOpenDeny, updateCallback } = props;
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  return (
    <InactiveButton
      variant="contained"
      onClick={() => {
        adminPvfRequest
          .update(token, rid, {
            remarks,
            ID: Number(id),
            is_verified: { Valid: true, Bool: false },
          } as AllStudentPvfResponse)
          .then(() => {
            updateCallback();
            setOpenDeny({ open: false, id: "0", remarks: "" });
          });
      }}
    >
      Reject
    </InactiveButton>
  );
}
const renderStatusButton = (params: Params) => {
  const { is_verified } = params.row;

  if (!is_verified.Valid) {
    return (
      <Button
        variant="outlined"
        sx={{ borderRadius: "10px", width: "80%" }}
        startIcon={<AvTimerIcon />}
      >
        Pending by SPO
      </Button>
    );
  }

  if (is_verified.Bool) {
    return (
      <Button
        variant="outlined"
        sx={{ borderRadius: "10px", width: "80%", color: "green" }}
        color="success"
        startIcon={<CheckIcon sx={{ color: "green" }} />}
      >
        Accepted
      </Button>
    );
  }

  return (
    <Button
      variant="outlined"
      sx={{ borderRadius: "10px", width: "80%", color: "red" }}
      color="error"
      startIcon={<CloseIcon sx={{ color: "red" }} />}
    >
      Rejected
    </Button>
  );
};

function GenerateAuthButton(props: {
  id: string;
  rid: string;
  isGenerated: boolean;
  updateCallback: () => Promise<void>;
}) {
  const { token } = useStore();
  const { id, rid, isGenerated, updateCallback } = props;
  return (
    <Button
      variant="contained"
      sx={{
        marginInlineEnd: "0.5rem",
      }}
      onClick={() => {
        adminPvfRequest.generateAuth(token, rid, id).then(() => {
          updateCallback();
        });
      }}
    >
      {isGenerated ? "Re-Send Link" : "Send Link"}
    </Button>
  );
}

function Index() {
  const [allPvfs, setAllPvfs] = useState<AllStudentPvfResponse[]>([]);
  const [openDeny, setOpenDeny] = useState<RejectParams>({
    open: false,
    id: "0",
    remarks: "",
  });
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token, rcName } = useStore();
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (rid === undefined || rid === "") return;
      const res = await adminPvfRequest.getAll(token, rid);
      if (res !== null && res?.length > 0) setAllPvfs(res);
      else setAllPvfs([]);
    };
    fetchData();
  }, [token, rid]);

  const updateTable = React.useCallback(async () => {
    if (rid === undefined || rid === "") return;
    const res = await adminPvfRequest.getAll(token, rid);
    if (res !== null && res?.length > 0) setAllPvfs(res);
    else setAllPvfs([]);
  }, [token, rid]);

  const columns: GridColDef[] = [
    {
      field: "ID",
      headerName: "PVF ID",
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
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "iitk_email",
      headerName: "Student Email",
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "roll_no",
      headerName: "Student Roll No",
    },
    {
      field: "mentor_email",
      headerName: "Mentor Email",
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "verified",
      headerName: "Verification Status",
      align: "center",
      headerAlign: "center",
      renderCell: renderStatusButton,
    },
    {
      field: "filename_student",
      headerName: "PVF Link",
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
      field: "pvf",
      headerName: "View PVF",
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <ActiveButton
          href={`/admin/rc/${rid}/pvf/${params.row.ID}`}
          sx={{ height: 30, width: "100%" }}
        >
          View PVF
        </ActiveButton>
      ),
    },
    {
      field: "options",
      headerName: "Genarate Link",
      align: "center",
      headerAlign: "center",
      width: 500,
      renderCell: (cellValues) => {
        if (!cellValues.row.is_verified?.Valid) {
          return (
            <Container>
              <GenerateAuthButton
                isGenerated={!!cellValues.row.is_approved?.Valid}
                rid={rid}
                id={cellValues.id.toString()}
                updateCallback={updateTable}
              />
            </Container>
          );
        }
        return (
          <InactiveButton sx={{ height: 30, width: "100%" }}>
            Action is Taken
          </InactiveButton>
        );
      },
    },
    {
      field: "option",
      headerName: "Reject",
      align: "center",
      headerAlign: "center",
      width: 500,
      renderCell: (cellValues) => {
        if (!cellValues.row.is_verified?.Valid) {
          return (
            <Button
              variant="contained"
              onClick={() => {
                setOpenDeny({
                  open: true,
                  id: cellValues.id.toString(),
                  remarks,
                });
              }}
            >
              Reject
            </Button>
          );
        }
        return (
          <InactiveButton sx={{ height: 30, width: "100%" }}>
            Action is Taken
          </InactiveButton>
        );
      },
    },
  ];

  return (
    <div>
      <Meta title={`PVF Dashboard - ${rcName}`} />
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <h2>PVF</h2>
          </Stack>
        </Grid>

        <DataGrid rows={allPvfs} getRowId={(row) => row.ID} columns={columns} />
        <Modal
          open={openDeny.open}
          onClose={() => {
            setOpenDeny({ open: false, id: "0", remarks: "" });
            setRemarks("");
          }}
        >
          <Box sx={boxStyle}>
            <Box sx={{ textAlign: "center" }}>
              <h2>Confirmation!</h2>
              <Typography sx={{ textAlign: "center" }}>
                You won't be able to change it after confirmation
              </Typography>
            </Box>
            <Stack spacing={2}>
              <FormControl sx={{ m: 1 }}>
                <h4>Write your Remarks</h4>
                <TextField
                  multiline
                  fullWidth
                  minRows={2}
                  // value={row?.remarks}
                  value={remarks}
                  onChange={(e) => {
                    setRemarks(e.target.value);
                  }}
                  InputProps={{
                    style: { textAlign: "center" },
                    // readOnly: true,
                  }}
                />
              </FormControl>

              <Stack justifyContent="center" alignItems="center">
                <RejectPvfButton
                  remarks={remarks}
                  setOpenDeny={setOpenDeny}
                  id={openDeny.id}
                  updateCallback={updateTable}
                />
              </Stack>
            </Stack>
          </Box>
        </Modal>
      </Grid>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
