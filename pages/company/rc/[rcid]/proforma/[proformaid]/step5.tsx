import {
  Autocomplete,
  Button,
  Card,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import Meta from "@components/Meta";
import useStore from "@store/store";
import proformaRequest, { ProformaType } from "@callbacks/company/proforma";
import companyRequest, { HR } from "@callbacks/company/company";

const ROUTE = "/company/rc/[rcId]";

function Step5() {
  const router = useRouter();
  const { rcid, proformaid } = router.query;
  const rid = (rcid || "").toString();
  const pid = (proformaid || "").toString();
  const { token } = useStore();
  const [fetchData, setFetch] = useState<ProformaType>({
    ID: 0,
  } as ProformaType);
  const [HRdata, setHR] = useState<HR>({ name: "", hr1: "", hr2: "", hr3: "" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProformaType>({
    defaultValues: fetchData,
  });
  const handleNext = async (data: ProformaType) => {
    const info = {
      ...data,
      ID: parseInt(pid, 10),
    };
    const res = await proformaRequest.put(token, rid, info);
    if (res) {
      reset({
        additional_eligibility: "",
        message_for_cordinator: "",
        active_hr: "",
      });
      router.push({
        pathname: ROUTE,
        query: { rcId: rid },
      });
    }
  };
  useEffect(() => {
    if (!(rid && pid)) return;
    const getStep5 = async () => {
      const data = await proformaRequest.get(token, rid, pid);
      const hr = await companyRequest.getHR(token, rid);
      setHR(hr);
      setFetch(data);
      reset(data);
    };
    getStep5();
  }, [rid, pid, token, reset]);

  return (
    <div>
      <Meta title="Step 5 - Additional Information" />
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "330px", sm: "600px", margin: "0px auto" },
        }}
      >
        <Stack spacing={3}>
          <h2>Step 5/5 : Additional Information</h2>
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
              error={!!errors.additional_eligibility}
              helperText={
                errors.additional_eligibility && "This field is required!"
              }
              {...register("additional_eligibility")}
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
              error={!!errors.message_for_cordinator}
              helperText={
                errors.message_for_cordinator && "This field is required!"
              }
              {...register("message_for_cordinator")}
            />
          </FormControl>

          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Select Active HR</p>
            <Autocomplete
              disablePortal
              id="select-active-hr"
              options={[
                {
                  id: 1,
                  label: HRdata.hr1,
                },
                {
                  id: 2,
                  label: HRdata.hr2,
                },
                {
                  id: 3,
                  label: HRdata.hr3,
                },
              ]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="standard"
                  error={!!errors.active_hr}
                  helperText={errors.active_hr && "This field is required!"}
                  {...register("active_hr", { required: true })}
                />
              )}
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
              Submit
            </Button>
            <Button
              variant="contained"
              sx={{ width: "50%" }}
              onClick={() => {
                reset({
                  additional_eligibility: "",
                  message_for_cordinator: "",
                  active_hr: "",
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
