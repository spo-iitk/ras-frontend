import { Button,
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
import useStore from "@store/store";
import requestProforma, {
  AdminProformaType,
} from "@callbacks/admin/rc/adminproforma";
import requestCompany, { CompanyRc } from "@callbacks/admin/rc/company";

const ROUTE = "/admin/rc/[rcId]/proforma/[proformaid]/step2";
function ProformaNew() {
  const [industrySectors, setIndustrySectors] = useState<string[]>([]);
  const [type, setType] = useState<string>("");
  const [industrySectorsString, setIndustrySectorsString] =
    useState<string>("");
  const { token, name } = useStore();
  const router = useRouter();
  const { rcid, proformaid } = router.query;
  const rid = (rcid || "").toString();
  const pid = (proformaid || "").toString();
  const [companies, setCompanies] = useState<CompanyRc[]>([]);
  const [company, setCompany] = useState("");

  const handleIndustrySectorChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const selectedValues = typeof value === "string" ? value.split(",") : value;
    setIndustrySectors(selectedValues);
    setIndustrySectorsString(selectedValues.join(", ")); // Store the comma-separated string
  };
  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    const selectedValue = value;
    setType(selectedValue);
  };

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
      setFetch(data);
      setIndustrySectors(data.role.split(","));
      setType(data.type_of_org);
      reset(data);
    };
    getStep1();
  }, [rid, pid, token, reset]);

  const handleNext = async (data: AdminProformaType) => {
    const info: AdminProformaType = {
      ...data,
      ID: parseInt(pid, 10),
      recruitment_cycle_id: parseInt(rid, 10),
      role: industrySectorsString,
      type_of_org: type,
    };
    const res = await requestProforma.put(token, rid, info);
    if (res) {
      reset({
        company_name: "",
        role: "",
        tentative_job_location: "",
      });
      router.push({
        pathname: ROUTE,
        query: { rcId: rid, proformaid: pid },
      });
    }
  };
  return (
    <div>
      <Meta title="Step 1 - Company Details" />
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
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              variant="standard"
              {...register("company_name")}
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
              value={type}
              onChange={handleTypeChange}
              renderValue={(selected) => selected}
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
              {...register("head_office")}
            />
          </FormControl>

          <FormControl sx={{ m: 1 }}>
            <InputLabel>Nature of Business / Industry Sector</InputLabel>
            <Select
              id="NatureOfBusiness"
              multiple
              fullWidth
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
                  tentative_job_location: "",
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

ProformaNew.layout = "adminPhaseDashBoard";
export default ProformaNew;
