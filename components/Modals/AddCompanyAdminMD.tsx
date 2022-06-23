import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import addCompanyRequest, {
  AddCompanyParams,
} from "@callbacks/admin/company/adminCompany";
import useStore from "@store/store";

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

function AddCompanyMD({ handleCloseNew }: { handleCloseNew: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddCompanyParams>();
  const { token } = useStore();
  const onSubmit = async (data: AddCompanyParams) => {
    const response = await addCompanyRequest.post(data, token);
    if (response) {
      reset({
        name: "",
        tags: "",
        website: "",
        description: "",
      });
      handleCloseNew();
      window.location.reload();
    }
  };

  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h1>Add Company</h1>
        <TextField
          label="Company Name"
          id="companyName"
          error={!!errors.name}
          variant="standard"
          {...register("name", {
            required: true,
          })}
        />
        <TextField
          label="Tags"
          id="tags"
          error={!!errors.tags}
          variant="standard"
          {...register("tags", {
            required: true,
          })}
        />
        <TextField
          label="Website"
          id="website"
          error={!!errors.website}
          variant="standard"
          {...register("website", {
            required: true,
          })}
        />
        <TextField
          label="Description"
          id="description"
          error={!!errors.description}
          variant="standard"
          {...register("description", {
            required: true,
          })}
        />
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
            onClick={handleSubmit(onSubmit)}
          >
            Add
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
            onClick={() => {
              reset({
                name: "",
                tags: "",
                website: "",
                description: "",
              });
            }}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

AddCompanyMD.layout = "adminPhaseDashBoard";
export default AddCompanyMD;
