import {
  Autocomplete,
  Button,
  Card,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
// import RichTextEditor from "@components/Editor/RichText";
import useStore from "@store/store";
import requestCompany, { CompanyRc } from "@callbacks/admin/rc/company";
import requestProforma, {
  AdminProformaType,
  ProformaResponse,
} from "@callbacks/admin/rc/adminproforma";

const ROUTE = "/admin/rc/[rcId]/proforma/[proformaid]/step2";

function ProformaNew() {
  const [industrySectors, setIndustrySectors] = useState<string[]>([]);
  const [type, setType] = useState<string>("");
  const [industrySectorsString, setIndustrySectorsString] =
    useState<string>("");
  const [jobDesc, setJobDesc] = useState("");
  // const [value, onChange] = useState("");
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
  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    const selectedValue = value;
    setType(selectedValue);
  };
  const handleIndustrySectorChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const selectedValues = typeof value === "string" ? value.split(",") : value;
    setIndustrySectors(selectedValues);
    setIndustrySectorsString(selectedValues.join(", ")); // Store the comma-separated string
  };

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
      job_description: jobDesc,
      recruitment_cycle_id: parseInt(rid, 10),
      type_of_org: type,
      role: industrySectorsString,
    };
    const res: ProformaResponse = await requestProforma.post(token, rid, info);
    if (res.pid !== 0) {
      reset({
        company_name: "",
        role: "",
        tentative_job_location: "",
      });
      // onChange("");
      setJobDesc("");
      router.push({
        pathname: ROUTE,
        query: { rcId: rid, proformaid: res.pid },
      });
    }
  };

  return (
    <div>
      <Meta title="New Proforma" />
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "330px", sm: "600px", margin: "0px auto" },
        }}
      >
        <Stack spacing={3}>
          <h2>Step 1/6 : Basic Details</h2>
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
          {/* <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Company Name</p>
            <TextField
              id="Cname"
              disabled
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              variant="standard"
              error={!!errors.company_name}
              helperText={errors.company_name?.message}
              {...register("company_name", { required: true })}
            />
          </FormControl> */}
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Postal Address</p>
            <TextField
              id="postalAddress"
              required
              fullWidth
              multiline
              variant="standard"
              error={!!errors.postal_address}
              helperText={errors.postal_address?.message}
              {...register("postal_address", {
                required: "Postal Address is required",
              })}
            />
          </FormControl>

          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Date of Establishment</p>
            <TextField
              id="dateOfEstablishment"
              type="date"
              required
              fullWidth
              variant="standard"
              error={!!errors.establishment_date}
              helperText={errors.establishment_date?.message}
              InputLabelProps={{
                shrink: true,
              }}
              {...register("establishment_date", {
                required: "Date of Establishment is required",
              })}
            />
          </FormControl>

          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Number of Employees</p>
            <TextField
              id="numberOfEmployees"
              required
              fullWidth
              variant="standard"
              error={!!errors.total_employees}
              helperText={errors.total_employees?.message}
              {...register("total_employees", {
                required: "Number of Employees is required",
              })}
            />
          </FormControl>

          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Social Media Page Link (optional)</p>
            <TextField
              id="socialMediaPageLink"
              fullWidth
              variant="standard"
              {...register("social_media")}
            />
          </FormControl>

          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Website</p>
            <TextField
              id="website"
              required
              fullWidth
              variant="standard"
              error={!!errors.website}
              helperText={errors.website?.message}
              {...register("website", {
                required: "Website is required",
              })}
            />
          </FormControl>

          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Company Turnover for NIRF Purpose</p>
            <TextField
              id="companyTurnover"
              required
              fullWidth
              variant="standard"
              error={!!errors.turnover}
              helperText={errors.turnover?.message}
              {...register("turnover", {
                required: "Company Turnover is required",
              })}
            />
          </FormControl>

          <FormControl sx={{ m: 1 }}>
            <InputLabel>Type of Organization</InputLabel>
            <Select
              id="typeOfOrganization"
              required
              fullWidth
              variant="standard"
              error={!!errors.company_name}
              value={type}
              onChange={handleTypeChange}
              renderValue={(selected) => selected}
              // {...register("type_of_org", {
              //   required: "Type of Organization is required",
              // })}
            >
              <MenuItem value="Private (Indian/Foreign)">
                Private (Indian/Foreign)
              </MenuItem>
              <MenuItem value="Multi National Company (Indian Origin)">
                Multi National Company (Indian Origin)
              </MenuItem>
              <MenuItem value="Multi National Company (Foreign Origin)">
                Multi National Company (Foreign Origin)
              </MenuItem>
              <MenuItem value="Government">Government</MenuItem>
              <MenuItem value="Public Sector Undertakings (Indian)">
                Public Sector Undertakings (Indian)
              </MenuItem>
              <MenuItem value="Non-Government Organisation">
                Non-Government Organisation
              </MenuItem>
              <MenuItem value="STARTUP">STARTUP</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>
              Location and Head office of the parent company (if MnC)
            </p>
            <TextField
              id="mncDetails"
              fullWidth
              variant="standard"
              error={!!errors.head_office}
              helperText={errors.head_office?.message}
              {...register("head_office", {
                required: "Company Turnover is required",
              })}
            />
          </FormControl>

          <FormControl sx={{ m: 1 }}>
            <InputLabel>Nature of Business / Industry Sector</InputLabel>
            <Select
              id="NatureOfBusiness"
              multiple
              fullWidth
              required
              variant="standard"
              value={industrySectors}
              onChange={handleIndustrySectorChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {[
                "Core Engineering & Technology",
                "Analytics",
                "IT / Software",
                "Oil & Gas / Energy",
                "Data Science/ AI/ ML",
                "Cyber Security",
                "Finance & Consulting",
                "Management",
                "Academics/Research",
                "Media",
                "E-Commerce",
                "Construction",
                "Design",
                "Manufacturing",
                "Infrastructure",
                "HealthCare/ Biomedical",
                "Edutech",
                "Policy",
              ].map((sector) => (
                <MenuItem key={sector} value={sector}>
                  <Checkbox checked={industrySectors.indexOf(sector) > -1} />
                  <ListItemText primary={sector} />
                </MenuItem>
              ))}
            </Select>
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
                });
              }}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Card>
      {/* <div>
      <Meta title="Step 1/6 - Basic Details" />
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
              helperText={errors.role?.message}
              {...register("role", {
                required: "Role is required",
                maxLength: {
                  value: 100,
                  message: "Role length should be less than 100",
                },
              })}
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
    </div> */}
    </div>
  );
}

ProformaNew.layout = "adminPhaseDashBoard";
export default ProformaNew;
