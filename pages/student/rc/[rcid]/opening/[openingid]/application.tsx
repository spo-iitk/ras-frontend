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

import applicationRequest, {
  answerApplication,
  studentApplicationQuestions,
} from "@callbacks/student/rc/applyQuestions";
import Meta from "@components/Meta";
import useStore from "@store/store";

const boxStyle = {
  width: { xs: "92%", sm: "600px", md: "720px" },
  bgcolor: "background.paper",
  borderRadius: "18px",
  boxShadow: "0 18px 45px rgba(0,0,0,0.16)",
  p: { xs: 3, sm: 4 },
  marginTop: 5,
  marginBottom: 10,
};
function Apply() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { rcid, openingid, rsid } = router.query;

  const { token } = useStore();
  const [questions, setQuestions] = useState<studentApplicationQuestions[]>();
  useEffect(() => {
    if (!rcid || !openingid) return;
    const fetch = async () => {
      const response = await applicationRequest
        .getApplicationQuestion(token, rcid.toString(), openingid.toString())
        .catch(() => [{ type: "null" }] as studentApplicationQuestions[]);
      setQuestions(
        response.filter((question) => question.event === "Application")
      );
    };
    fetch();
  }, [rcid, token, router, openingid]);

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
      if (rcid && openingid && rsid) {
        await applicationRequest.postApplicationAnswer(
          token,
          rcid.toString(),
          openingid.toString(),
          { resume_id: parseInt(rsid.toString(), 10), answers: res }
        );
      }
    }
    router.push(`/student/rc/${rcid}/opening`);
  };

  const renderSwitch = (
    index: number,
    question: studentApplicationQuestions
  ) => {
    if (!question) return <div />;

    const name = question.ID.toString();
    const isMandatory = question.mandatory;

    switch (question?.type) {
      case "MCQ":
        return (
          <FormControl error={!!errors[name]}>
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
                    key={option.trim()}
                    value={option.trim()}
                    control={<Radio />}
                    label={option.trim()}
                    {...register(name, {
                      required: isMandatory,
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
            fullWidth
            multiline
            minRows={3}
            defaultValue={question.answer}
            variant="outlined"
            placeholder="Type your answer here..."
            error={!!errors[name]}
            helperText={errors[name] ? "This question is required" : " "}
            sx={{
              mt: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
            {...register(name, {
              required: isMandatory,
              validate: (value) => {
                if (!isMandatory) return true;
                return value?.toString().trim() !== "";
              },
            })}
          />
        );

      case "Boolean":
        return (
          <FormControl error={!!errors[name]}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={question.answer?.toString()}
              row
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="True"
                {...register(name, {
                  required: isMandatory,
                })}
              />

              <FormControlLabel
                value="false"
                control={<Radio />}
                label="False"
                {...register(name, {
                  required: isMandatory,
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
  };

  return (
    <div>
      <Meta title="RC - Openings - QnA" />
      <Stack alignItems="center" spacing={4}>
        <Box sx={boxStyle}>
          <Stack spacing={4}>
            <Stack spacing={2} alignItems="flex-start">
              <h2>Application Questions</h2>
              {questions &&
                questions.length > 0 &&
                questions.map((question, index) => (
                  <FormControl
                    key={question.ID}
                    sx={{
                      width: "100%",
                      p: 2.5,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "14px",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      QUESTION {index + 1}
                    </Typography>

                    <Typography variant="h6" fontWeight={600}>
                      {question.question}
                      {question.mandatory && (
                        <Typography
                          component="span"
                          color="error"
                          sx={{ ml: 0.5 }}
                        >
                          *
                        </Typography>
                      )}
                    </Typography>

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
