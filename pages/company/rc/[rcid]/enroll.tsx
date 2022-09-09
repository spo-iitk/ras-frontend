import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import useStore from "@store/store";
import companyHRRequest, { CompanyRC, HR } from "@callbacks/company/hr";

const boxStyle = {
  bgcolor: "background.paper",
  margin: 2,
  border: "white solid 2px",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function AddCompany() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyRC>();

  const { token, name } = useStore();
  const [HRs, setHRs] = useState<HR[]>([]);

  const router = useRouter();
  const { rcid } = router.query;
  const rid = rcid as string;

  useEffect(() => {
    const getHRdata = async () => {
      let response = await companyHRRequest.get(token);
      setHRs(response);
    };
    if (token !== "") getHRdata();
  }, [token]);

  const onSubmit = async (data: CompanyRC) => {
    const response = await companyHRRequest.enroll(
      { ...data, company_name: name },
      token,
      rid
    );
    if (response) {
      reset({
        hr1: "",
        hr2: "",
        hr3: "",
      });
      router.push(`/company/rc/${rid}`);
    }
  };

  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h2>Enroll Company</h2>
        <Typography>
          Note: If HR is not listed here then it might be not listed in the
          Registered HR back in dashboard. Add it there first.
        </Typography>
        <Autocomplete
          disablePortal
          id="selectActiveHR1"
          options={HRs.map((row) => ({
            id: row.ID,
            label: `${row.name} | ${row.email}`,
          }))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Active HR 1"
              {...register("hr1", {
                required: true,
              })}
              error={!!errors.hr1}
            />
          )}
        />
        <Autocomplete
          disablePortal
          id="selectActiveHR2"
          options={HRs.map((row) => ({
            id: row.ID,
            label: `${row.name} | ${row.email}`,
          }))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Active HR 2"
              {...register("hr2", {})}
              error={!!errors.hr2}
            />
          )}
        />
        <Autocomplete
          disablePortal
          id="selectActiveHR3"
          options={HRs.map((row) => ({
            id: row.ID,
            label: `${row.name} | ${row.email}`,
          }))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Active HR 3"
              {...register("hr3", {})}
              error={!!errors.hr3}
            />
          )}
        />
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
            onClick={handleSubmit(onSubmit)}
          >
            Enroll
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
            onClick={() => {
              reset({
                company_name: "",
                hr1: "",
                hr2: "",
                hr3: "",
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

AddCompany.layout = "companyPhaseDashboard";
export default AddCompany;
