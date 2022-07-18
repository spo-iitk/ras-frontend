import {
  Autocomplete,
  Button,
  Card,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import RichTextEditor from "@components/Editor/RichText";
import useStore from "@store/store";
import requestCompany, { CompanyRc } from "@callbacks/admin/rc/company";
import requestProforma, {
  AdminProformaType,
  ProformaResponse,
} from "@callbacks/admin/rc/adminproforma";

const ROUTE = "/admin/rc/[rcId]/proforma/[proformaid]/step2";

function ProformaNew() {
  const [value, onChange] = useState("");
  const { token, name } = useStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminProformaType>({
    defaultValues: { company_name: name },
  });

  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const [companies, setCompanies] = useState<CompanyRc[]>([]);
  const [company, setCompany] = useState<{
    id: number;
    label: string;
    cid: number;
  }>({
    id: 0,
    label: "",
    cid: 0,
  });

  useEffect(() => {
    const getCompanydata = async () => {
      if (rid === undefined || rid === "") return;
      let response = await requestCompany.getall(token, rid);
      setCompanies(response);
    };
    if (rid !== "") getCompanydata();
  }, [token, rid]);
  const handleNext = async (data: AdminProformaType) => {
    const info: AdminProformaType = {
      ...data,
      company_id: company.cid,
      company_name: company.label,
      company_recruitment_cycle_id: company.id,
      job_description: value,
      recruitment_cycle_id: parseInt(rid, 10),
    };
    const res: ProformaResponse = await requestProforma.post(token, rid, info);
    if (res.pid !== 0) {
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
    }
  };

  return (
    <div>
      <Meta title="Step 1/5 - Basic Details" />
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
            <Autocomplete
              disablePortal
              id="selectCompany"
              options={companies.map((row) => ({
                id: row.ID,
                label: row.company_name,
                cid: row.company_id,
              }))}
              renderInput={(params) => (
                <TextField {...params} label="Select Company" />
              )}
              onChange={(e, v) => {
                e.preventDefault();
                if (v != null) setCompany(v);
              }}
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
            <p style={{ fontWeight: 300 }}>Tentative Job Location</p>
            <TextField
              id="TentativeJobDescription"
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

ProformaNew.layout = "adminPhaseDashBoard";
export default ProformaNew;
