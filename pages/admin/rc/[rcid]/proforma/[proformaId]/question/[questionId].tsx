import React from "react";
import { Stack, Paper, TextField, Grid } from "@mui/material";

function Question() {
  const options = [
    { id: 1, data: "Option-1" },
    { id: 2, data: "Option-2" },
    { id: 3, data: "Option-3" },
  ];
  const qtype = [{ id: 1, data: "Type-1" }];
  const quest = [{ id: 1, data: "Quest -1" }];
  return (
    <div>
      <Paper
        variant="elevation"
        elevation={8}
        sx={{ margin: "2rem auto", width: "50rem" }}
      >
        <Stack justifyContent="center" spacing={1}>
          <h2 style={{ textAlign: "center" }}>VIEW CUSTOM QUESTION</h2>
          {qtype.map((value, i) => (
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignContent="center"
              key="qtgrid"
            >
              <Grid item xs={12}>
                <h3 style={{ marginLeft: "3.5rem" }}>Question Type</h3>
              </Grid>
              <Grid item xs={12}>
                <div style={{ width: "80%", marginLeft: "4vw" }}>
                  <TextField
                    id={`qtype${i}`}
                    // select
                    defaultValue={value.data}
                    inputProps={{ readOnly: true }}
                    // label="Question Type"
                    // onChange={handleChange}
                    sx={{ marginLeft: "5 rem" }}
                    fullWidth
                    variant="standard"
                  />
                </div>
              </Grid>
            </Grid>
          ))}
          {quest.map((value, i) => (
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignContent="center"
              key="qgrid"
            >
              <Grid item xs={12}>
                <h3 style={{ marginLeft: "3.5rem" }}>Question</h3>
              </Grid>
              <Grid item xs={12}>
                <div style={{ width: "80%", marginLeft: "4vw" }}>
                  <TextField
                    id={`quest${i}`}
                    // select
                    inputProps={{ readOnly: true }}
                    // label="Question"
                    defaultValue={value.data}
                    // onChange={handleChange}
                    sx={{ marginLeft: "5 rem" }}
                    fullWidth
                    multiline
                    variant="standard"
                  />
                </div>
              </Grid>
            </Grid>
          ))}
          {options.map((value, i) => (
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignContent="center"
              key="opgrid"
              sx={{ marginBottom: "1vw" }}
            >
              <Grid item xs={12}>
                <h3 style={{ marginLeft: "3.5rem" }}> {value.data} </h3>
              </Grid>
              <Grid item xs={12}>
                <div style={{ width: "40%", marginLeft: "4vw" }}>
                  <TextField
                    id={`opt${i}`}
                    // select
                    required
                    defaultValue={value.data}
                    label=""
                    inputProps={{ readOnly: true }}
                    // onChange={handleChange}
                    sx={{ marginLeft: "5 rem" }}
                    fullWidth
                    multiline
                    variant="standard"
                  />
                </div>
              </Grid>
            </Grid>
          ))}
          <br />
        </Stack>
      </Paper>
    </div>
  );
}
Question.layout = "adminPhaseDashBoard";
export default Question;
