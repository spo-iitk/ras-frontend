import React from "react";
import {
  TextField,
  ToggleButton,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import Meta from "../../../../components/Meta";

const Apply = () => {
  const styles = {
    "& .MuiInputLabel-root": { color: "black" },
    "& .MuiOutlinedInput-root": {
      "& > fieldset": { borderColor: "black" },
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": { borderColor: "black" },
    },
  };
  const [toggleStates, setToggleStates] = React.useState(() => [false, false, false]);

  const handleChange = (
    index: number
  ) => {
    const newStates = [...toggleStates]
    newStates[index]  =!newStates[index]
    setToggleStates(newStates);
  };

  return (
    <div>
      <Meta title="Student Dashboard - Custom QA" />
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{
          mx: "auto",
          mt: "2%",
          height: "90vh",
          width: "50%",
          justifyContent: "space-around",
          padding: "20px",
          border: 1,
          borderRadius: 2,
          boxShadow: 4,
          fontWeight: "light",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Custom Question Answer
        </Typography>
        <Typography variant="subtitle1">Question 1</Typography>
        <TextField
          sx={styles}
          id="outlined-basic"
          label="Enter your answer"
          variant="outlined"
          fullWidth
        />
        <Typography variant="subtitle1">Question 2</Typography>
        <TextField
          sx={styles}
          id="outlined-basic"
          label="Enter your answer"
          variant="outlined"
          fullWidth
        />
        <Typography variant="subtitle1">Question 3</Typography>
        <ToggleButton
          sx={{justifyContent:"flex-start", border: "1.5px solid black" ,'&.Mui-selected':{backgroundColor:"#bdbdbd"}}}
          value="opt1"
          selected={toggleStates[0]}
          onClick={()=>handleChange(0)}
          aria-label="left aligned"
        >
          Option 1
        </ToggleButton>
        <ToggleButton
          sx={{ justifyContent:"flex-start", border: "1.5px solid black" ,'&.Mui-selected':{backgroundColor:"#bdbdbd"}}}          value="opt2"
          selected={toggleStates[1]}
          onClick={()=>handleChange(1)}
          aria-label="left aligned"
        >
          Option 2
        </ToggleButton>
        <ToggleButton
          sx={{justifyContent:"flex-start", border: "1.5px solid black" ,'&.Mui-selected':{backgroundColor:"#bdbdbd"}}}
          value="opt3"
          selected={toggleStates[2]}
          onClick={()=>handleChange(2)}
          aria-label="left aligned"
        >
          Option 3
        </ToggleButton>

        <Button
          variant="contained"
          fullWidth
          sx={{
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
