import { Button, Card, FormControl, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import styles from "@styles/adminPhase.module.css";
import Meta from "@components/Meta";
import RichTextEditor from "@components/Editor/RichText";
import newProforma from "@callbacks/company/jpnew";
import useStore from "@store/store";

const ROUTE = "/company/rc/[rcId]/proforma/[proformaId]/step2";
function ProformaNew() {
  const [value, onChange] = useState("");
  const { token } = useStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { rcId } = router.query;
  const rid = (rcId || "").toString();

  const handleNext = async (data: any) => {
    const tosend = await { ...data, job_description: value };
    await newProforma.postStep1(token, rid, tosend).then((res) => {
      console.log(res);
      reset({
        company_name: "",
        nature_of_business: "",
        tentative_job_location: "",
      });
      onChange("");
      router.push({
        pathname: ROUTE,
        query: { rcId, proformaId: 1 },
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
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              variant="standard"
              error={errors.companyName}
              helperText={errors.companyName && "This field is required"}
              {...register("company_name", { required: true })}
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
              error={errors.natureOfBusiness}
              helperText={errors.natureOfBusiness && "This field is required"}
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
              error={errors.tentativeJobLocation}
              helperText={
                errors.tentativeJobLocation && "This field is required"
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
