/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import { Card, Grid, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";

import Meta from "@components/Meta";
import studentRequest, { Student } from "@callbacks/student/student";
import useStore from "@store/store";
import { getDepartment, getProgram } from "@components/Parser/parser";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const info: { field: string; value: string; disabled: boolean; api_id: any }[] =
  [
    {
      field: "Name",
      value: "Enter your Name",
      disabled: true,
      api_id: "name",
    },
    {
      field: "IITK Email",
      value: "Your IITK email",
      disabled: false,
      api_id: "iitk_email",
    },
    {
      field: "IITK Roll No.",
      value: "Enter your IITK Roll No.",
      disabled: false,
      api_id: "roll_no",
    },
    {
      field: "Expected Graduation Year",
      value: "Select your Graduation Year",
      disabled: false,
      api_id: "expected_graduation_year",
    },
    {
      field: "Department",
      value: "Select your Department",
      disabled: true,
      api_id: "department",
    },
    {
      field: "Program",
      value: "Select your Program",
      disabled: true,
      api_id: "program",
    },
    {
      field: "Secondary Department",
      value: "Select your Department",
      disabled: true,
      api_id: "department_2",
    },
    {
      field: "Secondary Program",
      value: "Select your Program",
      disabled: true,
      api_id: "program_2",
    },
    {
      field: "Specialisation",
      value: "Enter your Specialisation",
      disabled: false,
      api_id: "specialization",
    },
    {
      field: "Preference",
      value: "Select your Preference",
      disabled: false,
      api_id: "preference",
    },
    {
      field: "Gender",
      value: "Select your Gender",
      disabled: false,
      api_id: "gender",
    },
    {
      field: "Personal Email",
      value: "Enter your Personal Email",
      disabled: false,
      api_id: "personal_email",
    },
    {
      field: "DOB",
      value: "Enter your Date of Birth",
      disabled: false,
      api_id: "dob",
    },
    {
      field: "Contact Number",
      value: "Enter your Contact Number",
      disabled: false,
      api_id: "phone",
    },
    {
      field: "Alternate Contact Number",
      value: "Enter your Alternate Contact Number",
      disabled: false,
      api_id: "alternate_phone",
    },
    {
      field: "Whatsapp Number",
      value: "Enter your Whatsapp Number",
      disabled: false,
      api_id: "whatsapp_number",
    },
    {
      field: "Current CPI",
      value: "Enter your Current CPI",
      disabled: false,
      api_id: "current_cpi",
    },
    {
      field: "UG CPI(only for PG Students)",
      value: "Enter your UG CPI",
      disabled: false,
      api_id: "ug_cpi",
    },
    {
      field: "10th Board",
      value: "Enter your 10th Board Name",
      disabled: false,
      api_id: "tenth_board",
    },
    {
      field: "10th Board Year",
      value: "Enter your 10th Board Year",
      disabled: false,
      api_id: "tenth_year",
    },
    {
      field: "10th Marks",
      value: "Enter your 10th Marks",
      disabled: false,
      api_id: "tenth_marks",
    },
    {
      field: "12th Board",
      value: "Enter your 12th Board Name",
      disabled: false,
      api_id: "twelfth_board",
    },
    {
      field: "12th Board Year",
      value: "Enter your 12th Board Year",
      disabled: false,
      api_id: "twelfth_year",
    },
    {
      field: "12th Marks",
      value: "Enter your 12th Board Marks",
      disabled: false,
      api_id: "twelfth_marks",
    },
    {
      field: "Entrance Exam",
      value: "Enter your Entrance Exam",
      disabled: false,
      api_id: "entrance_exam",
    },
    {
      field: "Entrance Exam Rank",
      value: "Enter your Entrance Exam Rank",
      disabled: false,
      api_id: "entrance_exam_rank",
    },
    {
      field: "Category",
      value: "Enter your Category",
      disabled: false,
      api_id: "category",
    },
    {
      field: "Category Rank",
      value: "Enter your Category Rank",
      disabled: false,
      api_id: "category_rank",
    },
    {
      field: "Current Address",
      value: "Enter your Current Address",
      disabled: false,
      api_id: "current_address",
    },
    {
      field: "Permanent Address",
      value: "Enter your Permanent Address",
      disabled: false,
      api_id: "permanent_address",
    },
    {
      field: "Friends Name",
      value: "Enter your Friends Name",
      disabled: false,
      api_id: "friend_name",
    },
    {
      field: "Friends Contact Details",
      value: "Enter your Friends Contace Details",
      disabled: false,
      api_id: "friend_phone",
    },
    {
      field: "Disability",
      value: "Select your Disability Status",
      disabled: false,
      api_id: "disability",
    },
  ];
function Profile() {
  const [StudentData, setStudentData] = useState<Student>({ ID: 0 } as Student);
  const { token } = useStore();
  useEffect(() => {
    const fetch = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const student = await studentRequest
        .get(token)
        .catch(() => ({ ID: 0 } as Student));
      setStudentData(student);
    };
    fetch();
  }, [token]);
  const photoLink = `https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${StudentData.roll_no}_0.jpg`;
  const handleValue = (val: string) => {
    switch (val) {
      case "dob":
        return new Date(StudentData.dob).toLocaleDateString("en-GB");
      case "program":
        return getProgram(StudentData.program_department_id);
      case "program_2":
        return getProgram(StudentData.secondary_program_department_id);
      case "department":
        return getDepartment(StudentData.program_department_id);
      case "department_2":
        return getDepartment(StudentData.secondary_program_department_id);
      default:
        return StudentData[val as keyof Student];
    }
  };

  return (
    <div>
      <Meta title="Profile - Student Dashboard" />
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <h2>Profile</h2>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Button
              href="/student/profile/edit"
              variant="contained"
              sx={{ width: 100 }}
              disabled={!StudentData.is_editable}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              sx={{ width: 150 }}
              color={StudentData.is_verified ? "success" : "error"}
            >
              {StudentData.is_verified === true ? "Verified" : "Not Verified"}
            </Button>
          </Stack>
        </Stack>
        <Stack justifyContent="center">
          <Card
            style={{ display: "flex", justifyContent: "center" }}
            elevation={5}
            sx={{
              padding: 3,
              borderRadius: "10px",
              width: { xs: "330px", sm: "600px", margin: "0px auto" },
            }}
          >
            <img
              src={photoLink}
              alt="Profile photo"
              style={{ width: "10em", height: "10em", borderRadius: "50%" }}
            />
          </Card>
        </Stack>
        <Stack justifyContent="center">
          <Card
            elevation={5}
            sx={{
              padding: 3,
              borderRadius: "10px",
              width: { xs: "330px", sm: "600px", margin: "0px auto" },
            }}
          >
            <Grid container spacing={5} sx={{ padding: 3 }}>
              {info.map((item) => (
                <Grid item xs={12} sm={6} key={item.field}>
                  <p>
                    {item.field}{" "}
                    {(item.field === "12th Marks" ||
                      item.field === "10th Marks") &&
                      "(CGPA / Percentage)"}
                  </p>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <TextField
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline={
                        item.field === "Current Address" ||
                        item.field === "Permanent Address"
                      }
                      minRows={3}
                      id="standard-basic"
                      variant="standard"
                      value={handleValue(item.api_id)}
                    />
                    <b>
                      {item.field === "12th Marks" &&
                        (parseFloat(handleValue("twelfth_marks")?.toString()) <=
                        10
                          ? "CGPA"
                          : "Percentage")}
                      {item.field === "10th Marks" &&
                        (parseFloat(handleValue("tenth_marks")?.toString()) <=
                        10
                          ? "CGPA"
                          : "Percentage")}
                    </b>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Stack>
      </Stack>
    </div>
  );
}

Profile.layout = "studentDashboard";
export default Profile;
