import Meta from "@components/Meta";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "@styles/adminPhase.module.css";
import * as React from "react";
import { useForm } from "react-hook-form";

const Input = styled("input")({
  display: "none",
});

const boxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "330px", md: "500px" },
  bgcolor: "background.paper",
  border: "white solid 2px",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  alignItems: "center",
};

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 100,
  },
  {
    field: "name",
    headerName: "Company Name",
    width: 300,
  },
  {
    field: "publishedDateAndTime",
    headerName: "Published Date And Time",
    width: 200,
  },
];

const rows = [
  { id: 1, name: "Company Name : Title", publishedDateAndTime: "May 26 2019" },
];

function Index() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [openNew, setOpenNew] = React.useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };
  const handleNewNotice = (data: any) => {
    console.log(data);
    reset();
    handleCloseNew();
  };
  return (
    <div className={styles.container}>
      <Meta title="Notices" />
      <Stack>
        <h1>Internship 2022-23 Phase 1</h1>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <h2>Notices</h2>
          <Stack direction="row" spacing={3}>
            <IconButton onClick={handleOpenNew}>
              {/* <Link
                href={{
                  pathname: ROUTE_PATH_ID,
                  query: { rcid: router.query.rcid },
                }}
                passHref
              > */}
              <AddIcon />
              {/* </Link> */}
            </IconButton>
          </Stack>
        </Stack>
        <div
          style={{ height: 500, margin: "0px auto" }}
          className={styles.datagridNotices}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </div>
      </Stack>
      <Modal open={openNew} onClose={handleCloseNew}>
        <Box sx={boxStyle}>
          <Stack spacing={3}>
            <h1>Add Notice</h1>
            <TextField
              label="Company Name"
              id="selectCompany"
              variant="standard"
              error={errors.companyName}
              helperText={errors.companyName && "Company Name is required"}
              {...register("companyName", { required: true })}
            />
            <TextField
              label="Subject"
              id="selectActiveHR"
              variant="standard"
              {...register("subject", { required: true })}
              error={errors.subject}
              helperText={errors.subject && "Subject is required"}
            />
            <TextField
              variant="standard"
              multiline
              rows={3}
              placeholder="Write your notice here"
              label="Message"
              {...register("message", { required: true })}
              error={errors.message}
              helperText={errors.message && "Message is required"}
            />
            <label
              htmlFor="contained-button-file"
              style={{ margin: "30px auto 10px auto" }}
            >
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
              <Button
                variant="outlined"
                component="span"
                sx={{ width: "200px", borderRadius: 5 }}
              >
                Upload
              </Button>
            </label>
            <Stack
              direction="row"
              spacing={2}
              style={{ justifyContent: "center" }}
            >
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                onClick={handleSubmit(handleNewNotice)}
              >
                Add
              </Button>
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                onClick={() =>
                  reset({ companyName: "", subject: "", message: "" })
                }
              >
                Reset
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
