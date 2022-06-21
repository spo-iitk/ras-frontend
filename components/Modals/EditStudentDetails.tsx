import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

import useStore from "@store/store";
import getStudents, { Student } from "@callbacks/admin/rc/student/getStudents";

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

function EditStudent({
  handleCloseNew,
  setRows,
  studentData,
  rcid,
}: {
  handleCloseNew: () => void;
  setRows: React.Dispatch<React.SetStateAction<any>>;
  studentData: Student[];
  rcid: string;
}) {
  //   const [formdata, setform] = useState<Student>({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Student>();
  const { token } = useStore();
  const onSubmit = (data: Student) => {
    if (rcid === undefined || rcid === "") return;
    const editStudentData = async () => {
      const response = await getStudents.update(token, data, rcid);
      if (response) {
        reset({
          ID: 0,
          name: "",
          email: "",
          cpi: 0,
          program_department_id: 0,
          secondary_program_department_id: 0,
          student_id: 0,
          is_frozen: false,
          type: "",
        });
      }
      const fetchStudentDetails = async () => {
        await getStudents.getAllStudents(token, rcid).then((res) => {
          setRows(
            res.map((student: Student) => ({
              created_at: student.CreatedAt,
              deleted_at: student.DeletedAt,
              updated_at: student.UpdatedAt,
              comment: student.comment,
              id: student.ID,
              name: student.name,
              email: student.email,
              cpi: student.cpi,
              program_department_id: student.program_department_id,
              secondary_program_department_id:
                student.secondary_program_department_id,
              recruitment_cycle_id: student.recruitment_cycle_id,
              student_id: student.student_id,
              is_frozen: student.is_frozen,
              type: student.type,
            }))
          );
        });
      };
      fetchStudentDetails();
    };
    editStudentData();
    handleCloseNew();
  };
  const handleChange = (event: any) => {
    console.log(event.target.value);
    let i = 0;
    for (i = 0; i < studentData.length; i += 1) {
      if (studentData[i].ID === event.target.value) {
        // setform(studentData[i]);
        reset(studentData[i]);
        break;
      }
    }
  };
  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h1>Edit Students</h1>
        <FormControl sx={{ m: 1 }}>
          <InputLabel id="edit-student">Select ID</InputLabel>
          <Select
            label="ID"
            id="ID"
            labelId="edit-student"
            error={!!errors.ID}
            variant="standard"
            onChange={(e) => {
              //   console.log(this);
              handleChange(e);
            }}
            // {...register("ID")}
          >
            {studentData.map((student: Student) => (
              <MenuItem value={student.ID}>{student.ID}</MenuItem>
            ))}
            {/* <MenuItem value={10}>10</MenuItem> */}
          </Select>
        </FormControl>
        <TextField
          label="Student Name"
          id="studentName"
          error={!!errors.name}
          variant="standard"
          {...register("name")}
        />
        <TextField
          label="Email"
          id="email"
          error={!!errors.email}
          variant="standard"
          {...register("email")}
        />
        <TextField
          label="CPI"
          id="cpi"
          error={!!errors.cpi}
          variant="standard"
          {...register("cpi")}
        />
        <TextField
          label="Department"
          id="department"
          error={!!errors.program_department_id}
          variant="standard"
          {...register("program_department_id")}
        />
        <TextField
          label="Secondary Department"
          id="secondary_department"
          error={!!errors.secondary_program_department_id}
          variant="standard"
          {...register("secondary_program_department_id")}
        />
        <TextField
          label="Student ID"
          id="student_id"
          error={!!errors.secondary_program_department_id}
          variant="standard"
          {...register("student_id")}
        />
        <TextField
          label="Frozen"
          id="frozen"
          error={!!errors.secondary_program_department_id}
          variant="standard"
          {...register("is_frozen")}
        />
        <TextField
          label="Type"
          id="type"
          error={!!errors.secondary_program_department_id}
          variant="standard"
          {...register("type")}
        />
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
            onClick={handleSubmit(onSubmit)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
            onClick={() => {
              reset({
                ID: 0,
                name: "",
                email: "",
                cpi: 0,
                program_department_id: 0,
                secondary_program_department_id: 0,
                student_id: 0,
                is_frozen: false,
                type: "",
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

EditStudent.layout = "adminPhaseDashBoard";
export default EditStudent;
