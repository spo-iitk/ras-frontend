import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import useStore from "@store/store";
import addCompanyRequest, {
  Company,
  HR,
} from "@callbacks/admin/company/company";
import requestCompany, { CompanyRc } from "@callbacks/admin/rc/company";

const boxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "330px", md: "500px" },
  bgcolor: "background.paper",
  border: "white solid 2px",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  alignItems: "center",
};

function AddCompany({ handleCloseNew }: { handleCloseNew: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyRc>();
  const { token } = useStore();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [company, setCompany] = useState({ id: 0, label: "" });
  const [HRs, setHRs] = useState<HR[]>([]);
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  useEffect(() => {
    const getCompanydata = async () => {
      let response = await addCompanyRequest.getall(token);
      setCompanies(response);
    };
    getCompanydata();
  }, [token]);
  useEffect(() => {
    const getHRdata = async (id: number) => {
      let response = await addCompanyRequest.getAllHR(token, id.toString());
      setHRs(response);
    };
    if (company.id !== 0) getHRdata(company.id);
  }, [token, company.id]);
  const onSubmit = async (data: CompanyRc) => {
    const response = await requestCompany.post(
      token,
      { ...data, company_id: company.id, company_name: company.label },
      rid
    );
    if (response) {
      reset({
        company_name: "",
        hr1: "",
        hr2: "",
        hr3: "",
      });
      handleCloseNew();
    }
    window.location.reload();
  };
  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h2>Add Company</h2>
        <Typography>
          Note: If company is not listed here then it might be not listed in the
          master database. Add it there first.
        </Typography>
        <Autocomplete
          disablePortal
          id="selectCompany"
          options={companies.map((row) => ({ id: row.ID, label: row.name }))}
          renderInput={(params) => (
            <TextField {...params} label="Select Company" />
          )}
          onChange={(e, v) => {
            e.preventDefault();
            if (v != null) setCompany(v);
          }}
        />
        <Autocomplete
          disablePortal
          id="selectActiveHR1"
          options={HRs.map((row) => ({
            id: row.ID,
            label: `${row.name} | ${row.email}`,
          }))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Active HR 1"
              {...register("hr1", {
                required: true,
              })}
              error={!!errors.hr1}
            />
          )}
        />
        <Autocomplete
          disablePortal
          id="selectActiveHR2"
          options={HRs.map((row) => ({
            id: row.ID,
            label: `${row.name} | ${row.email}`,
          }))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Active HR 2"
              {...register("hr2", {})}
              error={!!errors.hr2}
            />
          )}
        />
        <Autocomplete
          disablePortal
          id="selectActiveHR3"
          options={HRs.map((row) => ({
            id: row.ID,
            label: `${row.name} | ${row.email}`,
          }))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Active HR 3"
              {...register("hr3", {})}
              error={!!errors.hr3}
            />
          )}
        />
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
            onClick={handleSubmit(onSubmit)}
          >
            Add
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
            onClick={() => {
              reset({
                company_name: "",
                hr1: "",
                hr2: "",
                hr3: "",
              });
            }}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

AddCompany.layout = "adminPhaseDashBoard";
export default AddCompany;
