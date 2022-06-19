import { Button, Card, FormControl, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import styles from "@styles/adminPhase.module.css";
import Meta from "@components/Meta";
import RichTextEditor from "@components/Editor/RichText";

const ROUTE = "/company/rc/[rcId]/proforma/[proformaId]/step2";
function ProformaNew() {
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
      companyName: "",
      natureOfBusiness: "",
      tentativeJobLocation: "",
      jobDescription: "",
    });
    router.push({
      pathname: ROUTE,
      query: { rcId, proformaId: 1 },
    });
  };
  const initialValue =
    "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>";

  const [value, onChange] = useState(initialValue);
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
              {...register("companyName", { required: true })}
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
              {...register("natureOfBusiness", { required: true })}
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
              {...register("tentativeJobLocation", { required: true })}
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
              onClick={() =>
                reset({
                  companyName: "",
                  natureOfBusiness: "",
                  tentativeJobLocation: "",
                  jobDescription: "",
                })
              }
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
