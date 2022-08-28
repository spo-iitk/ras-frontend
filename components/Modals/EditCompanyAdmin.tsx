import React, { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import useStore from "@store/store";
import addCompanyRequest, { HR } from "@callbacks/admin/company/company";
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

function AddCompany({
  handleCloseEdit,
  setRows,
  companyData,
}: {
  handleCloseEdit: () => void;
  setRows: React.Dispatch<React.SetStateAction<any>>;
  companyData: CompanyRc[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyRc>();
  const { token } = useStore();
  const [company, setCompany] = useState({ id: 0, label: "" });
  const [HRs, setHRs] = useState<HR[]>([]);
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const updateFormData = (formData: any) => {
    const getHRdata = async (id: number) => {
      await addCompanyRequest
        .getAllHR(token, id.toString())
        .then((response) => setHRs(response))
        .then(() =>
          reset({
            ...formData,
            company_name: company.label,
          })
        );
    };
    if (company.id !== 0) getHRdata(company.id);
  };
  const onSubmit = async (data: CompanyRc) => {
    const response = await requestCompany.update(
      token,
      { ...data, company_name: company.label },
      rid
    );
    if (response) {
      reset({
        company_name: "",
        hr1: "",
        hr2: "",
        hr3: "",
      });
      handleCloseEdit();
    }
    const getCompanydata = async () => {
      if (rid === undefined || rid === "") return;
      let res = await requestCompany.getall(token, rid);
      setRows(res);
    };
    getCompanydata();
  };
  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h2>Edit Company</h2>
        <Autocomplete
          disablePortal
          id="selectCompany"
          options={companyData.map((row) => ({
            id: row.ID,
            label: row.company_name,
            hr1: row.hr1,
            hr2: row.hr2,
            hr3: row.hr3,
          }))}
          renderInput={(params) => (
            <TextField {...params} label="Select Company" />
          )}
          onChange={(e, v) => {
            e.preventDefault();
            if (v != null) setCompany(v);
            updateFormData(v);
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
            <>
              <p style={{ margin: "10px 0px" }}>HR1</p>
              <TextField
                {...params}
                {...register("hr1", {
                  required: true,
                })}
                error={!!errors.hr1}
              />
            </>
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
            <>
              <p style={{ margin: "10px 0px" }}>HR2</p>
              <TextField
                {...params}
                {...register("hr2")}
                error={!!errors.hr1}
              />
            </>
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
            <>
              <p style={{ margin: "10px 0px" }}>HR3</p>
              <TextField
                {...params}
                {...register("hr3")}
                error={!!errors.hr1}
              />
            </>
          )}
        />
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
            onClick={handleSubmit(onSubmit)}
          >
            EDIT
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
