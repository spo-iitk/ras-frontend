import { Button, Card, FormControl, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import RichTextEditor from "@components/Editor/RichText";
import proformaRequest, {
  NewProformaResponse,
  ProformaType,
} from "@callbacks/company/proforma";
import useStore from "@store/store";

const ROUTE = "/company/rc/[rcId]/proforma/[proformaid]/step2";

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
          role: "",
          tentative_job_location: "",
        });
        onChange("");
        router.push({
          pathname: ROUTE,
          query: { rcId: rid, proformaid: res.pid },
        });
      });
  };

  return (
    <div>
      <Meta title="New Proforma" />
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "330px", sm: "600px", margin: "0px auto" },
        }}
      >
        <Stack spacing={3}>
          <h2>Step 1/5 : Basic Details</h2>
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
              id="NatureOfBusiness"
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              variant="standard"
              error={!!errors.role}
              helperText={errors.role && "This field is required"}
              {...register("role", { required: true })}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Profile</p>
            <TextField
              id="Profile"
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              variant="standard"
              error={!!errors.profile}
              helperText={errors.profile && "This field is required"}
              {...register("profile", { required: true })}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Tentative Job Location</p>
            <TextField
              id="TentativeJobLoaction"
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
                  role: "",
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
