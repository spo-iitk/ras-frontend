import { Button, Card, FormControl, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import RichText from "@components/Editor/RichText";
import useStore from "@store/store";
import requestProforma, {
  AdminProformaType,
} from "@callbacks/admin/rc/adminproforma";

const ROUTE = "/admin/rc/[rcId]/proforma/[proformaid]/step4";

function Step3() {
  const router = useRouter();
  const { rcid, proformaid } = router.query;
  const rid = (rcid || "").toString();
  const pid = (proformaid || "").toString();
  const { token, role } = useStore();
  const [desc, changeDesc] = useState("");
  const [fetchData, setFetch] = useState<AdminProformaType>({
    ID: 0,
  } as AdminProformaType);
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
      job_description: desc,
    };
    const response = await requestProforma.put(token, rid, info);
    if (response) {
      reset({
        profile: "",
        job_description: "",
        tentative_job_location: "",
        min_hires: "",
      });
      changeDesc("");
      router.push({
        pathname: ROUTE,
        query: { rcId: rid, proformaid: pid },
      });
    }
  };

  useEffect(() => {
    const getStep3 = async () => {
      const data = await requestProforma.get(token, rid, pid);
      setFetch(data);
      reset(data);
      changeDesc(data.job_description);
    };
    if (rid && pid) getStep3();
  }, [rid, pid, token, reset]);
  // Conditional rendering based on rcid
  let content;
  if (+rid % 2 === 0) {
    content = (
      <div>
        <Meta title="Step 3 - Job Profile" />
        <Card
          elevation={5}
          sx={{
            padding: 3,
            width: { xs: "330px", sm: "600px" },
            margin: "0px auto",
          }}
        >
          <Stack spacing={3}>
            <h2>Step 3 : Job Profile</h2>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Job Title/Designation</p>
              <TextField
                id="title"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.profile}
                helperText={errors.profile?.message}
                {...register("profile", {
                  required: "Profile is required",
                  maxLength: {
                    value: 100,
                    message: "Profile length should be less than 100",
                  },
                })}
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
              <RichText
                value={desc}
                onChange={changeDesc}
                style={{ minHeight: 200 }}
              />
            </FormControl>
            {role !== 102 && (
              <FormControl sx={{ m: 1 }}>
                <p style={{ fontWeight: 300 }}>Minimum no. of hires</p>
                <TextField
                  id="MinHires"
                  required
                  sx={{ marginLeft: "5 rem" }}
                  fullWidth
                  multiline
                  variant="standard"
                  error={!!errors.min_hires}
                  helperText={
                    errors.tentative_job_location && "This field is required"
                  }
                  {...register("min_hires", { required: true })}
                />
              </FormControl>
            )}
            {role !== 102 && (
              <FormControl sx={{ m: 1 }}>
                <p style={{ fontWeight: 300 }}>Expected total no. of hires</p>
                <TextField
                  id="TotHires"
                  required
                  sx={{ marginLeft: "5 rem" }}
                  fullWidth
                  multiline
                  variant="standard"
                  error={!!errors.total_hires}
                  helperText={errors.total_hires && "This field is required"}
                  {...register("total_hires", { required: true })}
                />
              </FormControl>
            )}
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Required Skill Set</p>
              <TextField
                id="Skills"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.skill_set}
                helperText={errors.skill_set && "This field is required"}
                {...register("skill_set", { required: true })}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>CPI criteria (if any)</p>
              <TextField
                id="CPI"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.cpi_criteria}
                helperText={errors.cpi_criteria && "This field is required"}
                {...register("cpi_criteria", { required: true })}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>CPI Cutoff</p>
              <TextField
                id="CPI_Cutoff"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.cpi_cutoff}
                helperText={errors.cpi_cutoff && "This field is required"}
                {...register("cpi_cutoff", { required: true })}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>
                Is the position also open for PwD/DAP (If no, specify the nature
                of disability)
              </p>
              <TextField
                id="Skills"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.pwd}
                helperText={errors.pwd && "This field is required"}
                {...register("pwd", { required: true })}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Backlog eligibilty</p>
              <TextField
                id="Backlog"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.backlog_eligibility}
                helperText={
                  errors.backlog_eligibility && "This field is required"
                }
                {...register("backlog_eligibility", { required: true })}
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
                disabled={!router.isReady || rid === "" || pid === ""}
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
  } else {
    content = (
      <div>
        <Meta title="Step 3 - Internship Profile" />
        <Card
          elevation={5}
          sx={{
            padding: 3,
            width: { xs: "330px", sm: "600px", margin: "0px auto" },
          }}
        >
          <Stack spacing={3}>
            <h2>Step 3 : Internship Profile</h2>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Job Title/Designation</p>
              <TextField
                id="title"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.profile}
                helperText={errors.profile?.message}
                {...register("profile", {
                  required: "Profile is required",
                  maxLength: {
                    value: 100,
                    message: "Profile length should be less than 100",
                  },
                })}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Tentative Job Location / Online</p>
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
              <RichText
                value={desc}
                onChange={changeDesc}
                style={{ minHeight: 200 }}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Preferred period of Internship</p>
              <TextField
                id="internship_period"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.internship_period}
                helperText={
                  errors.internship_period && "This field is required"
                }
                {...register("internship_period", { required: true })}
              />
            </FormControl>
            {role !== 102 && (
              <FormControl sx={{ m: 1 }}>
                <p style={{ fontWeight: 300 }}>Minimum no. of hires</p>
                <TextField
                  id="MinHires"
                  required
                  sx={{ marginLeft: "5 rem" }}
                  fullWidth
                  multiline
                  variant="standard"
                  error={!!errors.min_hires}
                  helperText={
                    errors.tentative_job_location && "This field is required"
                  }
                  {...register("min_hires", { required: true })}
                />
              </FormControl>
            )}{" "}
            {role !== 102 && (
              <FormControl sx={{ m: 1 }}>
                <p style={{ fontWeight: 300 }}>Expected total no. of hires</p>
                <TextField
                  id="TotHires"
                  required
                  sx={{ marginLeft: "5 rem" }}
                  fullWidth
                  multiline
                  variant="standard"
                  error={!!errors.total_hires}
                  helperText={errors.total_hires && "This field is required"}
                  {...register("total_hires", { required: true })}
                />
              </FormControl>
            )}
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Required Skill Set</p>
              <TextField
                id="Skills"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.skill_set}
                helperText={errors.skill_set && "This field is required"}
                {...register("skill_set", { required: true })}
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
                disabled={!router.isReady || rid === "" || pid === ""}
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
  return content;
}

Step3.layout = "adminPhaseDashBoard";
export default Step3;
