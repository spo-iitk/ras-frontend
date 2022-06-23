import { Button, Card, Grid, Stack, TextField } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import AdminStudentRequest, {
  Student,
} from "@callbacks/admin/student/adminStudent";
import useStore from "@store/store";

const info: {
  field: string;
  value: string;
  disabled: boolean;
  api_id: any;
  isint?: boolean;
}[] = [
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
    isint: true,
  },
  {
    field: "Expected Graduation Year",
    value: "Select your Graduation Year",
    disabled: false,
    api_id: "expected_graduation_year",
    isint: true,
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
    isint: true,
  },
  {
    field: "UG CPI(on for PG Students)",
    value: "Enter your UG CPI",
    disabled: false,
    api_id: "ug_cpi",
    isint: true,
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
    isint: true,
  },
  {
    field: "10th Marks",
    value: "Enter your 10th Marks",
    disabled: false,
    api_id: "tenth_marks",
    isint: true,
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
    isint: true,
  },
  {
    field: "12th Board Marks",
    value: "Enter your 12th Board Marks",
    disabled: false,
    api_id: "twelfth_marks",
    isint: true,
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
    isint: true,
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
    isint: true,
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

function Edit() {
  const [StudentData, setStudentData] = useState<Student>({ ID: 0 } as Student);
  const { register, handleSubmit, reset } = useForm<Student>({
    defaultValues: StudentData,
  });

  const { token } = useStore();
  const router = useRouter();
  const { studentId } = router.query;
  const sId = (studentId || "").toString();
  useEffect(() => {
    const fetch = async () => {
      const student = await AdminStudentRequest.get(
        token,
        parseInt(sId, 10)
      ).catch(() => ({ ID: 0 } as Student));
      setStudentData(student);
      reset(student);
    };
    fetch();
  }, [token, sId, reset]);
  return (
    <div className="container">
      <Meta title="Edit Profile -Admin Student Dashboard " />
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <h1>Edit Profile</h1>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Link href={`/admin/student/${sId}`} passHref>
              <Button variant="contained" sx={{ width: 100 }}>
                Go Back
              </Button>
            </Link>
          </Stack>
        </Stack>
        <form
          onSubmit={handleSubmit(async (data: Student) => {
            const response = await AdminStudentRequest.update(token, {
              ...data,
              ID: parseInt(sId, 10),
            });
            if (response) {
              router.push(`/admin/student/${sId}`);
            }
          })}
        >
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
                      type={
                        // eslint-disable-next-line no-nested-ternary
                        item.api_id === "dob"
                          ? "date"
                          : item.isint
                          ? "number"
                          : "text"
                      }
                      id="standard-basic"
                      variant="standard"
                      multiline={
                        item.api_id === "current_address" ||
                        item.api_id === "permanent_address"
                      }
                      {...register(item.api_id, {
                        setValueAs: (v) => {
                          if (item.api_id === "dob") {
                            const d = new Date(v);
                            const epoch = d.getTime();
                            return epoch;
                          }
                          if (item.isint) return parseInt(v, 10);
                          return v;
                        },
                      })}
                    />
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Stack>
          <Stack alignItems="center" sx={{ padding: 3 }}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </div>
  );
}

Edit.layout = "adminDashBoard";
export default Edit;
