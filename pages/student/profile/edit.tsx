import {
  Button,
  Card,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import studentRequest, { Student } from "@callbacks/student/student";
import useStore from "@store/store";
import { Branches, func, programType } from "@components/Utils/matrixUtils";

function ProfileEdit() {
  const [StudentData, setStudentData] = useState<Student>({ ID: 0 } as Student);
  const { register, handleSubmit, reset, getValues } = useForm<Student>({
    defaultValues: StudentData,
  });
  const [dept, setDept] = useState<any>("");
  const [deptSec, setDeptSec] = useState<any>("");

  const { token } = useStore();
  const router = useRouter();
  useEffect(() => {
    const fetch = async () => {
      const student = await studentRequest
        .get(token)
        .catch(() => ({ ID: 0 } as Student));
      setStudentData(student);
      reset(student);
    };
    fetch();
  }, [token, reset]);

  const onSubmit = async (data: Student) => {
    let program_department_id;
    if (
      getValues("program") === "" ||
      getValues("program") === undefined ||
      getValues("department") === "" ||
      getValues("department") === undefined
    ) {
      program_department_id = 0;
    } else {
      program_department_id =
        func[getValues("department") as keyof typeof func][
          getValues("program") as keyof programType
        ];
    }
    let secondary_program_department_id;
    if (
      getValues("program_2") === "" ||
      getValues("program_2") === undefined ||
      getValues("department_2") === "" ||
      getValues("department_2") === undefined
    ) {
      secondary_program_department_id = 0;
    } else {
      secondary_program_department_id =
        func[getValues("department_2") as keyof typeof func][
          getValues("program_2") as keyof programType
        ];
    }

    const response = await studentRequest.update(token, {
      ...data,
      program_department_id,
      secondary_program_department_id,
    });

    if (response) {
      router.push("/student/profile");
    }
  };
  return (
    <div className="container">
      <Meta title="Edit Profile - Student Dashboard " />
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
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{ width: 100 }}
            >
              Save
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
        <form style={{ marginBottom: 10 }}>
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
                <Grid item xs={12} sm={6}>
                  <p>Name</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    disabled
                    {...register("name")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>IITK Email</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    disabled
                    {...register("iitk_email")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Department</p>
                  <Select
                    defaultValue=""
                    fullWidth
                    variant="standard"
                    {...register("department")}
                    onChange={(e) => {
                      setDept(e.target.value);
                    }}
                  >
                    <MenuItem value="">None</MenuItem>
                    {Branches.map((branch) => (
                      <MenuItem key={branch} value={branch}>
                        {branch}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Program</p>
                  {dept !== "" ? (
                    <Select
                      defaultValue=""
                      fullWidth
                      variant="standard"
                      {...register("program")}
                    >
                      <MenuItem value="">None</MenuItem>
                      {Object.keys(func[dept as keyof typeof func]).map(
                        (program: any) => {
                          if (
                            func[dept as keyof typeof func][
                              program as keyof programType
                            ] !== -1
                          ) {
                            return (
                              <MenuItem key={program} value={program}>
                                {program}
                              </MenuItem>
                            );
                          }
                          return null;
                        }
                      )}
                    </Select>
                  ) : (
                    <Select
                      defaultValue=""
                      fullWidth
                      variant="standard"
                      {...register("program")}
                    >
                      <MenuItem value="">None</MenuItem>
                    </Select>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Secondary Department</p>
                  <Select
                    defaultValue=""
                    fullWidth
                    variant="standard"
                    {...register("department_2")}
                    onChange={(e) => {
                      setDeptSec(e.target.value);
                    }}
                  >
                    <MenuItem value="">None</MenuItem>
                    {Branches.map((branch) => (
                      <MenuItem key={branch} value={branch}>
                        {branch}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Secondary Program</p>
                  {deptSec !== "" ? (
                    <Select
                      defaultValue=""
                      fullWidth
                      variant="standard"
                      {...register("program_2")}
                    >
                      <MenuItem value="">None</MenuItem>
                      {Object.keys(func[dept as keyof typeof func]).map(
                        (program: any) => {
                          if (
                            func[dept as keyof typeof func][
                              program as keyof programType
                            ] !== -1
                          ) {
                            return (
                              <MenuItem key={program} value={program}>
                                {program}
                              </MenuItem>
                            );
                          }
                          return null;
                        }
                      )}
                    </Select>
                  ) : (
                    <Select
                      defaultValue=""
                      fullWidth
                      variant="standard"
                      {...register("program")}
                    >
                      <MenuItem value="">None</MenuItem>
                    </Select>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>IITK Roll No.</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    disabled
                    {...register("roll_no")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Specialization</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    {...register("specialization")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Expected Year of Graduation</p>
                  <TextField
                    fullWidth
                    type="number"
                    id="standard-basic"
                    variant="standard"
                    {...register("expected_graduation_year", {
                      setValueAs: (value) => parseInt(value, 10),
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Preference</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    {...register("preference")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Gender</p>
                  <Select
                    defaultValue=""
                    fullWidth
                    variant="standard"
                    {...register("gender")}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Disability</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    {...register("disability")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Personal Email</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    {...register("personal_email")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Date Of Birth</p>
                  <TextField
                    fullWidth
                    type="date"
                    id="standard-basic"
                    variant="standard"
                    {...register("dob")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Contact Number</p>
                  <TextField
                    fullWidth
                    type="number"
                    id="standard-basic"
                    variant="standard"
                    {...register("phone", { minLength: 10, maxLength: 10 })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Alternate Contact Number</p>
                  <TextField
                    fullWidth
                    type="number"
                    id="standard-basic"
                    variant="standard"
                    {...register("alternate_phone", {
                      minLength: 10,
                      maxLength: 10,
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Whatsapp Number</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    {...register("whatsapp_number")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Current CPI</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    {...register("current_cpi", {
                      setValueAs: (value) => parseFloat(value),
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>UG CPI(only for PG Students)</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    {...register("ug_cpi", {
                      setValueAs: (value) => parseFloat(value),
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>10th Board</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    {...register("tenth_board")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>10th Board Year</p>
                  <TextField
                    fullWidth
                    type="number"
                    id="standard-basic"
                    variant="standard"
                    {...register("tenth_year", {
                      setValueAs: (value) => parseInt(value, 10),
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>10th Marks</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    {...register("tenth_marks")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>12th Board</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    {...register("twelfth_board")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>12th Board Year</p>
                  <TextField
                    fullWidth
                    type="number"
                    id="standard-basic"
                    variant="standard"
                    {...register("twelfth_year", {
                      setValueAs: (value) => parseInt(value, 10),
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>12th Marks</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    {...register("twelfth_marks")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Entrance Exam</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    {...register("entrance_exam")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Entrance Exam Rank</p>
                  <TextField
                    fullWidth
                    type="number"
                    id="standard-basic"
                    variant="standard"
                    {...register("entrance_exam_rank")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Category</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    {...register("category")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Category Rank</p>
                  <TextField
                    fullWidth
                    type="number"
                    id="standard-basic"
                    variant="standard"
                    {...register("category_rank")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Current Address</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    multiline
                    {...register("current_address")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Permanent Address</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    multiline
                    {...register("permanent_address")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Friend Name</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    {...register("friend_name")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Freind Contact Details</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    {...register("friend_phone")}
                  />
                </Grid>
              </Grid>
            </Card>
          </Stack>
        </form>
      </Stack>
    </div>
  );
}

ProfileEdit.layout = "studentDashboard";
export default ProfileEdit;
