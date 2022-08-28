import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import addCompanyRequest, { HR } from "@callbacks/admin/company/company";
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

function AddHRMD({
  handleCloseNew,
}: {
  handleCloseNew: () => void;
}): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HR>();
  const { token } = useStore();
  const router = useRouter();
  const CID = router.query.companyId;
  const [enable, setEnable] = useState(false);
  useEffect(() => {
    if (router.isReady) {
      setEnable(true);
    }
  }, [router.isReady]);
  const ID = (CID || "").toString();
  const onSubmit = async (data: HR) => {
    const response = await addCompanyRequest.addHR(
      { ...data, company_id: parseInt(ID, 10) },
      token
    );
    if (response) {
      reset({
        name: "",
        email: "",
        phone: "",
        designation: "",
      });
      handleCloseNew();
      window.location.reload();
    }
  };

  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h2>Add HR</h2>
        <TextField
          label="HR Name"
          id="HRName"
          error={!!errors.name}
          variant="standard"
          {...register("name", {
            required: true,
            setValueAs: (value) => value.trim(),
          })}
        />
        <TextField
          label="Email"
          id="email"
          error={!!errors.email}
          variant="standard"
          {...register("email", {
            required: true,
            setValueAs: (value) => value.trim().toLowerCase(),
          })}
        />
        <TextField
          label="Phone"
          id="phone"
          error={!!errors.phone}
          variant="standard"
          {...register("phone", {
            required: true,
            setValueAs: (value) => value.trim(),
          })}
        />
        <TextField
          label="Designation"
          id="designation"
          error={!!errors.designation}
          variant="standard"
          {...register("designation", {
            required: true,
            setValueAs: (value) => value.trim(),
          })}
        />
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
            disabled={!enable}
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
                email: "",
                phone: "",
                designation: "",
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

export default AddHRMD;
