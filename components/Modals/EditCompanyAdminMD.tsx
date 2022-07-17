import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import addCompanyRequest, { Company } from "@callbacks/admin/company/company";
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

function EditCompanyMD({
  handleCloseNew,
  setCompanyData,
  companyData,
  companyID,
}: {
  handleCloseNew: () => void;
  setCompanyData: React.Dispatch<React.SetStateAction<Company>>;
  companyData: Company;
  companyID: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Company>({
    defaultValues: companyData,
  });
  const { token } = useStore();
  const onSubmit = (data: Company) => {
    if (companyID === undefined || companyID === "") return;
    const editCompanyData = async () => {
      const response = await addCompanyRequest.update(token, data);
      if (response) {
        reset({
          name: "",
          tags: "",
          website: "",
          description: "",
        });
      }
      const fetchCompanyDetails = async () => {
        let companydata = await addCompanyRequest.get(token, companyID);
        setCompanyData(companydata);
      };
      fetchCompanyDetails();
    };
    editCompanyData();
    handleCloseNew();
  };

  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h2>Edit Company</h2>
        <TextField
          label="Company Name"
          id="companyName"
          error={!!errors.name}
          variant="standard"
          {...register("name")}
        />
        <TextField
          label="Tags"
          id="tags"
          error={!!errors.tags}
          variant="standard"
          {...register("tags")}
        />
        <TextField
          label="Website"
          id="website"
          error={!!errors.website}
          variant="standard"
          {...register("website")}
        />
        <TextField
          label="Description"
          id="description"
          error={!!errors.description}
          variant="standard"
          {...register("description")}
        />
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
            onClick={handleSubmit(onSubmit)}
          >
            Edit
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

EditCompanyMD.layout = "adminPhaseDashBoard";
export default EditCompanyMD;
