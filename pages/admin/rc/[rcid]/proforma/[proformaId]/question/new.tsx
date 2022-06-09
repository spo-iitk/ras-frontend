import {
  Stack,
  Grid,
  IconButton,
  Paper,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

const options = [
  { id: 1, data: "Option-1" },
  { id: 2, data: "Option-2" },
  { id: 3, data: "Option-3" },
];
const qtype = [
  { id: 1, data: "Type-1" },
  { id: 2, data: "Type-2" },
  { id: 3, data: "Type-3" },
];
function NewQuestion() {
  const { length } = options;

  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    console.log(value);
  };
  return (
    <div>
      <Paper
        variant="elevation"
        elevation={8}
        sx={{ margin: "2rem auto", width: "45vw" }}
      >
        <Stack justifyContent="center" spacing={3}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignContent="center"
          >
            <Grid item xs={6} sx={{ marginLeft: "2 rem", alignText: "center" }}>
              <h2>ADD CUSTOM QUESTION</h2>
            </Grid>
            <Grid item xs={1} sx={{ alignItems: "right", marginTop: "1rem" }}>
              <div>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignContent="center"
          >
            <Grid item xs={12}>
              <div style={{ width: "30rem", marginLeft: "4vw" }}>
                <TextField
                  id="qtype"
                  required
                  select
                  label="Select Question Type"
                  onChange={handleChange}
                  sx={{ marginLeft: "5 rem" }}
                  fullWidth
                  variant="standard"
                >
                  {qtype.map((val) => (
                    <MenuItem value={val.data} key="q1">
                      {val.data}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div style={{ width: "30rem", marginLeft: "4vw" }}>
                <TextField
                  id="quest"
                  required
                  // select
                  label="Enter Question"
                  onChange={handleChange}
                  sx={{ marginLeft: "5 rem" }}
                  fullWidth
                  multiline
                  variant="standard"
                />
              </div>
            </Grid>

            {options.map((val, i) => {
              if (i < length - 1)
                return (
                  <Grid item xs={12}>
                    <div style={{ width: "20rem", marginLeft: "4vw" }}>
                      <TextField
                        id="outlined-select-currency"
                        // select
                        required
                        label="Enter Option"
                        onChange={handleChange}
                        sx={{ marginLeft: "5 rem" }}
                        fullWidth
                        multiline
                        variant="standard"
                      />
                    </div>
                  </Grid>
                );
              return (
                <Grid
                  container
                  spacing={3}
                  justifyContent="left  "
                  alignContent="left"
                  key="loprow"
                >
                  <Grid item xs={1}>
                    <div
                      style={{
                        width: "20rem",
                        marginLeft: "5.5vw",
                        marginTop: "1vw",
                      }}
                    >
                      <TextField
                        id="outlined-select-currency"
                        // select
                        label="Enter Option"
                        onChange={handleChange}
                        sx={{ marginLeft: "5 rem" }}
                        fullWidth
                        multiline
                        variant="standard"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      sx={{
                        border: "2px black solid",
                        position: "relative",
                        left: "25vw ",
                        top: "1.5vw",
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignContent="center"
          >
            <Grid item xs={8}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  padding: "16.5px 14px",
                  marginBottom: "2rem",
                  backgroundColor: "#170e0d",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
              >
                Submit
              </Button>
              {/* <ActiveButton sx={{ width: "max-content", margin: "0.5rem 0" }}>
                Add Question
              </ActiveButton> */}
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </div>
  );
}

NewQuestion.layout = "adminPhaseDashBoard";
export default NewQuestion;
