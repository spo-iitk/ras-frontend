import { Card, Grid, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import AdminStudentRequest, {
  Student,
} from "@callbacks/admin/student/adminStudent";
import useStore from "@store/store";

const info: { field: string; value: string; disabled: boolean; api_id: any }[] =
  [
    {
      field: "Name",
      value: "Enter your Name",
      disabled: true,
      api_id: "name",
    },
    {
      field: "Program",
      value: "Select your Program",
      disabled: true,
      api_id: "program",
    },
    {
      field: "Department",
      value: "Select your Department",
      disabled: true,
      api_id: "department",
    },
    {
      field: "Specialisation",
      value: "Enter your Specialisation",
      disabled: false,
      api_id: "specialization",
    },
    {
      field: "IITK Roll No.",
      value: "Enter your IITK Roll No.",
      disabled: false,
      api_id: "roll_no",
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
      field: "Disability",
      value: "Select your Disability Status",
      disabled: false,
      api_id: "disability",
    },
    {
      field: "DOB",
      value: "Enter your Date of Birth",
      disabled: false,
      api_id: "dob",
    },
    {
      field: "Expected Graduation Year",
      value: "Select your Graduation Year",
      disabled: false,
      api_id: "expected_graduation_year",
    },
    {
      field: "IITK Email",
      value: "Your IITK email",
      disabled: false,
      api_id: "iitk_email",
    },
    {
      field: "Personal Email",
      value: "Enter your Personal Email",
      disabled: false,
      api_id: "personal_email",
    },
    {
      field: "Contact Number",
      value: "Enter your Contact Number",
      disabled: false,
      api_id: "phone",
    },
    {
      field: "Alternate Contact Numer",
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
      field: "UG CPI(on for PG Students)",
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
      field: "12th Board Marks",
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
  ];

function Details() {
  const [StudentData, setStudentData] = useState<Student>({ ID: 0 } as Student);
  const { token } = useStore();
  const router = useRouter();
  const { studentId } = router.query;
  const sId = (studentId || "").toString();

  // const deleteStudentData = async () => {
  //   await AdminStudentRequest.delete(token, parseInt(sId, 10));
  // };

  const verify = async () => {
    const data = {
      is_verified: true,
      ID: parseInt(sId, 10),
    } as Student;
    await AdminStudentRequest.update(token, data);
  };

  useEffect(() => {
    const fetch = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const student = await AdminStudentRequest.get(
        token,
        parseInt(sId, 10)
      ).catch(() => ({ ID: 0 } as Student));
      setStudentData(student);
    };
    fetch();
  }, [token, sId]);
  return (
    <div style={{ padding: "0 2rem" }}>
      <Meta title="Profile - Student Dashboard" />
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <h1>Profile</h1>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Link href={`${sId}/edit`} passHref>
              <Button variant="contained" sx={{ width: 100 }}>
                Edit
              </Button>
            </Link>
            {/* <Button
              variant="contained"
              sx={{ width: 150 }}
              onClick={() => {
                deleteStudentData();
                router.push("/admin/student");
              }}
            >
              Delete
            </Button> */}
            <Button
              variant="contained"
              sx={{ width: 100 }}
              onClick={() => {
                verify();
                router.push("/admin/student");
              }}
            >
              Verify
            </Button>
          </Stack>
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
                  <p>{item.field}</p>
                  <TextField
                    fullWidth
                    disabled
                    id="standard-basic"
                    variant="standard"
                    value={
                      item.api_id === "dob"
                        ? new Date(StudentData.dob).toLocaleDateString()
                        : StudentData[item.api_id as keyof Student]
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Card>
        </Stack>
      </Stack>
    </div>
  );
}

Details.layout = "adminDashBoard";
export default Details;
