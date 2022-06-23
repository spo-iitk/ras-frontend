import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import RichText from "@components/Editor/RichText";
import useStore from "@store/store";
import proformaRequest, { ProformaType } from "@callbacks/company/proforma";

const ROUTE = "/company/rc/[rcId]/proforma/[proformaid]/step4";

function Step3() {
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

  return (
    <div className="container">
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
          {fetchData.ID !== 0 && (
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Package Details</p>
              <RichText
                value={pkgDetails}
                onChange={changePkg}
                style={{ minHeight: 200 }}
              />
            </FormControl>
          )}
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
              disabled={useWatch({ control, name: "bond" }) !== true}
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              minRows={3}
              variant="standard"
              error={!!errors.bond_details}
              helperText={errors.bond_details && "This field is required"}
              {...register("bond_details", {
                required: useWatch({ control, name: "bond" }) === true,
              })}
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

Step3.layout = "companyPhaseDashboard";
export default Step3;
