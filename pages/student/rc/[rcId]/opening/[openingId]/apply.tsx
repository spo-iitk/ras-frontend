import React from "react";
import {
  TextField,
  Checkbox,
  Typography,
  Grid,
  Button,
  Box,
  FormControlLabel,
} from "@mui/material";
import styles from '@styles/internPhase.module.css'
import Meta from "@components/Meta";

const Apply = () => {
  const data = {
    title: "Job Performa Custom QnA",
    text: [
      {
        id: 15659,
        question:
          "What is the maximum number of passengers that can be carried by a single aircraft?",
        isMandatory: true,
      },
      {
        id: 15661,
        question:
          "What is the maximum number of passengers that can be thrown from a single aircraft?",
        isMandatory: false,
      },
    ],
    mcq: [
      {
        id: 156559,
        question:
          "What is the best way to get ailerons and flaps to the right position?",
        Options:
          "Ailerons to the right, flaps to the maximum, flaps to the minimum, Ailerons to the left",
        isMandatory: true,
      },
      {
        id: 156561,
        question: "What is your fav option?",
        Options: "A,B,C,D,E,F",
        isMandatory: false,
      },
      {
        id: 156562,
        question:
          "What is the best way to get ailerons and flaps to the minimum position?",
        Options:
          "Ailerons to the left, flaps to the minimum, flaps to the maximum, Ailerons to the right",
        isMandatory: false,
      },
    ],
  };

  const styling = {
    "& .MuiInputLabel-root": { color: "black" },
    "& .MuiOutlinedInput-root": {
      "& > fieldset": { borderColor: "black" },
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": { borderColor: "black" },
    },
    "& label.Mui-focused": {
      color: "black",
    },
  };
  const [toggleStates, setToggleStates] = React.useState(() =>
    [...Array(data.mcq.length)].map((_, index) =>
      Array(data.mcq[index].Options.split(",").length).fill(false)
    )
  );
  const handleChange = (indexRow: number, indexCol: number) => {
    const newStates = [...toggleStates];
    newStates[indexRow][indexCol] = !newStates[indexRow][indexCol];
    setToggleStates(newStates);
  };

  return (
    <div className={styles.container}>
      <Meta title="Custom QnA" />
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{
          mx: "auto",
          mt: "2%",
          minHeight: "70vh",
          width: "80vw",
          maxWidth:700,
          justifyContent: "space-around",
          padding: { md:"30px", xs:"20px"},
          borderRadius: 2,
          boxShadow: 4,
          fontWeight: "light",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {data.title}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: "light" }}>
          *Required
        </Typography>
        {data.text.map((d) => (
          <Box key={d.id} sx={{ padding: "10px" }}>
            <Typography variant="subtitle1" sx={{ padding: "15px 0px" }}>
              {d.question}
            </Typography>
            <TextField
              sx={styling}
              color="secondary"
              id="outlined-basic"
              label="Enter your answer"
              variant="outlined"
              fullWidth
              required={d.isMandatory}
            />
          </Box>
        ))}
        {data.mcq.map((d, i) => (
          <Box key={d.id} sx={{ padding: "10px" }}>
            <Typography variant="subtitle1" sx={{ padding: "15px 0px" }}>
              {d.question}
            </Typography>
            {d.Options.split(",").map((opt, j) => (
                <FormControlLabel
                  key={j}
                  // sx={{justifyContent:"flex-start", border: "1.5px solid black",'&.Mui-selected, &.Mui-selected:hover':{backgroundColor:"#6CB4EE"}}}
                  label={
                    <Typography
                      variant="subtitle1"
                      sx={{ padding: "15px 0px" }}
                    >
                      {opt}
                    </Typography>
                  }
                  control={
                    <Checkbox
                      checked={toggleStates[i][j]}
                      onChange={() => handleChange(i, j)}
                    />
                  }
                />

            ))}
          </Box>
        ))}
        <Button
          variant="contained"
          fullWidth
          sx={{
            padding: "16.5px 14px",
            backgroundColor: "#170e0d",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
        >
          Submit
        </Button>
      </Grid>
    </div>
  );
};
Apply.layout = "studentDashboard";
export default Apply;
