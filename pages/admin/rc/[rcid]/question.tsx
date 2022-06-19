import { Card, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";

import styles from "@styles/adminPhase.module.css";
import Meta from "@components/Meta";
import ActiveButton from "@components/Buttons/ActiveButton";
import UpdateQuestion, { QuestionType } from "@callbacks/admin/addquestion";
import useStore from "@store/store";

const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
    width: 150,
  },
  {
    field: "type",
    headerName: "Question Type",
    width: 300,
  },
  {
    field: "question",
    headerName: "Question",
    width: 300,
  },
  {
    field: "options",
    headerName: "Options",
    width: 300,
  },
  {
    field: "mandatory",
    headerName: "Mandatory",
    width: 100,
  },
];

function RecruitmentCycle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<QuestionType>();
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const [Ques, setQues] = useState<QuestionType[]>([]);
  const { token, rcId } = useStore();

  const getQuestions = async () => {
    if (rid === undefined || rid === "") return;
    const questions = await UpdateQuestion.get(token, rid);
    setQues(questions);
    console.log(Ques);
  };

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: QuestionType) => {
    setValue("recruitment_cycle_id", rcId);
    const postQuestion = async () => {
      if (rid === undefined || rid === "") return;
      const response = await UpdateQuestion.post(data, token, rid);
      if (response) {
        reset({
          question: "",
          mandatory: false,
          options: "",
          type: "",
        });
      }
      console.log(data);
    };
    postQuestion();
    getQuestions();
  };
  return (
    <div className={styles.container}>
      <Meta title="Create New Recruitment Cycle - Admin" />
      <Stack>
        <h1>RECRUITMENT CYCLE</h1>
        <div
          style={{ height: 500, margin: "0px auto", maxWidth: 1200 }}
          className={styles.datagridAttendance}
        >
          <DataGrid
            rows={Ques}
            getRowId={(row: QuestionType) => row.ID}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </div>
        <br />
        <br />
        <Card
          elevation={5}
          sx={{
            padding: 3,
            width: { xs: "330px", sm: "500px", margin: "0px auto" },
          }}
        >
          <Stack spacing={3}>
            <FormControl onSubmit={handleSubmit(onSubmit)}>
              <h2 style={{ margin: "10px 0px" }}>Additional Questions</h2>
              <FormControl sx={{ m: 1 }}>
                <InputLabel id="Type-of-Ques">Type of Question</InputLabel>
                <Select
                  labelId="Type-of-Ques"
                  label="Type of Question"
                  variant="standard"
                  {...register("type")}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="MCQ">MCQ</MenuItem>
                  <MenuItem value="Fill in the blanks">
                    Fill in the blanks
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1 }}>
                <TextField
                  label="Question"
                  variant="standard"
                  {...register("question", { required: true })}
                  helperText={errors.question ? "Required Field" : ""}
                  error={errors.question?.type === "required"}
                />
              </FormControl>
              <FormControl sx={{ m: 1 }}>
                <TextField
                  label="Options (csv)"
                  variant="standard"
                  {...register("options")}
                />
              </FormControl>
              <FormControl sx={{ m: 1 }}>
                <Typography>
                  <Checkbox {...register("mandatory")} />
                  Mandatory
                </Typography>
              </FormControl>
            </FormControl>
            <ActiveButton
              sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
              onClick={handleSubmit(onSubmit)}
            >
              ADD QUESTION
            </ActiveButton>
          </Stack>
        </Card>
      </Stack>
    </div>
  );
}

RecruitmentCycle.layout = "adminPhaseDashBoard";
export default RecruitmentCycle;
