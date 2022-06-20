import {
  Button,
  Card,
  FormControl,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import styles from "@styles/adminPhase.module.css";
import Meta from "@components/Meta";
import useStore from "@store/store";
import proformaRequest, { ProformaParams } from "@callbacks/company/proforma";

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
  } = useForm<ProformaParams>();
  const router = useRouter();
  const { rcid, proformaId } = router.query;
  const rid = (rcid || "").toString();
  const pid = (proformaId || "").toString();
  const { token } = useStore();
  const handleNext = async (data: ProformaParams) => {
    const info = {
      ...data,
      ID: parseInt(pid, 10),
    };
    await proformaRequest.put(token, rid, info).then(() => {
      reset({
        eligibility_criteria: "",
        message: "",
        active_HR: "",
      });
      router.push({
        pathname: ROUTE,
        query: { rcId: rid },
      });
    });
  };
  useEffect(() => {
    const getStep5 = async () => {
      const data = await proformaRequest.get(token, rid, pid);
      console.log(data);
      //   setStep1(data);
    };
    getStep5();
  }, [rid, pid, token]);

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
              error={!!errors.eligibility_criteria}
              helperText={
                errors.eligibility_criteria && "This field is required!"
              }
              {...register("eligibility_criteria", { required: true })}
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
              error={!!errors.message}
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
              error={!!errors.active_HR}
              helperText={errors.active_HR && "This field is required!"}
              {...register("active_HR", { required: true })}
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
              disabled={!router.isReady || rid === ""}
              onClick={handleSubmit(handleNext)}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              sx={{ width: "50%" }}
              onClick={() => {
                reset({
                  eligibility_criteria: "",
                  message: "",
                  active_HR: "",
                });
              }}
            >
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
