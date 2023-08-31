import {
  Autocomplete,
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
import { getDepartment, getId,getProgram } from "@components/Parser/parser";
import { ST } from "next/dist/shared/lib/utils";

function ProfileEdit() {
  const [StudentData, setStudentData] = useState<Student>({ ID: 0 } as Student);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<Student>({
    defaultValues: StudentData,
  });
  const [dept, setDept] = useState<any>("");
  const [deptSec, setDeptSec] = useState<any>("");
  const [progm, setProgram]=useState<any>("");
  const [progmSec, setProgramSec] = useState<any>("");
  const [preference, setPreference] = useState<any>("");
  const [specialization, setSpecialization] = useState<any>("");
  const [gender,setGender]=useState<any>("");
  const [verified,setVerified] = useState<any>(false);

  const [details,setDetails] = useState({
    preference:"",
    specialization:"",
    gender:"",
    disability: "",
    dob:"",
    expected_graduation_year:"",
    tenth_board:"",
    tenth_year:"",
    tenth_marks:"",
    twelfth_board:"",
    twelfth_year:"",
    twelfth_marks:"",
    entrance_exam:"",
    entrance_exam_rank:"",
    category:"",
    category_rank:"",
    personal_email:"",
    current_address:"",
    permanent_address:"",
    friend_name:"",
    friend_phone:"",
    current_cpi: "",
    ug_cpi: "",


  })
  const handleChanges=(e)=>{
    const {name ,value} = e.target
    setDetails((prev)=>{
      return {...prev,[name]:value}
    })
    ;
  }


  const { token } = useStore();
  const router = useRouter();
  const fetch = async () => {
    const student = await studentRequest
      .get(token)
      .catch(() => ({ ID: 0 } as Student));

    setStudentData(student);
    setDetails(student);
    setDept(getDepartment(student.program_department_id));
    setDeptSec(getDepartment(student.secondary_program_department_id));
    setProgram(getProgram(student.program_department_id));
    console.log(getProgram(student.program_department_id))
    setProgramSec(getProgram(student.secondary_program_department_id));
    setSpecialization(student.specialization);
    setPreference(String(student.preference));
    setGender(String(student.gender));
    setVerified(student.is_verified);
    reset({
      name: student.name,
      iitk_email: student.iitk_email,
      roll_no: student.roll_no,
    });
  };
  useEffect(() => {
    fetch();
  }, [token, reset]);

  const onSubmit = async (data: Student) => {
    let program_department_id = getId(
      getValues("program"),
      getValues("department")
    );

    let secondary_program_department_id = getId(
      getValues("program_2"),
      getValues("department_2")
    );

    if (secondary_program_department_id === 200)
      secondary_program_department_id = 0;

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
    <div>
      <Meta title="Edit Profile - Student Dashboard " />
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <h2>Edit Profile</h2>
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
        <h3 style={{ fontWeight: 300 }}>
          Please fill in corresponding details <b>only</b> for the fields you
          want to edit.
        </h3>
        <h4 style={{ fontWeight: 300 }}>
          PS. If your profile is already verified, it will be reverted upon any
          change.
        </h4>
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
                  <p>Expected Year of Graduation</p>
                  <TextField
                  value={details.expected_graduation_year}
                  name="expected_graduation_year"
                    fullWidth
                    type="number"
                    id="standard-basic"
                    variant="standard"
                    // readOnly={verified}
                    // disabled={verified}
                    error={!!errors.expected_graduation_year}
                    helperText={
                      errors.expected_graduation_year
                        ? "Year doesnt lie in required range!"
                        : ""
                    }
                    {...register("expected_graduation_year", {
                      setValueAs: (value) => parseInt(value, 10),
                      max: 9999,
                      min: 1000,
                    })}
                    onWheel={(event) =>
                      (event.target as HTMLTextAreaElement).blur()
                    }
                    onChange={handleChanges}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Department</p>
                  <Select
                  value={dept}
                    fullWidth
                    variant="standard"
                    readOnly={verified}

                    {...register("department")}
                    onChange={(e) => {
                      setDept(e.target.value);
                    }}
                  >
                    <MenuItem value="" />
                    <MenuItem value="NA">None</MenuItem>
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
                    value={progm}
                      fullWidth
                      variant="standard"
                    // disabled={verified}
                    readOnly={verified}


                      {...register("program")}
                      onChange={(e) => {
                        setProgram(e.target.value);
                      }}
                    >
                      <MenuItem value="" />
                      <MenuItem value="NA">None</MenuItem>
                      {dept !== "" &&
                        dept !== "NA" &&
                        Object.keys(func[dept as keyof typeof func]).map(
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
                      fullWidth
                      value={progm}
                      variant="standard"
                    // disabled={verified}
                    readOnly={verified}


                      {...register("program")}
                      onChange={(e) => {
                        setProgram(e.target.value);
                      }}
                    >
                      <MenuItem value="" />
                      <MenuItem value="NA">None</MenuItem>
                    </Select>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Secondary Department</p>
                  <Select
                    fullWidth
                    value={deptSec}
                    // disabled={verified}
                    readOnly={verified}


                    variant="standard"
                    {...register("department_2")}
                    onChange={(e) => {
                      setDeptSec(e.target.value);
                    }}
                  >
                    <MenuItem value="" />
                    <MenuItem value="NA">None</MenuItem>
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
                    value={progmSec}
                      fullWidth
                      variant="standard"
                    // disabled={verified}
                    readOnly={verified}


                      {...register("program_2")}
                      onChange={(e) => {
                        setProgramSec(e.target.value);
                      }}
                    >
                      <MenuItem value="" />
                      <MenuItem value="NA">None</MenuItem>
                      {deptSec !== "" &&
                        deptSec !== "NA" &&
                        Object.keys(func[deptSec as keyof typeof func]).map(
                          (program: any) => {
                            if (
                              func[deptSec as keyof typeof func][
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
                      fullWidth
                      value={progmSec}
                    // disabled={verified}
                    readOnly={verified}


                      variant="standard"
                      {...register("program_2")}
                      onChange={(e) => {
                        setProgramSec(e.target.value);
                      }}
                    >
                      <MenuItem value="" />
                      <MenuItem value="NA">None</MenuItem>
                    </Select>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <p>Specialization</p>
                  <TextField
                    fullWidth
                    value={details.specialization}
                    // disabled={verified}

                    name='specialization'
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    {...register("specialization")}
                    onChange={handleChanges}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <p>Preference</p>
                  <Select
                    fullWidth
                    value={preference}
                    // disabled={verified}

                    name="preference"
                    variant="standard"
                    {...register("preference")}
                    onChange={(e) => {
                      setPreference(e.target.value);
                    }}
                  >
                    <MenuItem value="" />
                    <MenuItem value="Academic">Academic</MenuItem>
                    <MenuItem value="Industrial">Industrial</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Gender</p>
                  <Select fullWidth value={gender} name='gender' disabled={verified} variant="standard" {...register("gender")} onChange={(e)=>setGender(e.target.value)}>
                    <MenuItem value="" />
                    <MenuItem value="NA">None</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>  
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Personal Email</p>
                  <TextField
                    fullWidth
                    value={details.personal_email}
                    name="personal_email"
                    // disabled={verified}
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    {...register("personal_email")}
                    onChange={handleChanges}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Date Of Birth</p>
                  <TextField
                    fullWidth
                    type="date"
                    name="dob"
                    disabled={verified}
                    value={details.dob}
                    id="standard-basic"
                    variant="standard"
                    {...register("dob", {
                      setValueAs: (date) => {
                        const d = new Date(date);
                        const epoch = d.getTime();
                        return epoch;
                      },
                    })}
                    onChange={handleChanges}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Contact Number</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    name="phone"
                    value={details.phone}
                    // disabled={verified}
                    variant="standard"
                    error={!!errors.phone}
                    helperText={
                      errors.phone ? "Contact No. must contain 10 digits!" : ""
                    }
                    {...register("phone", { minLength: 10, maxLength: 10 })}
                    onChange={handleChanges}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Alternate Contact Number</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    name="alternate_phone"
                    // disabled={verified}
                    value={details.alternate_phone}
                    error={!!errors.alternate_phone}
                    helperText={
                      errors.phone
                        ? "Alternate Contact No. must contain 10 digits!"
                        : ""
                    }
                    {...register("alternate_phone", {
                      minLength: 10,
                      maxLength: 10,
                    })}
                    onChange={handleChanges}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Whatsapp Number</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    name="whatsapp_number"
                    // disabled={verified}
                    value={details.whatsapp_number}
                    variant="standard"
                    error={!!errors.whatsapp_number}
                    helperText={
                      errors.phone
                        ? "Whatsapp Contact No. must contain 10 digits!"
                        : ""
                    }
                    {...register("whatsapp_number", {
                      minLength: 10,
                      maxLength: 10,
                    })}
                    onChange={handleChanges}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Current CPI</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    name="current_cpi"
                    disabled={verified}
                    value={details.current_cpi}
                    variant="standard"
                    {...register("current_cpi", {
                      setValueAs: (value) => parseFloat(value),
                    })}
                    onChange={handleChanges}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>UG CPI(only for PG Students)</p>
                  <TextField
                    fullWidth
                    type="text"
                    name="ug_cpi"
                    disabled={verified}
                    value={details.ug_cpi}
                    id="standard-basic"
                    variant="standard"
                    {...register("ug_cpi", {
                      setValueAs: (value) => parseFloat(value),
                    })}
                    onChange={handleChanges}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>10th Board</p>
                  <Autocomplete
                    freeSolo
                    name="tenth_board"
                    value={details.tenth_board}
                    disabled={verified}
                    options={["CBSE", "ICSE"]}
                    onChange={handleChanges}

                    renderInput={(params) => (
                      <TextField
                      
                        {...params}
                        variant="standard"
                        {...register("tenth_board")}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>10th Board Year</p>
                  <TextField
                    fullWidth
                    type="number"
                    id="standard-basic"
                    name="tenth_year"
                    disabled={verified}
                    value={details.tenth_year}
                    variant="standard"
                    error={!!errors.tenth_year}
                    helperText={
                      errors.tenth_year
                        ? "Year doesnt lie in required range!"
                        : ""
                    }
                    {...register("tenth_year", {
                      setValueAs: (value) => parseInt(value, 10),
                      max: 9999,
                      min: 1000,
                    })}
                    onWheel={(event) =>
                      (event.target as HTMLTextAreaElement).blur()
                    }
                    onChange={handleChanges}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>10th Marks (CGPA / Percentage)</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    name="tenth_marks"
                    disabled={verified}
                    value={details.tenth_marks}
                    variant="standard"
                    {...register("tenth_marks", {
                      setValueAs: (value) => parseFloat(value),
                      min: 0,
                      max: 100,
                    })}
                    onChange={handleChanges}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>12th Board</p>
                  <Autocomplete
                    freeSolo
                    name="twelfth_board"
                    value={details.twelfth_board}
                    disabled={verified}
                    options={["CBSE", "ICSE"]}
                    onChange={handleChanges}

                    renderInput={(params) => (
                      <TextField
                      
                        {...params}
                        variant="standard"
                        {...register("twelfth_board")}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>12th Board Year</p>
                  <TextField
                    fullWidth
                    type="number"
                    id="standard-basic"
                    name="twelfth_year"
                    disabled={verified}
                    value={details.twelfth_year}
                    variant="standard"
                    error={!!errors.twelfth_year}
                    helperText={
                      errors.twelfth_year
                        ? "Year doesnt lie in required range!"
                        : ""
                    }
                    {...register("twelfth_year", {
                      setValueAs: (value) => parseInt(value, 10),
                      max: 9999,
                      min: 1000,
                    })}
                    onWheel={(event) =>
                      (event.target as HTMLTextAreaElement).blur()
                    }
                    onChange={handleChanges}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>12th Marks (CGPA / Percentage)</p>
                  <TextField
                    fullWidth
                    type="text"
                    name="twelfth_marks"
                    disabled={verified}
                    value={details.twelfth_marks}
                    id="standard-basic"
                    variant="standard"
                    {...register("twelfth_marks", {
                      setValueAs: (value) => parseFloat(value),
                      min: 0,
                      max: 100,
                    })}
                    onChange={handleChanges}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Entrance Exam</p>
                  <Select
                    fullWidth
                    variant="standard"
                    name="entrance_exam"
                    disabled={verified}
                    value={details.entrance_exam}
                    {...register("entrance_exam")}
                    onChange={handleChanges}
                  >
                    <MenuItem value="" />
                    <MenuItem value="NA">None</MenuItem>

                    <MenuItem value="JEE Advanced">JEE Advanced</MenuItem>
                    <MenuItem value="GATE">GATE</MenuItem>
                    <MenuItem value="JAM">JAM</MenuItem>
                    <MenuItem value="CEED">CEED</MenuItem>
                    <MenuItem value="JMET">CAT</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Entrance Exam Rank</p>
                  <TextField
                    fullWidth
                    type="number"
                    id="standard-basic"
                    name="entrance_exam_rank"
                    disabled={verified}
                    value={details.entrance_exam_rank}
                    variant="standard"
                    {...register("entrance_exam_rank", {
                      setValueAs: (value) => parseInt(value, 10),
                    })}
                    onWheel={(event) =>
                      (event.target as HTMLTextAreaElement).blur()
                    }
                    onChange={handleChanges}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Category</p>
                  <Select
                    fullWidth
                    variant="standard"
                    name="category"
                    value={details.category}
                    disabled={verified}
                    {...register("category")}
                    onChange={handleChanges}
                  >
                    <MenuItem value="" />
                    <MenuItem value="NA">None</MenuItem>

                    <MenuItem value="General">General</MenuItem>
                    <MenuItem value="General-EWS">General-EWS</MenuItem>
                    <MenuItem value="OBC">OBC</MenuItem>
                    <MenuItem value="SC">SC</MenuItem>
                    <MenuItem value="ST">ST</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Category Rank</p>
                  <TextField
                    fullWidth
                    type="number"
                    name="category"
                    value={details.category_rank}
                    disabled={verified}
                    id="standard-basic"
                    variant="standard"
                    {...register("category_rank", {
                      setValueAs: (value) => parseInt(value, 10),
                    })}
                    onWheel={(event) =>
                      (event.target as HTMLTextAreaElement).blur()
                    }
                    onChange={handleChanges}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Current Address</p>
                  <TextField
                    fullWidth
                    type="text"
                    name="current_address"
                    value={details.current_address}
                    // disabled={verified}
                    id="standard-basic"
                    variant="standard"
                    multiline
                    minRows={3}
                    {...register("current_address")}
                    onChange={handleChanges}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Permanent Address</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    name="permanent_address"
                    // disabled={verified}
                    value={details.permanent_address}
                    variant="standard"
                    multiline
                    minRows={3}
                    {...register("permanent_address")}
                    onChange={handleChanges}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Friend Name</p>
                  <TextField
                    fullWidth
                    type="text"
                    name="friend_name"
                    value={details.friend_name}
                    // disabled={verified}
                    id="standard-basic"
                    variant="standard"
                    {...register("friend_name")}
                    onChange={handleChanges}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Friend Contact Details</p>
                  <TextField
                    fullWidth
                    type="text"
                    id="standard-basic"
                    name="friend_phone"
                    value={details.friend_phone}
                    // disabled={verified}
                    error={!!errors.friend_phone}
                    helperText={
                      errors.friend_phone
                        ? "Contact number must be 10 digits long!"
                        : ""
                    }
                    variant="standard"
                    {...register("friend_phone", {
                      minLength: 10,
                      maxLength: 10,
                    })}
                    onChange={handleChanges}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p>Disability</p>
                  <Select
                    fullWidth
                    variant="standard"
                    name="disability"
                    disabled={verified}
                    value={details.disability}
                    {...register("disability")}
                    onChange={handleChanges}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
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
