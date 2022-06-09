import Meta from "@components/Meta";
import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import styles from "@styles/adminPhase.module.css";
import React, { useState } from "react";

function Step3() {
  const [bond, setBond] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBond(event.target.checked);
  };
  return (
    <div className={styles.container}>
      <Meta title="Step 3/5 - Package Details" />
      <h1>Internship 2022-23 Phase 1</h1>
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "330px", sm: "600px", margin: "0px auto" },
        }}
      >
        <Stack spacing={3}>
          <h1>Step 3/5 : Package Details</h1>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Cost to Company</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              variant="standard"
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Package Details</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              variant="standard"
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <Stack direction="row" spacing={3}>
              <p style={{ fontWeight: 300 }}>Bond</p>
              <FormControlLabel
                label=""
                control={<Checkbox checked={bond} onChange={handleChange} />}
              />
            </Stack>
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Bond Details</p>
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
            <p style={{ fontWeight: 300 }}>Medical Requirements</p>
            <TextField
              id="Cname"
              required
              sx={{ marginLeft: "5 rem" }}
              fullWidth
              multiline
              minRows={4}
              variant="standard"
            />
          </FormControl>
          <Stack
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" sx={{ width: "50%" }}>
              Next
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

Step3.layout = "companyPhaseDashboard";
export default Step3;
