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

import enrollmentRequest, {
  studentEnrollResponse,
} from "@callbacks/student/rc/enrollQuestion";
import Meta from "@components/Meta";
import useStore from "@store/store";

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
function Enrollment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { rcid } = router.query;
  const { token } = useStore();
  const [questions, setQuestions] = useState<studentEnrollResponse[]>();

  useEffect(() => {
    if (rcid === "" || rcid === undefined) return;
    const fetch = async () => {
      const response = await enrollmentRequest.getStudentEnrollment(
        token,
        rcid.toString()
      );
      setQuestions(response);
    };
    fetch();
  }, [rcid, token, router]);

  const onSubmit = async (data: any) => {
    if (questions && rcid !== "" && rcid !== undefined) {
      questions.forEach(async (question) => {
        await enrollmentRequest.postEnrollmentAnswer(
          token,
          rcid.toString(),
          question.ID,
          data[question.ID]
        );
      });
    }
    router.push(`/student/rc/${rcid}/notices`);
  };

  const renderSwitch = (index: number, question: studentEnrollResponse) => {
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
                      {...register(name, {
                        required: question.mandatory,
                      })}
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
              {...register(name, {
                required: question.mandatory,
              })}
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
                  {...register(name, {
                    required: question.mandatory,
                  })}
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="False"
                  {...register(name, {
                    required: question.mandatory,
                  })}
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
  return (
    <div>
      <Meta title="Student Dashboard - Enrollment" />
      <Stack alignItems="center" spacing={4}>
        <Box sx={boxStyle}>
          <Stack spacing={4}>
            <Stack spacing={2} alignItems="flex-start">
              <h2>Enrollment Questions</h2>
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
                <Typography variant="subtitle1">
                  No questions to show! Click Submit to Proceed.
                </Typography>
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
Enrollment.layout = "studentPhaseDashboard";
export default Enrollment;
