import {
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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import proformaRequest, {
  NewProformaResponse,
  ProformaType,
} from "@callbacks/company/proforma";
import useStore from "@store/store";

const ROUTE = "/company/rc/[rcId]/proforma/[proformaid]/step2";

function ProformaNew() {
  const [industrySectors, setIndustrySectors] = useState<string[]>([]);
  const [industrySectorsString, setIndustrySectorsString] =
    useState<string>("");
  const { token, name } = useStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProformaType>({
    defaultValues: { company_name: name },
  });

  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();

  const handleIndustrySectorChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const selectedValues = typeof value === "string" ? value.split(",") : value;
    setIndustrySectors(selectedValues);
    setIndustrySectorsString(selectedValues.join(", ")); // Store the comma-separated string
  };

  const handleNext = async (data: ProformaType) => {
    const info: ProformaType = {
      ...data,
      recruitment_cycle_id: parseInt(rid, 10),
      role: industrySectorsString,
    };
    await proformaRequest
      .post(token, rid, info)
      .then((res: NewProformaResponse) => {
        reset({
          company_name: "",
          role: "",
        });
        router.push({
          pathname: ROUTE,
          query: { rcId: rid, proformaid: res.pid },
        });
      });
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
          </FormControl>
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
              {...register("type_of_org", {
                required: "Type of Organization is required",
              })}
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
    </div>
  );
}

ProformaNew.layout = "companyPhaseDashboard";
export default ProformaNew;
