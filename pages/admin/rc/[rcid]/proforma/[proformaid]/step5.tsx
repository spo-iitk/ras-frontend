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
import requestProforma, {
  AdminProformaType,
} from "@callbacks/admin/rc/adminproforma";
import requestCompanyHR, { HR } from "@callbacks/admin/rc/companyhr";

const ROUTE = "/admin/rc/[rcId]";
function Step5() {
  const router = useRouter();
  const { rcid, proformaid } = router.query;
  const rid = (rcid || "").toString();
  const pid = (proformaid || "").toString();
  const { token } = useStore();
  const [fetchData, setFetch] = useState<AdminProformaType>({
    ID: 0,
  } as AdminProformaType);
  const [HRdata, setHR] = useState<HR>({ name: "", hr1: "", hr2: "", hr3: "" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminProformaType>({
    defaultValues: fetchData,
  });
  const handleNext = async (data: AdminProformaType) => {
    const info = {
      ...data,
      ID: parseInt(pid, 10),
    };
    const res = await requestProforma.put(token, rid, info);
    if (res) {
      reset({
        additional_eligibility: "",
        message_for_cordinator: "",
        active_hr_id: "",
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
      const data = await requestProforma.get(token, rid, pid);
      const hr = await requestCompanyHR.getHR(
        token,
        rid,
        data.company_recruitment_cycle_id
      );
      setHR(hr);
      setFetch(data);
      reset(data);
    };
    getStep5();
  }, [rid, pid, token, reset]);

  return (
    <div className="container">
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
                  error={!!errors.active_hr_id}
                  helperText={errors.active_hr_id && "This field is required!"}
                  {...register("active_hr_id", { required: true })}
                />
              )}
            />
          </FormControl>

          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>CPI Cutoff</p>
            <TextField
              id="Cname"
              required
              type="number"
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              minRows={5}
              variant="standard"
              error={!!errors.cpi_cutoff}
              helperText={errors.cpi_cutoff && "This field is required!"}
              {...register("cpi_cutoff", {
                setValueAs: (value: string) => parseFloat(value),
              })}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Deadline</p>
            <TextField
              id="Cname"
              type="date"
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              minRows={5}
              variant="standard"
              error={!!errors.set_deadline}
              helperText={errors.set_deadline && "This field is required!"}
              {...register("set_deadline", {
                setValueAs: (value: string) => new Date(value).getTime(),
              })}
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
                  active_hr_id: "",
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

Step5.layout = "adminPhaseDashBoard";
export default Step5;
