import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import applicationRequest, {
  answerApplication,
  studentApplicationQuestions,
} from "@callbacks/student/rc/applyQuestions";
import Meta from "@components/Meta";
import useStore from "@store/store";
import resumeRequest, {
  AllStudentResumeResponse,
} from "@callbacks/student/rc/resume";

const boxStyle = {
  width: { xs: "330px", md: "500px" },
  bgcolor: "background.paper",
  border: "white solid 2px",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  marginTop: 5,
  marginBottom: 10,
  alignItems: "center",
};
function Apply() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { rcid, openingid } = router.query;
  const rid = rcid as string;

  const { token } = useStore();
  const [questions, setQuestions] = useState<studentApplicationQuestions[]>();
  const [resumes, setResume] = useState<AllStudentResumeResponse[]>([]);

  const onSubmit = async (data: any) => {
    if (questions) {
      let res: answerApplication[] = [];
      questions.forEach((question) => {
        let obj: answerApplication = {
          application_question_id: question.ID,
          answer: data[question.ID],
        };
        res.push(obj);
      });
      if (rcid && openingid) {
        await applicationRequest.postApplicationAnswer(
          token,
          rid,
          openingid as string,
          {
            resume_id: data.resume,
            answers: res,
          }
        );
      }
    }
    router.push(`/student/rc/${rcid}/opening`);
  };

  const renderSwitch = (
    index: number,
    question: studentApplicationQuestions
  ) => {
    if (question) {
      let name = question.ID.toString();
      switch (question?.type) {
        case "MCQ":
          return (
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={question.answer}
                row
              >
                {question.options
                  .toString()
                  .split(",")
                  .map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                      {...register(name)}
                    />
                  ))}
              </RadioGroup>
              {errors[name] && (
                <Typography variant="caption" color="error">
                  *Required
                </Typography>
              )}
            </FormControl>
          );
        case "Short Answer":
          return (
            <TextField
              multiline
              minRows={3}
              defaultValue={question.answer}
              variant="standard"
              error={errors[name]}
              helperText={errors[name] && "*Required"}
              {...register(name)}
            />
          );
        case "Boolean":
          return (
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={question.answer}
                row
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="True"
                  {...register(name)}
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="False"
                  {...register(name)}
                />
              </RadioGroup>
              {errors[name] && (
                <Typography variant="caption" color="error">
                  *Required
                </Typography>
              )}
            </FormControl>
          );
        default:
          return <div />;
      }
    }
    return <div />;
  };

  useEffect(() => {
    const getResume = async () => {
      const resume = await resumeRequest.get(token, rid);
      setResume(resume);
    };
    const fetchQuestions = async () => {
      const response = await applicationRequest
        .getApplicationQuestion(token, rid, openingid as string)
        .catch(() => ({ type: "null" } as studentApplicationQuestions));
      setQuestions(response);
    };
    if (router.isReady) {
      fetchQuestions();
      getResume();
    }
  }, [openingid, rid, router.isReady, token]);

  return (
    <div>
      <Meta title="RC - Openings - QnA" />
      <Stack alignItems="center" spacing={4}>
        <Box sx={boxStyle}>
          <Stack spacing={4}>
            <Stack spacing={2} alignItems="flex-start">
              <h2>Select Resume</h2>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select defaultValue="" label="Resume" {...register("resume")}>
                  <MenuItem value={0}>
                    <em>None</em>
                  </MenuItem>
                  {resumes.map((resume) => {
                    if (resume.verified.Bool && resume.verified.Valid) {
                      return <MenuItem value={resume.ID}>{resume.ID}</MenuItem>;
                    }
                    return null;
                  })}
                </Select>
              </FormControl>
              <h2>Application Questions</h2>
              {questions &&
                questions.length > 0 &&
                questions.map((question, index) => (
                  <FormControl key={question.ID} sx={{ m: 1, width: "100%" }}>
                    <h3 style={{ fontWeight: 300 }}>
                      <b>Ques: </b> {questions[index]?.question}
                    </h3>
                    {questions && renderSwitch(index, question)}
                  </FormControl>
                ))}
              {questions && questions.length === 0 && (
                <h4>No Questions Found!</h4>
              )}
            </Stack>
            <Stack spacing={2} alignItems="flex-start" direction="row">
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                onClick={() => window.location.reload()}
              >
                Reset
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
}
Apply.layout = "studentPhaseDashboard";
export default Apply;
