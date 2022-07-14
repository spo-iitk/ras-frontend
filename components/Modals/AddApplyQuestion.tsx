import { Box, Button, Stack, TextField, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import router from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";

import UpdateApplyQuestion, {
  QuestionProforma,
} from "@callbacks/admin/rc/proforma/question";
import useStore from "@store/store";

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

function AddApplyQuestion({
  handleCloseNew,
  getQuestions,
}: {
  handleCloseNew: () => void;
  getQuestions: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<QuestionProforma>();
  const { rcid, proformaid } = router.query;
  const rid = (rcid || "").toString();
  const { token, rcId } = useStore();

  const onSubmit = async (data: QuestionProforma) => {
    setValue("recruitment_cycle_id", rcId);
    const postQuestion = async () => {
      if (
        rid === undefined ||
        rid === "" ||
        proformaid === "" ||
        proformaid === undefined
      )
        return;
      const response = await UpdateApplyQuestion.post(
        data,
        token,
        rid,
        proformaid.toString()
      );
      if (response) {
        reset({
          question: "",
          mandatory: false,
          options: "",
          type: "",
        });
      }
    };
    await postQuestion();
    await getQuestions();
    handleCloseNew();
  };

  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <FormControl onSubmit={handleSubmit(onSubmit)}>
          <h2 style={{ margin: "20px 0px 50px 0px" }}>Additional Questions</h2>
          <FormControl sx={{ m: 1 }}>
            <InputLabel id="Type-of-Ques">Type of Question</InputLabel>
            <Select
              labelId="Type-of-Ques"
              label="Type of Question"
              variant="standard"
              {...register("type")}
            >
              <MenuItem value="MCQ">MCQ</MenuItem>
              <MenuItem value="Short Answer">Short Answer</MenuItem>
              <MenuItem value="Boolean">Boolean</MenuItem>
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
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          ADD QUESTION
        </Button>
      </Stack>
    </Box>
  );
}

export default AddApplyQuestion;
