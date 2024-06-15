import { Button, Card, FormControl, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import RichText from "@components/Editor/RichText";
import useStore from "@store/store";
import proformaRequest, { ProformaType } from "@callbacks/company/proforma";

const ROUTE = "/company/rc/[rcId]/proforma/[proformaid]/step5";

function Step4() {
  const router = useRouter();
  const { rcid, proformaid } = router.query;
  const rid = (rcid || "").toString();
  const pid = (proformaid || "").toString();
  const { token } = useStore();
  const [ctc, changeCTC] = useState("");
  const [pkgDetails, changePkg] = useState("");
  const [fetchData, setFetch] = useState<ProformaType>({
    ID: 0,
  } as ProformaType);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<ProformaType>({
    defaultValues: fetchData,
  });
  const handleNext = async (data: ProformaType) => {
    const info = {
      ...data,
      ID: parseInt(pid, 10),
      package_details: pkgDetails,
      cost_to_company: ctc,
    };
    const response = await proformaRequest.put(token, rid, info);
    if (response) {
      reset({
        bond: false,
        bond_details: "",
        medical_requirements: "",
      });
      changeCTC("");
      changePkg("");
      router.push({
        pathname: ROUTE,
        query: { rcId: rid, proformaid: pid },
      });
    }
  };
  const bond = useWatch({ control, name: "bond" });

  useEffect(() => {
    const getStep3 = async () => {
      const data = await proformaRequest.get(token, rid, pid);
      setFetch(data);
      reset(data);
      changeCTC(data.cost_to_company);
      changePkg(data.package_details);
    };
    if (rid && pid) getStep3();
  }, [rid, pid, token, reset]);

  // Conditional rendering based on rcid
  let content;
  if (+rid % 2 === 0) {
    content = (
      <div>
        <Meta title="Step 4 - Package Details" />
        <Card
          elevation={5}
          sx={{
            padding: 3,
            width: { xs: "330px", sm: "600px", margin: "0px auto" },
          }}
        >
          <Stack spacing={3}>
            <h2>Step 4/6 : Package Details</h2>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>CTC (in INR)</p>
              <TextField
                id="CTC-inr"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.ctc_inr}
                helperText={errors.ctc_inr && "This field is required"}
                {...register("ctc_inr")}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>CTC (in foreign currency)</p>
              <TextField
                id="CTC-fr"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.medical_requirements}
                helperText={
                  errors.medical_requirements && "This field is required"
                }
                {...register("medical_requirements")}
              />
            </FormControl>
            {fetchData.ID !== 0 && (
              <FormControl sx={{ m: 1 }}>
                <p style={{ fontWeight: 300 }}>Cost to Company</p>
                <RichText
                  value={ctc}
                  onChange={changeCTC}
                  style={{ minHeight: 200 }}
                />
              </FormControl>
            )}
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Gross (per Annum)</p>
              <TextField
                id="Gross"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.gross}
                helperText={
                  errors.medical_requirements && "This field is required"
                }
                {...register("gross")}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>
                Fixed take home salary (per Annum)
              </p>
              <TextField
                id="TakeHome"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.take_home}
                helperText={errors.take_home && "This field is required"}
                {...register("take_home")}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Base salary</p>
              <TextField
                id="Base"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.base}
                helperText={errors.base && "This field is required"}
                {...register("base")}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Joining bonus</p>
              <TextField
                id="Joining"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.joining_bonus}
                helperText={errors.joining_bonus && "This field is required"}
                {...register("joining_bonus")}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Relocation Bonus</p>
              <TextField
                id="Relocation"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.relocation_bonus}
                helperText={errors.relocation_bonus && "This field is required"}
                {...register("relocation_bonus")}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Bond Details</p>
              <TextField
                id="Cname"
                required
                disabled={bond === true}
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.bond_details}
                helperText={errors.bond_details && "This field is required"}
                {...register("bond_details")}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>1st Year CTC</p>
              <TextField
                id="FirstCTC"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.first_ctc}
                helperText={errors.first_ctc && "This field is required"}
                {...register("first_ctc")}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Medical Allowance</p>
              <TextField
                id="MedicalAllowance"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.medical_allowance}
                helperText={
                  errors.medical_allowance && "This field is required"
                }
                {...register("medical_allowance")}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Retention Bonus</p>
              <TextField
                id="Retention"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.retention_bonus}
                helperText={errors.retention_bonus && "This field is required"}
                {...register("retention_bonus")}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Deductions (if any)</p>
              <TextField
                id="Base"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.deductions}
                helperText={errors.deductions && "This field is required"}
                {...register("deductions")}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>
                Any other perks/benefits/components company wants to declare
              </p>
              <TextField
                id="Perks"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.perks}
                helperText={errors.perks && "This field is required"}
                {...register("perks")}
              />
            </FormControl>
            {fetchData.ID !== 0 && (
              <FormControl sx={{ m: 1 }}>
                <p style={{ fontWeight: 300 }}>Total CTC</p>
                <RichText
                  value={pkgDetails}
                  onChange={changePkg}
                  style={{ minHeight: 200 }}
                />
              </FormControl>
            )}
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
                error={!!errors.medical_requirements}
                helperText={
                  errors.medical_requirements && "This field is required"
                }
                {...register("medical_requirements")}
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
        <Meta title="Step 4 - Stipend Details" />
        <Card
          elevation={5}
          sx={{
            padding: 3,
            width: { xs: "330px", sm: "600px", margin: "0px auto" },
          }}
        >
          <Stack spacing={3}>
            <h2>Step 4/6 : Stipend Details</h2>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Stipend (per month) (In INR)</p>
              <TextField
                id="stipend-inr"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.ctc_inr}
                helperText={errors.ctc_inr && "This field is required"}
                {...register("ctc_inr", { required: true })}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>
                Stipend (per month) (in foreign currency)
              </p>
              <TextField
                id="ctc_fr"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.ctc_fr}
                helperText={errors.ctc_fr && "This field is required"}
                {...register("ctc_fr", { required: true })}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>
                Accommodation provided / Trip Fare
              </p>
              <TextField
                id="accommodation"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.accommodation}
                helperText={errors.accommodation && "This field is required"}
                {...register("accommodation", { required: true })}
              />
            </FormControl>
            {fetchData.ID !== 0 && (
              <FormControl sx={{ m: 1 }}>
                <p style={{ fontWeight: 300 }}>PPO provision on Performance</p>
                <RichText
                  value={pkgDetails}
                  onChange={changePkg}
                  style={{ minHeight: 200 }}
                />
              </FormControl>
            )}
            {fetchData.ID !== 0 && (
              <FormControl sx={{ m: 1 }}>
                <p style={{ fontWeight: 300 }}>Tentative CTC for PPO Select</p>
                <RichText
                  value={ctc}
                  onChange={changeCTC}
                  style={{ minHeight: 200 }}
                />
              </FormControl>
            )}
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>
                Tentative date of confirming of PPOs
              </p>
              <TextField
                id="ppo_confirming_date"
                type="date"
                required
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.ppo_confirming_date}
                helperText={errors.ppo_confirming_date?.message}
                {...register("ppo_confirming_date", {
                  required: "Date of Confirming PPO is required",
                })}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>
                Any other perks/benefits/components company wants to declare
              </p>
              <TextField
                id="Perks"
                required
                sx={{ marginLeft: "5 rem" }}
                fullWidth
                multiline
                variant="standard"
                error={!!errors.perks}
                helperText={errors.perks && "This field is required"}
                {...register("perks")}
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
                error={!!errors.medical_requirements}
                helperText={
                  errors.medical_requirements && "This field is required"
                }
                {...register("medical_requirements")}
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
Step4.layout = "companyPhaseDashboard";
export default Step4;
