import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Box, Grid, IconButton, Modal, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";

import useStore from "@store/store";
import DataGrid from "@components/DataGrid";
import ActiveButton from "@components/Buttons/ActiveButton";
import Meta from "@components/Meta";
import resumeRequest, {
  AllStudentResumeResponse,
} from "@callbacks/student/rc/resume";
import { CDN_URL } from "@callbacks/constants";

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

const gridMain = {
  width: "100%",
  display: "flex",
  alignItems: "right",
  justifyContent: "right",
};

const transformName = (name: string) => {
  const nameArray = name.split(".");
  const newName = nameArray[0].slice(14, -33);
  const newNameWithExtension = `${newName}.${nameArray[1]}`;
  return newNameWithExtension;
};

const getURL = (url: string) => `${CDN_URL}/view/${url}`;

const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "resume",
    headerName: "Resume Link",
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <ActiveButton
        variant="contained"
        color="primary"
        onClick={() => {
          window.open(getURL(params.value), "_blank");
        }}
      >
        {transformName(params.value)}
      </ActiveButton>
    ),
  },
  {
    field: "CreatedAt",
    valueGetter: ({ value }) => value && `${new Date(value).toLocaleString()}`,
    headerName: "Upload Time",
    align: "center",
    headerAlign: "center",
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
      if (!value?.Valid) return "Pending by SPO";
      return "Unkown";
    },
  },
];

function Resume() {
  const router = useRouter();
  const [fileSaved, setFileSaved] = useState<File | null>(null);
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  // eslint-disable-next-line no-unused-vars
  const [allResumes, setAllResumes] = useState<AllStudentResumeResponse[]>([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: { target: { files: any } }) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      setFileSaved(files[0]);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", fileSaved !== null ? fileSaved : new Blob());
    await resumeRequest.post(formData, token, rid);
    setFileSaved(null);
    handleClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (rid === undefined || rid === "") return;
      const data = await resumeRequest.get(token, rid);
      setAllResumes(data);
    };
    fetchData();
  }, [token, rid]);

  return (
    <>
      <div className="container">
        <Meta title="Manage Resume " />
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6}>
            <h1>Manage Resume</h1>
          </Grid>
          <Grid item xs={6} style={gridMain}>
            <div>
              <IconButton onClick={handleOpen}>
                <AddIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <Stack>
          <DataGrid
            rows={allResumes}
            getRowId={(row) => row.ID}
            columns={columns}
          />
        </Stack>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyle}>
          <h1 style={{ margin: "0 auto 25px auto", padding: "0 auto" }}>
            Upload Resume
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              name="file"
              accept="application/pdf"
              onChange={handleChange}
            />
            <button type="submit">Upload</button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
Resume.layout = "studentPhaseDashboard";
export default Resume;
