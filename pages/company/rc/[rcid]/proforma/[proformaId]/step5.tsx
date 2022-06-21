import {
  Button,
  Card,
  FormControl,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import styles from "@styles/adminPhase.module.css";
import Meta from "@components/Meta";

const ROUTE = "/company/rc/[rcId]";

const hrtype = [
  { id: 1, data: "HR1" },
  { id: 1, data: "HR2" },
  { id: 1, data: "HR3" },
];
function Step5() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { rcid } = router.query;
  const handleNext = (data: any) => {
    console.log(data);
    reset({
      eligibilityCriteria: "",
      message: "",
      activeHR: "",
    });
    router.push({
      pathname: ROUTE,
      query: { rcId: rcid },
    });
  };
  return (
    <div className={styles.container}>
      <Meta title="Step 5/5 - Additional Information" />
      <h1>Internship 2022-23 Phase 1</h1>
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "330px", sm: "600px", margin: "0px auto" },
        }}
      >
        <Stack spacing={3}>
          <h1>Step 5/5 : Additional Information</h1>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Additional Eligibility Criteria</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              minRows={3}
              variant="standard"
              error={errors.eligibilityCriteria}
              helperText={
                errors.eligibilityCriteria && "This field is required!"
              }
              {...register("eligibilityCriteria", { required: true })}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Message for Placement Coordinator</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              minRows={5}
              variant="standard"
              error={errors.message}
              helperText={errors.message && "This field is required!"}
              {...register("message", { required: true })}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Select Active HR</p>
            <TextField
              id="hrtype"
              required
              select
              fullWidth
              variant="standard"
              error={errors.activeHR}
              helperText={errors.activeHR && "This field is required!"}
              {...register("activeHR", { required: true })}
            >
              <MenuItem value="">Select</MenuItem>
              {hrtype.map((val) => (
                <MenuItem value={val.data} key="q1">
                  {val.data}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <Stack
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              sx={{ width: "50%" }}
              onClick={handleSubmit(handleNext)}
            >
              Submit
            </Button>
            <Button variant="contained" sx={{ width: "50%" }}>
              Reset
            </Button>
          </Stack>
        </Stack>
      </Card>
    </div>
  );
}

Step5.layout = "companyPhaseDashboard";
export default Step5;
