import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";

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
  alignItems: "center",
};
function Enrollment() {
  const { control, register } = useForm();
  const { fields, append } = useFieldArray({
    control,
    name: "enroll",
  });

  const router = useRouter();
  const { rcid } = router.query;
  const { token } = useStore();
  const [questions, setQuestions] = React.useState<studentEnrollResponse[]>();
  useEffect(() => {
    if (rcid === "" || rcid === undefined) return;
    const fetch = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const response = await enrollmentRequest
        .getStudentEnrollment(token, rcid.toString())
        .catch(() => ({ type: "null" } as studentEnrollResponse));
      setQuestions(response);
      response.forEach((question: studentEnrollResponse) => {
        append({
          question: question.question,
          answer: question.answer,
        });
      });
    };
    fetch();
  }, [rcid, token, router, append]);

  const renderSwitch = (index: number) => {
    if (questions) {
      switch (questions[index]?.type) {
        case "MCQ":
          return (
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              row
            >
              {questions[index]?.options
                .toString()
                .split(",")
                .map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                    {...register(`enroll.${index}.answer`)}
                  />
                ))}
            </RadioGroup>
          );
        case "Short Answer":
          return (
            <TextField
              multiline
              minRows={3}
              variant="standard"
              {...register(`enroll.${index}.answer`)}
            />
          );
        default:
          return <div />;
      }
    }
    return <div />;
  };
  return (
    <div className="container">
      <Meta title="Student Dashboard - Enrollment" />
      <Stack alignItems="center">
        <Box sx={boxStyle}>
          <Stack spacing={2} alignItems="flex-start">
            <h1>Enrollment Questions</h1>
            {fields &&
              questions &&
              fields.map((question, index) => (
                <FormControl key={question.id} sx={{ m: 1, width: "100%" }}>
                  <h3 style={{ fontWeight: 300 }}>
                    <b>Ques: </b> {questions[index]?.question}
                  </h3>
                  {questions && renderSwitch(index)}
                </FormControl>
              ))}
          </Stack>
        </Box>
      </Stack>
    </div>
  );
}
Enrollment.layout = "studentPhaseDashboard";
export default Enrollment;
