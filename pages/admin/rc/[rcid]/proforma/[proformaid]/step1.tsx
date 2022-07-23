import { Button, Card, FormControl, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import RichTextEditor from "@components/Editor/RichText";
import useStore from "@store/store";
import requestProforma, {
  AdminProformaType,
} from "@callbacks/admin/rc/adminproforma";
import requestCompany, { CompanyRc } from "@callbacks/admin/rc/company";

const ROUTE = "/admin/rc/[rcId]/proforma/[proformaid]/step2";
function ProformaNew() {
  const [value, onChange] = useState("");
  const { token, name } = useStore();
  const router = useRouter();
  const { rcid, proformaid } = router.query;
  const rid = (rcid || "").toString();
  const pid = (proformaid || "").toString();
  const [companies, setCompanies] = useState<CompanyRc[]>([]);
  const [company, setCompany] = useState("");
  const [fetchData, setFetch] = useState<AdminProformaType>({
    ID: 0,
  } as AdminProformaType);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminProformaType>({
    defaultValues: { ...fetchData, company_name: name },
  });

  useEffect(() => {
    companies.forEach((item) => {
      if (item.ID === fetchData.company_recruitment_cycle_id) {
        setCompany(item.company_name);
      }
    });
  }, [companies, fetchData.company_recruitment_cycle_id]);

  useEffect(() => {
    let data: AdminProformaType;
    if (!(rid && pid)) return;
    const getCompanydata = async () => {
      if (rid === undefined || rid === "") return;
      let response = await requestCompany.getall(token, rid);
      setCompanies(response);
    };
    getCompanydata();
    const getStep1 = async () => {
      data = await requestProforma.get(token, rid, pid);
      onChange(data.job_description);
      setFetch(data);
      reset(data);
    };
    getStep1();
  }, [rid, pid, token, reset]);

  const handleNext = async (data: AdminProformaType) => {
    const info: AdminProformaType = {
      ...data,
      ID: parseInt(pid, 10),
      job_description: value,
      recruitment_cycle_id: parseInt(rid, 10),
    };
    const res = await requestProforma.put(token, rid, info);
    if (res) {
      reset({
        company_name: "",
        role: "",
        tentative_job_location: "",
      });
      onChange("");
      router.push({
        pathname: ROUTE,
        query: { rcId: rid, proformaid: pid },
      });
    }
  };
  return (
    <div>
      <Meta title="Step 1 - Basic Details" />
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
              value={company}
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              variant="standard"
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
          {fetchData.ID !== 0 && (
            <FormControl sx={{ m: 1 }}>
              <p style={{ fontWeight: 300 }}>Job Description</p>
              <RichTextEditor
                value={fetchData.job_description}
                onChange={onChange}
                style={{ minHeight: 200 }}
              />
            </FormControl>
          )}

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
