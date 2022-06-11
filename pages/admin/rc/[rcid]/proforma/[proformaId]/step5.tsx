import Meta from "@components/Meta";
import {
  Button,
  Card,
  FormControl,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import styles from "@styles/adminPhase.module.css";
import React from "react";

const hrtype = [
  { id: 1, data: "HR1" },
  { id: 1, data: "HR2" },
  { id: 1, data: "HR3" },
];
function Step5() {
  return (
    <div className={styles.container}>
      <Meta title="Step 5/5 - Additional Information" />
      <h1>Internship 2022-23 Phase 1</h1>
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "330px", sm: "600px", margin: "0px auto" },
        }}
      >
        <Stack spacing={3}>
          <h1>Step 5/5 : Additional Information</h1>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Additional Eligibility Criteria</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              minRows={3}
              variant="standard"
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Message for Placement Coordinator</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              minRows={5}
              variant="standard"
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Select Active HR</p>
            <TextField id="hrtype" required select fullWidth variant="standard">
              <MenuItem value="">Select</MenuItem>
              {hrtype.map((val) => (
                <MenuItem value={val.data} key="q1">
                  {val.data}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <Stack
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" sx={{ width: "50%" }}>
              Submit
            </Button>
            <Button variant="contained" sx={{ width: "50%" }}>
              Reset
            </Button>
          </Stack>
        </Stack>
      </Card>
    </div>
  );
}

Step5.layout = "adminPhaseDashBoard";
export default Step5;
