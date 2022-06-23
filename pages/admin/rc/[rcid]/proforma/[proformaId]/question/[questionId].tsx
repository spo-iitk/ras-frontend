import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";

import Meta from "@components/Meta";

function Question() {
  const options = [
    { id: 1, label: "Option-1" },
    { id: 2, label: "Option-2" },
    { id: 3, label: "Option-3" },
  ];
  const qtype = [{ id: 1, label: "Question Type" }];
  const quest = [{ id: 1, label: "Question" }];
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
            {qtype.map((item) => (
              <FormControl sx={{ m: 1 }} key={item.id}>
                <InputLabel id="Type-of-Ques">Type of Question</InputLabel>
                <Select
                  labelId="Type-of-Ques"
                  label={item.label}
                  variant="standard"
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value={10}>MCQ</MenuItem>
                  <MenuItem value={20}>Short Answer</MenuItem>
                </Select>
              </FormControl>
            ))}

            {quest.map((item) => (
              <FormControl sx={{ m: 1 }} key={item.id}>
                <TextField label={item.label} variant="standard" />
              </FormControl>
            ))}

            {options.map((option) => (
              <FormControl sx={{ m: 1 }} key={option.id}>
                <TextField label={option.label} variant="standard" />
              </FormControl>
            ))}
          </Stack>
        </Card>
      </div>
    </div>
  );
}
Question.layout = "adminPhaseDashBoard";
export default Question;
