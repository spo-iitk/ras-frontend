import { Card, Grid, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import AdminStudentRequest, {
  Student,
} from "@callbacks/admin/student/adminStudent";
import useStore from "@store/store";
import { getDepartment, getProgram } from "@components/Parser/parser";

const info: { field: string; value: string; disabled: boolean; api_id: any }[] =
  [
    {
      field: "Name",
      value: "Enter your Name",
      disabled: true,
      api_id: "name",
    },
    {
      field: "User ID",
      value: "Your User ID",
      disabled: false,
      api_id: "user_id",
    },
    {
      field: "Active Status",
      value: "Enter Activity Status",
      disabled: false,
      api_id: "is_active",
    },
    {
      field: "Role ID",
      value: "Enter your Role ID",
      disabled: false,
      api_id: "expected_graduation_year",
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
    await AdminStudentRequest.verify(token, sId, true);
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
    if (router.isReady) fetch();
  }, [token, sId, router.isReady]);

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
      <Meta title={`${StudentData.name} - Master Student Details`} />
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
              href={`${sId}/edit`}
              variant="contained"
              sx={{ width: 100 }}
            >
              Edit
            </Button>
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
                    InputProps={{
                      readOnly: true,
                    }}
                    id="standard-basic"
                    variant="standard"
                    value={handleValue(item.api_id)}
                    multiline={
                      item.field === "Current Address" ||
                      item.field === "Permanent Address"
                    }
                    minRows={3}
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
