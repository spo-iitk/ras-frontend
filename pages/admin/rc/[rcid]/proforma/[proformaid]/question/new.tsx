import {
  Card,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import Meta from "@components/Meta";

function NewQuestion() {
  const [optionVal, setOptionVal] = useState([0]);

  return (
    <div className="container">
      <Meta title="Question - Admin" />
      <h1>Internship 2022-23 Phase 1</h1>
      <div style={{ marginTop: 50 }}>
        <Card
          elevation={5}
          sx={{
            padding: 4,
            width: { xs: "330px", sm: "500px", margin: "0px auto" },
          }}
        >
          <Stack spacing={3}>
            <h1>View Custom Question</h1>
            <br />

            <FormControl sx={{ m: 1 }}>
              <InputLabel id="Type-of-Ques">Type of Question</InputLabel>
              <Select labelId="Type-of-Ques" variant="standard">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>MCQ</MenuItem>
                <MenuItem value={20}>Short Answer</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1 }}>
              <TextField label="Question" variant="standard" />
            </FormControl>

            {optionVal.map((i) => (
              <FormControl sx={{ m: 1 }} key={i}>
                <TextField label="Option" variant="standard" />
              </FormControl>
            ))}

            <Stack spacing={3} justifyContent="center" alignItems="center">
              <IconButton
                sx={{ width: 40 }}
                onClick={() => {
                  const newOptionVal = [...optionVal, 0];
                  setOptionVal(newOptionVal);
                }}
              >
                <AddIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Card>
      </div>
    </div>
  );
}

NewQuestion.layout = "adminPhaseDashBoard";
export default NewQuestion;
