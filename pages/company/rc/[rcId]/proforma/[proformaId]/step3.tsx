import Meta from "@components/Meta";
import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import styles from "@styles/adminPhase.module.css";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const ROUTE = "/company/rc/[rcId]/proforma/[proformaId]/step4";

function Step3() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { rcId } = router.query;
  const handleNext = (data: any) => {
    console.log(data);
    reset({
      costToCompany: "",
      packageDetails: "",
      bond: "false",
      bondDetails: "",
      medicalRequirements: "",
    });
    router.push({
      pathname: ROUTE,
      query: { rcId, proformaId: 1 },
    });
  };
  return (
    <div className={styles.container}>
      <Meta title="Step 3/5 - Package Details" />
      <h1>Internship 2022-23 Phase 1</h1>
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "330px", sm: "600px", margin: "0px auto" },
        }}
      >
        <Stack spacing={3}>
          <h1>Step 3/5 : Package Details</h1>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Cost to Company</p>
            <TextField
              id="Cname"
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              variant="standard"
              error={errors.costToCompany}
              helperText={errors.costToCompany && "This field is required"}
              {...register("costToCompany", { required: true })}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Package Details</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              variant="standard"
              error={errors.packageDetails}
              helperText={errors.packageDetails && "This field is required"}
              {...register("packageDetails", { required: true })}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <Stack direction="row" spacing={3}>
              <p style={{ fontWeight: 300 }}>Bond</p>
              <FormControlLabel
                label=""
                control={<Checkbox {...register("bond")} />}
              />
            </Stack>
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Bond Details</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              minRows={3}
              variant="standard"
              error={errors.bondDetails}
              helperText={errors.bondDetails && "This field is required"}
              {...register("bondDetails", { required: true })}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Medical Requirements</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              minRows={4}
              variant="standard"
              error={errors.medicalRequirements}
              helperText={
                errors.medicalRequirements && "This field is required"
              }
              {...register("medicalRequirements", { required: true })}
            />
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
              Next
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

Step3.layout = "companyPhaseDashboard";
export default Step3;
