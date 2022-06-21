import { Button, Card, FormControl, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import styles from "@styles/adminPhase.module.css";
import Meta from "@components/Meta";
import RichTextEditor from "@components/Editor/RichText";
import proformaRequest, {
  NewProformaResponse,
  ProformaType,
} from "@callbacks/company/proforma";
import useStore from "@store/store";

const ROUTE = "/company/rc/[rcId]/proforma/[proformaId]/step2";

function ProformaNew() {
  const [value, onChange] = useState("");
  const { token, name } = useStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProformaType>({
    defaultValues: { company_name: name },
  });
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();

  const handleNext = async (data: ProformaType) => {
    const info: ProformaType = {
      ...data,
      job_description: value,
      recruitment_cycle_id: parseInt(rid, 10),
    };
    await proformaRequest
      .post(token, rid, info)
      .then((res: NewProformaResponse) => {
        reset({
          company_name: "",
          nature_of_business: "",
          tentative_job_location: "",
        });
        onChange("");
        router.push({
          pathname: ROUTE,
          query: { rcId: rid, proformaId: res.pid },
        });
      });
  };

  return (
    <div className={styles.container}>
      <Meta title="Step 1/5 - Basic Details" />
      <h1>Internship 2022-23 Phase 1</h1>
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "330px", sm: "600px", margin: "0px auto" },
        }}
      >
        <Stack spacing={3}>
          <h1>Step 1/5 : Basic Details</h1>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Company Name</p>
            <TextField
              id="Cname"
              disabled
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              variant="standard"
              {...register("company_name")}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Nature of Business</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              variant="standard"
              error={!!errors.nature_of_business}
              helperText={errors.nature_of_business && "This field is required"}
              {...register("nature_of_business", { required: true })}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Tentative Job Location</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              variant="standard"
              error={!!errors.tentative_job_location}
              helperText={
                errors.tentative_job_location && "This field is required"
              }
              {...register("tentative_job_location", { required: true })}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Job Description</p>
            <RichTextEditor
              value={value}
              onChange={onChange}
              style={{ minHeight: 200 }}
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
              disabled={!router.isReady || rid === ""}
              onClick={handleSubmit(handleNext)}
            >
              Next
            </Button>
            <Button
              variant="contained"
              sx={{ width: "50%" }}
              onClick={() => {
                reset({
                  company_name: "",
                  nature_of_business: "",
                  tentative_job_location: "",
                });
                onChange("");
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

ProformaNew.layout = "companyPhaseDashboard";
export default ProformaNew;
